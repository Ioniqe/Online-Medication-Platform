package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.controller;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.controller.handlers.model.ResourceNotFoundException;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.PatientDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.PersonDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.User;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.builder.PersonBuilder;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Doctor;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Patient;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Person;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service.DoctorService;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service.PatientService;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service.PersonService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@RestController
//@CrossOrigin(origins = "http://localhost:8080", allowedHeaders = "*", exposedHeaders = "Authorization")
@CrossOrigin(origins = "*")
public class DoctorController {
    private static final Logger LOGGER = LoggerFactory.getLogger(DoctorController.class);
    private final DoctorService doctorService;
    private final PersonService personService;
    private final PatientService patientService;

    @Autowired
    public DoctorController(DoctorService doctorService, PersonService personService, PatientService patientService) {
        this.doctorService = doctorService;
        this.personService = personService;
        this.patientService = patientService;
    }

    private PersonDTO verifyDoctorExistence(UUID personId) {
        PersonDTO dto = personService.getPersonDTOById(personId);
        if (!dto.getType().equals("doctor")) {
            LOGGER.error("Doctor was not found.");
            throw new ResourceNotFoundException("There is no doctor with the given person id.");
        }
        return dto;
    }

    @RequestMapping(value = "/doctor/patients/{doctorId}", method = RequestMethod.GET)
    public ResponseEntity<Set<Patient>> getPatientsByDoctorId(@PathVariable("doctorId") UUID doctorId) {
        Doctor doctor = doctorService.getDoctorById(doctorId);
        Set<Patient> listOfPatients = doctor.getListOfPatients();
        return new ResponseEntity<>(listOfPatients, HttpStatus.OK);
    }

    //-------------------------------
    @RequestMapping(value = "/patients_details/doctor/{personId}", method = RequestMethod.GET)
    public ResponseEntity<List<PersonDTO>> getPatientsWithDetailsOfDoctorByPersonId(@PathVariable("personId") UUID personId) {
        verifyDoctorExistence(personId); //verify

        UUID doctorId = doctorService.getDoctorByPersonId(personId).getId();
        List<PatientDTO> patientDTOS = doctorService.getAllPatientsOfDoctorById(doctorId);

        List<PersonDTO> peopleDTOS = new ArrayList<>();
        patientDTOS.stream().forEach(patient -> {
            UUID personIdOfCurrentPatient = patientService.getPatientById(patient.getId()).getPersonID();
            peopleDTOS.add(personService.getPersonDTOById(personIdOfCurrentPatient));
        });
        return new ResponseEntity<>(peopleDTOS, HttpStatus.OK);
    }
    //-----------------------------

    //---------------------------------CREATE---------------------------------
    @RequestMapping(value = "/doctor/new", method = RequestMethod.POST)
    public ResponseEntity<UUID> createDoctor(@RequestBody PersonDTO personDTO) {
        Person person = personService.insertPerson(personDTO);
        UUID doctorID = doctorService.insertDoctor(person);
        return new ResponseEntity<>(doctorID, HttpStatus.CREATED);
    }

    //----------------------------------READ----------------------------------
    @RequestMapping(value = "/doctor/{personId}", method = RequestMethod.GET)
    public ResponseEntity<PersonDTO> readDoctor(@PathVariable("personId") UUID personId) {
        PersonDTO dto = verifyDoctorExistence(personId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @RequestMapping(value = "/doctor", method = RequestMethod.POST)
    public ResponseEntity<PersonDTO> verifyDoctorLogin(@RequestBody User user) {
        try{
            Person person = doctorService.verifyDoctorLogin(user);
            if(person.getType().getType().equals("doctor")){
                return new ResponseEntity<>(PersonBuilder.toPersonDTOWithDetails(person), HttpStatus.OK);
            }
        }catch(Exception e){
            LOGGER.error("Doctor was not found.");
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity(HttpStatus.UNAUTHORIZED);
    }

}
