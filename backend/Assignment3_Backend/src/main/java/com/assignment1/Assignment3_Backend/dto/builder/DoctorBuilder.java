package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.builder;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.DoctorDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Doctor;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Patient;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Person;

import java.util.HashSet;
import java.util.Set;

public class DoctorBuilder {
    public DoctorBuilder() {
    }

    public static DoctorDTO toDoctorDTO(Doctor doctor){
        return new DoctorDTO(doctor.getId());
    }

    public static Doctor toEntity(Person person){
        Set<Patient> listOfPatients = new HashSet<>();
        return new Doctor(listOfPatients, person);
    }
}
