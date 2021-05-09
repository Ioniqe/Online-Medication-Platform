package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.controller;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.controller.handlers.model.ResourceNotFoundException;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.PatientDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.PersonDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.builder.PatientBuilder;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Caregiver;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Patient;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Person;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service.CaregiverService;
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
public class CaregiverController {
    private static final Logger LOGGER = LoggerFactory.getLogger(CaregiverController.class);
    private final CaregiverService caregiverService;
    private final PersonService personService;
    private final PatientService patientService;

    @Autowired
    public CaregiverController(CaregiverService caregiverService, PersonService personService, PatientService patientService) {
        this.caregiverService = caregiverService;
        this.personService = personService;
        this.patientService = patientService;
    }

    @RequestMapping(value = "/patients_details/caregiver/{personId}", method = RequestMethod.GET)
    public ResponseEntity<List<PersonDTO>> getPatientsWithDetailsOfCaregiverByPersonId(@PathVariable("personId") UUID personId) {
        verifyCaregiverExistence(personId); //verify

        UUID caregiverId = caregiverService.getCaregiverByPersonId(personId).getId();
        List<PatientDTO> patientDTOS = caregiverService.getAllPatientsOfCaregiverById(caregiverId);
        List<PersonDTO> peopleDTOS = new ArrayList<>();
        patientDTOS.stream().forEach(patient -> {
            UUID personIdOfCurrentPatient = patientService.getPatientById(patient.getId()).getPersonID();
            peopleDTOS.add(personService.getPersonDTOById(personIdOfCurrentPatient));
        });
        return new ResponseEntity<>(peopleDTOS, HttpStatus.OK);
    }

    @RequestMapping(value = "/patients/caregiver/{caregiverId}", method = RequestMethod.GET)
    // gets the ids of the patients along with the ids of their doctor and caregiver by caregiver id
    public ResponseEntity<List<PatientDTO>> getPatientsOfCaregiverId(@PathVariable("caregiverId") UUID id) {
        Caregiver caregiver = caregiverService.getCaregiverById(id);
        Set<Patient> patients = caregiver.getListOfPatients();
        List<PatientDTO> dtos = new ArrayList<>();
        patients.stream().forEach(patient -> dtos.add(PatientBuilder.toPatientDetailsDTO(patient)));
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @RequestMapping(value = "/caregiver/{personId}", method = RequestMethod.GET)
    public ResponseEntity<UUID> getCaregiverIdByPersonId(@PathVariable("personId") UUID personId) {
        Caregiver caregiver = caregiverService.getCaregiverByPersonId(personId);
        return new ResponseEntity<>(caregiver.getId(), HttpStatus.OK);
    }

    private PersonDTO verifyCaregiverExistence(@PathVariable("personId") UUID oldPersonID) {
        PersonDTO dto = personService.getPersonDTOById(oldPersonID);
        if (!dto.getType().equals("caregiver")) {
            LOGGER.error("Caregiver was not found.");
            throw new ResourceNotFoundException("There is no caregiver with the given person id.");
        }
        return dto;
    }

    //----------------------------------CREATE-----------------------------
    @RequestMapping(value = "/caregiver/new", method = RequestMethod.POST)
    public ResponseEntity<UUID> saveCaregiver(@RequestBody PersonDTO personDTO) {
        Person person = personService.insertPerson(personDTO);
        UUID caregiverID = caregiverService.insertCaregiver(person);
        return new ResponseEntity<>(caregiverID, HttpStatus.CREATED);
    }

    //-----------------------------------READ------------------------------
    @RequestMapping(value = "/acc_details/caregiver/{personId}", method = RequestMethod.GET)
    public ResponseEntity<PersonDTO> readCaregiver(@PathVariable("personId") UUID personId) {
        PersonDTO dto = verifyCaregiverExistence(personId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    //----------------------------------UPDATE-----------------------------
    @RequestMapping(value = "/caregiver/update/{personId}", method = RequestMethod.POST)
    public ResponseEntity<UUID> updateCaregiver(@RequestBody PersonDTO newPersonDTO, @PathVariable("personId") UUID oldPersonID) {
        PersonDTO dto = verifyCaregiverExistence(oldPersonID); //just to verify existence
        UUID newPersonID = personService.updatePerson(newPersonDTO, oldPersonID); //newPersonID should be == oldPersonID
        return new ResponseEntity<>(newPersonID, HttpStatus.OK);
    }

    //----------------------------------DELETE-----------------------------
    @RequestMapping(value = "/caregiver/delete/{personId}", method = RequestMethod.DELETE)
    public ResponseEntity deleteCaregiver(@PathVariable("personId") UUID personID) {
        //update patient with caregiverId: null
        Caregiver caregiver = caregiverService.getCaregiverByPersonId(personID);

        try {
            Set<Patient> patients = caregiver.getListOfPatients();
            patients.forEach(patient -> {
                patient.setCaregiver(null);
                patientService.savePatient(patient);
            });
        } catch (Exception e) {
            System.out.println("Caregiver has no patients");
        }
        //----------------------------------------

        PersonDTO dto = verifyCaregiverExistence(personID);
        personService.deletePerson(personID);
        return new ResponseEntity(HttpStatus.OK);
    }
}
