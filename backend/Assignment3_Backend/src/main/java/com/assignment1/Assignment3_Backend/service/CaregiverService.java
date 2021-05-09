package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.controller.handlers.model.ResourceNotFoundException;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.PatientDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.builder.CaregiverBuilder;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.builder.PatientBuilder;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Caregiver;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Patient;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Person;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.repository.CaregiverRepository;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.repository.PatientRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CaregiverService {
    private static final Logger LOGGER = LoggerFactory.getLogger(CaregiverService.class);
    public final CaregiverRepository caregiverRepository;
    public final PatientRepository patientRepository;

    @Autowired
    public CaregiverService(CaregiverRepository caregiverRepository, PatientRepository patientRepository) {
        this.caregiverRepository = caregiverRepository;
        this.patientRepository = patientRepository;
    }

    public List<PatientDTO> getAllPatientsOfCaregiverById(UUID id){
        List<Patient> patientList = patientRepository.findAllByCaregiver_Id(id);
        List<PatientDTO> patientDTOS = new ArrayList<>();
        patientList.stream().forEach(patient -> patientDTOS.add(PatientBuilder.toPatientDTO(patient)));
        return patientDTOS;
    }

    public Optional<Caregiver> verifyCaregiverExistence(UUID personID) {
        Optional<Caregiver> caregiver = caregiverRepository.findById(personID);
        if (!caregiver.isPresent()) {
            LOGGER.error("Caregiver was not found.");
            throw new ResourceNotFoundException("There is no caregiver with the given person id.");
        }
        return  caregiver;
    }

//    public CaregiverDTO getCaregiverDTOById(UUID id) {
//        Optional<Caregiver> personOptional = verifyCaregiverExistence(id);
//        return CaregiverBuilder.toCaregiverDTO(personOptional.get());
//    }

    public Caregiver getCaregiverById(UUID id){
        return caregiverRepository.findCaregiverById(id);
    }

    public Caregiver getCaregiverByPersonId(UUID id){return caregiverRepository.findCaregiverByPerson_Id(id);}

    public UUID insertCaregiver(Person person){
        Caregiver caregiver = CaregiverBuilder.toEntity(person);
        caregiver = caregiverRepository.save(caregiver);
        LOGGER.debug("Caregiver with id {} was inserted in db", caregiver.getId());
        return caregiver.getId();
    }

}
