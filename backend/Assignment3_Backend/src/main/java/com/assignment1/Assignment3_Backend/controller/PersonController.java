package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.controller;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.JwtResponse;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.PersonDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.User;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service.PersonService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//import javax.xml.ws.Response;
import java.util.List;
import java.util.UUID;

@RestController
//@CrossOrigin(origins = "http://localhost:8080", allowedHeaders = "*", exposedHeaders = "Authorization")
@CrossOrigin(origins = "*")
public class PersonController {
    private static final Logger LOGGER = LoggerFactory.getLogger(PersonController.class);
    private final PersonService personService;

    @Autowired
    public PersonController(PersonService personService) {
        this.personService = personService;
    }

//    @RequestMapping(value = "/person", method = RequestMethod.GET) ///person?username=...
//    public ResponseEntity<PersonDTO> getPersonByUsername(@RequestParam(value="username") String username) {
//        PersonDTO dto = personService.getPersonByUsername(username);
//        return new ResponseEntity<>(dto, HttpStatus.OK);
//    }

    @RequestMapping(value = "/people/{type}", method = RequestMethod.GET)
    public ResponseEntity<List<PersonDTO>> getPeopleByType(@PathVariable("type") String type) {
        List<PersonDTO> dtos = personService.getPeopleByType(type);
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    //----------------------------------CREATE-----------------------------
    @RequestMapping(value = "/person/new", method = RequestMethod.POST)
    public ResponseEntity<UUID> savePerson(@RequestBody PersonDTO personDTO) {
        UUID personID = personService.insertPersonAndReturnId(personDTO);
        return new ResponseEntity<>(personID, HttpStatus.CREATED);
    }

    //-----------------------------------READ------------------------------
    @GetMapping(value = "/person/{id}") //also used for acc details
    public ResponseEntity<PersonDTO> getPersonById(@PathVariable("id") UUID personId) {
        PersonDTO dto = personService.getPersonDTOById(personId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    //----------------------------------UPDATE-----------------------------
    @RequestMapping(value = "/person/update/{personId}", method = RequestMethod.POST)
    public ResponseEntity<UUID> updatePerson(@RequestBody PersonDTO personDTO, @PathVariable("personId") UUID oldPersonID) {
        UUID newPersonID = personService.updatePerson(personDTO, oldPersonID); //newPersonID should be == oldPersonID
        return new ResponseEntity<>(newPersonID, HttpStatus.OK);
    }

    //----------------------------------DELETE-----------------------------
    @RequestMapping(value = "/person/delete/{personId}", method = RequestMethod.DELETE)
    public ResponseEntity deletePerson(@PathVariable("personId") UUID personID) {
        personService.deletePerson(personID);
        return new ResponseEntity(HttpStatus.OK);
    }

//    @RequestMapping(value = "/login", method = RequestMethod.POST)
//    public ResponseEntity<PersonDTO> login(@RequestBody User user) { //verifyDoctorLogin
//        try{
//            Person person = personService.verifyPersonLogin(user);
//            return new ResponseEntity(PersonBuilder.toPersonDTOWithDetails(person), HttpStatus.OK);
//        }catch(Exception e){
//            LOGGER.error("Person was not found.");
//            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
//        }
//    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<JwtResponse> login(@RequestBody User user) { //verifyDoctorLogin
        return new ResponseEntity(personService.login(user), HttpStatus.OK);
    }
}
