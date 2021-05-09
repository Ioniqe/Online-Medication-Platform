package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.api.DailyMed;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.api.DailyMeds;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.api.DailyMedsException;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.api.DailyMedsService;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.MedicationList;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.MedicationPlan;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.repository.MedicineRepository;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.repository.PatientRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;


public class DailyMedsServiceImpl implements DailyMedsService {
    private static final Logger LOGGER = LoggerFactory.getLogger(DailyMedsServiceImpl.class);
    private final PatientRepository patientRepository;
    private final MedicineRepository medicineRepository;

    @Autowired
    public DailyMedsServiceImpl(PatientRepository patientRepository, MedicineRepository medicineRepository) {
        this.patientRepository = patientRepository;
        this.medicineRepository = medicineRepository;
    }

    @Override
    public DailyMeds getDailyMeds(UUID id) throws DailyMedsException {
//        LocalDateTime lt = LocalDateTime.now();
        List<DailyMed> meds = new ArrayList<>();
        Set<MedicationPlan> medicationPlanSet = patientRepository.findPatientByPerson_Id(id).getMedicationPlans();

        medicationPlanSet.forEach(medPlan -> {
            List<MedicationList> medList = new ArrayList<>(medPlan.getMedicationList());

//            if (medList.get(0).getEndInterval().getHour() > lt.getHour()) {
                medicineRepository.findMedicinesByMedicationListId(medList.get(0).getId()).forEach(med -> {
                    meds.add(new DailyMed(med.getId(), med.getName(), med.getDosage(), medList.get(0).getStartInterval(), medList.get(0).getEndInterval()));
                });
//            }
        });

        meds.forEach(med -> System.out.println(med.getName()));

        return new DailyMeds(meds);
    }

    @Override
    public String setMedTaken(UUID id, String name) {
        System.out.println("=============================Medication " + name + " has been taken by the patient=============================");
        String msg = "Server has been notified that the patient took " + name + "!";
        LOGGER.debug("LOGGER:" + msg);
        return msg;
    }

    @Override
    public String setMedNotTaken(List<DailyMed> meds) {
        meds.forEach(med -> {
            System.out.println("=============================Medication " + med.getName() + " has NOT been taken============================");
        });

        String msg = "Server has been notified that the patient did not take " + meds.get(0).getName() + "!";

        if(meds.size() == 1) {
            LOGGER.debug("LOGGER:" + msg);
            return msg;
        }

        String message = "";
        int i = 0;
        for (DailyMed med : meds) {
            message += (i == 0 ? med.getName() : ", " + med.getName());
            i++;
        }

        msg = "Server has been notified that the patient did not take " + message +" in time!";
        LOGGER.debug("LOGGER: " + msg);
        return msg;
    }

}

