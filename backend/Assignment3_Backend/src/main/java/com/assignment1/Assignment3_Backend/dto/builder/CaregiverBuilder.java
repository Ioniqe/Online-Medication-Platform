package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.builder;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.CaregiverDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Caregiver;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Patient;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Person;

import java.util.HashSet;
import java.util.Set;

public class CaregiverBuilder {

    public CaregiverBuilder() {
    }

    public static CaregiverDTO toCaregiverDTO(Caregiver caregiver){
        return new CaregiverDTO(caregiver.getId());
    }

    public static Caregiver toEntity(Person person){
        Set<Patient> listOfPatients = new HashSet<>();
        return new Caregiver(listOfPatients, person);
    }
}
