package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.controller;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.controller.handlers.model.ResourceNotFoundException;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.PersonDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.*;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
//@CrossOrigin(origins = "http://localhost:8080", allowedHeaders = "*", exposedHeaders = "Authorization")
@CrossOrigin(origins = "*")
public class PatientController {
    private static final Logger LOGGER = LoggerFactory.getLogger(PatientController.class);
    private final PatientService patientService;
    private final PersonService personService;
    private final DoctorService doctorService;
    private final CaregiverService caregiverService;
    private final MedicationListService medicationListService;

    @Autowired
    public PatientController(PatientService patientService, PersonService personService, DoctorService doctorService, CaregiverService caregiverService, MedicationListService medicationListService) {
        this.patientService = patientService;
        this.personService = personService;
        this.doctorService = doctorService;
        this.caregiverService = caregiverService;
        this.medicationListService = medicationListService;
    }

    @RequestMapping(value = "/patient/{personId}", method = RequestMethod.GET)
    public ResponseEntity<UUID> getPatientIdByPersonId(@PathVariable("personId") UUID personId) {
        Patient patient = patientService.getPatientByPersonId(personId);
        return new ResponseEntity<>(patient.getId(), HttpStatus.OK);
    }

    private PersonDTO verifyPatientExistence(UUID oldPersonID) {
        PersonDTO dto = personService.getPersonDTOById(oldPersonID);
        if (!dto.getType().equals("patient")) {
            LOGGER.error("Patient was not found.");
            throw new ResourceNotFoundException("There is no patient with the given person id.");
        }
        return dto;
    }

    @RequestMapping(value = "/patient/set_caregiver/{patientPersonId}/{caregiverPersonId}", method = RequestMethod.POST)
    public ResponseEntity setCaregiverToPatientByPeopleId(@PathVariable("patientPersonId") UUID patientPersonId, @PathVariable("caregiverPersonId") UUID caregiverPersonId) {
        PersonDTO dto = verifyPatientExistence(patientPersonId); //verify existence of patient
        Patient patient = patientService.getPatientByPersonId(patientPersonId);
        Caregiver caregiver = caregiverService.getCaregiverByPersonId(caregiverPersonId);
        patientService.setCaregiverToPatient(patient, caregiver);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/patient/new/{doctorPersonId}", method = RequestMethod.POST)
    public ResponseEntity<UUID> savePatient(@RequestBody PersonDTO personDTO, @PathVariable("doctorPersonId") UUID doctorPersonId) {
        Person person = personService.insertPerson(personDTO);
        UUID doctorId = doctorService.getDoctorByPersonId(doctorPersonId).getId();
        Doctor doctor = doctorService.getDoctorById(doctorId);
        UUID patientID = patientService.insertPatient(person, doctor);
        return new ResponseEntity<>(patientID, HttpStatus.CREATED); //patientId vs personId
    }

    //-----------------------------------READ------------------------------
    @RequestMapping(value = "/acc_details/patient/{personId}", method = RequestMethod.GET)
    public ResponseEntity<PersonDTO> readPatient(@PathVariable("personId") UUID personId) {
        PersonDTO dto = verifyPatientExistence(personId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    //----------------------------------UPDATE-----------------------------
    @RequestMapping(value = "/patient/update/{personId}", method = RequestMethod.POST)
    public ResponseEntity<UUID> updatePatient(@RequestBody PersonDTO newPersonDTO, @PathVariable("personId") UUID oldPersonID) {
        PersonDTO dto = verifyPatientExistence(oldPersonID);
        UUID newPersonID = personService.updatePerson(newPersonDTO, oldPersonID); //newPersonID should be == oldPersonID
        return new ResponseEntity<>(newPersonID, HttpStatus.OK);
    }

    //----------------------------------DELETE-----------------------------
    @RequestMapping(value = "/patient/delete/{personId}", method = RequestMethod.DELETE)
    public ResponseEntity deletePatient(@PathVariable("personId") UUID personID) {
        PersonDTO dto = verifyPatientExistence(personID);
        personService.deletePerson(personID);
        return new ResponseEntity(HttpStatus.OK);
    }
}
