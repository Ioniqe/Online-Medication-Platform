package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.controller.handlers.model.ResourceNotFoundException;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.MedicationPlanDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.builder.MedicationPlanBuilder;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.MedicationPlan;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Patient;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.repository.MedicationPlanRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class MedicationPlanService {
    private static final Logger LOGGER = LoggerFactory.getLogger(MedicationPlanService.class);
    private final MedicationPlanRepository medicationPlanRepository;

    @Autowired
    public MedicationPlanService(MedicationPlanRepository medicationPlanRepository) {
        this.medicationPlanRepository = medicationPlanRepository;
    }

    public List<MedicationPlanDTO> getMedicationPlansByPatientId(UUID id){
        List<MedicationPlan> medicationPlans = medicationPlanRepository.getMedicationPlansByPatient_Id(id);
        List<MedicationPlanDTO> medicationPlanDTOS = new ArrayList<>();
        medicationPlans.stream().forEach(medPlan -> medicationPlanDTOS.add(MedicationPlanBuilder.toMedicationPlanDTOWithId(medPlan)));
        return medicationPlanDTOS;
    }

    public UUID insertMedicationPlan(MedicationPlanDTO medicationPlanDTO, Patient patient){
        MedicationPlan medicationPlan = MedicationPlanBuilder.toEntity(medicationPlanDTO, patient);
        medicationPlan = medicationPlanRepository.save(medicationPlan);
        LOGGER.debug("Medication Plan with id {} was inserted in db", medicationPlan.getId());
        return medicationPlan.getId();
    }

    public MedicationPlan getMedicationPlanById(UUID medPlanId){
        return medicationPlanRepository.getMedicationPlanById(medPlanId);
    }

    public Optional<MedicationPlan> verifyMedicationPlanExistence(UUID medPlanID) {
        Optional<MedicationPlan> medPlan = medicationPlanRepository.findById(medPlanID);
        if (!medPlan.isPresent()) {
            LOGGER.error("The Medication Plan was not found.");
            throw new ResourceNotFoundException("There is no medication plan with the given id.");
        }
        return  medPlan;
    }
}
