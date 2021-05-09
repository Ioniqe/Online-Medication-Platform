package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.controller.handlers.model.ResourceNotFoundException;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.JwtResponse;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.PersonDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.User;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.builder.PersonBuilder;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Gender;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Person;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Type;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.repository.GenderRepository;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.repository.MedicationListRepository;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.repository.PersonRepository;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.repository.TypeRepository;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.security.jwt.JwtUtils;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.security.services.UserDetailsImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class PersonService {
    private static final Logger LOGGER = LoggerFactory.getLogger(PersonService.class);
    public final PersonRepository personRepository;
    public final GenderRepository genderRepository;
    public final TypeRepository typeRepository;
    public final MedicationListRepository medicationListRepository;


    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    @Autowired
    public PersonService(PersonRepository personRepository, GenderRepository genderRepository, TypeRepository typeRepository, MedicationListRepository medicationListRepository, AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
        this.personRepository = personRepository;
        this.genderRepository = genderRepository;
        this.typeRepository = typeRepository;
        this.medicationListRepository = medicationListRepository;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    public PersonDTO getPersonByUsername(String username) {
        Person person = personRepository.findPersonByUsername(username);
        PersonDTO personDTO = PersonBuilder.toPersonDTOWithDetails(person);
        return personDTO;
    }

    public List<PersonDTO> getPeopleByType(String type) { //type as in doctor
        List<Person> peopleList = personRepository.findAllByPeopleByType(type);
        List<PersonDTO> dtos = new ArrayList<>();
        peopleList.stream().forEach(person -> dtos.add(PersonBuilder.toPersonDTOWithDetails(person)));
        return dtos;
    }

    private Optional<Person> verifyPersonExistence(UUID id) {
        Optional<Person> personOptional = personRepository.findById(id);
        if (!personOptional.isPresent()) {
            LOGGER.error("Person with id {} was not found in the db", id);
            throw new ResourceNotFoundException(Person.class.getSimpleName() + " with id: " + id);
        }
        return personOptional;
    }

    public PersonDTO getPersonDTOById(UUID id) {
        Optional<Person> personOptional = verifyPersonExistence(id);
        return PersonBuilder.toPersonDTOWithDetails(personOptional.get());
    }

    public Person getPersonById(UUID id) {
        Optional<Person> personOptional = verifyPersonExistence(id);
        return personOptional.get();
    }

    public String getGenderOfPerson(UUID id) {
        Person person = personRepository.findPersonById(id);
        String gender = genderRepository.findGenderById(person.getGenderId()).getGender();
        return gender;
    }

    private Person getInsertedPerson(PersonDTO personDTO) {
        Person person = PersonBuilder.toEntity(personDTO);
        Gender gender = genderRepository.findGenderByGender(personDTO.getGender());
        Type type = typeRepository.findTypeByType(personDTO.getType());
        person.setGender(gender);
        person.setType(type);
        person.setListOfCaregivers(new HashSet<>());
        person.setListOfDoctors(new HashSet<>());
        person.setListOfPatients(new HashSet<>());
        person = personRepository.save(person);
        LOGGER.debug("Person with id {} was inserted in db", person.getId());
        return person;
    }


    public UUID insertPersonAndReturnId(PersonDTO personDTO) { //this PersonDTO is the one that also has type and gender
        Person person = getInsertedPerson(personDTO);
        return person.getId();
    }

    public Person insertPerson(PersonDTO personDTO) { //this PersonDTO is the one that also has type and gender
        Person person = getInsertedPerson(personDTO);
        return person;
    }

    public UUID updatePerson(PersonDTO newPersonDTO, UUID oldPersonID){
        Person oldPerson = verifyPersonExistence(oldPersonID).get();
        Person newPerson = PersonBuilder.toEntity(newPersonDTO);

        newPerson.setId(oldPersonID);
        newPerson.setListOfPatients(oldPerson.getListOfPatients());
        newPerson.setListOfDoctors(oldPerson.getListOfDoctors());
        newPerson.setListOfCaregivers(oldPerson.getListOfCaregivers());
        newPerson.setType(oldPerson.getType());
        newPerson.setGender(oldPerson.getGender());

        newPerson = personRepository.save(newPerson);
        return newPerson.getId();
    }

    @Transactional
    public void deletePerson(UUID personID){
        Person oldPerson = verifyPersonExistence(personID).get();
        personRepository.deleteById(personID);
    }

    public Person verifyPersonLogin(User user){
        Person person = personRepository.findByUsernameAndPassword(user.getUsername(), user.getPassword());
        return person;
    }

    public JwtResponse login(User user){
        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
                );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        final String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getPassword(),
                userDetails.getFirstname(), userDetails.getLastname(), userDetails.getBirth_date(),
                userDetails.getAddress(), userDetails.getGender(), userDetails.getType());
    }
}
