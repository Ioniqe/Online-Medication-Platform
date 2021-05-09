package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.controller.handlers.model.ResourceNotFoundException;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.PatientDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.User;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.builder.DoctorBuilder;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.builder.PatientBuilder;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Doctor;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Patient;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Person;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.repository.DoctorRepository;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.repository.PatientRepository;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.repository.PersonRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DoctorService {
    private static final Logger LOGGER = LoggerFactory.getLogger(DoctorService.class);
    private final DoctorRepository doctorRepository;
    private final PersonRepository personRepository;
    private final PatientRepository patientRepository;

    @Autowired
    public DoctorService(DoctorRepository doctorRepository, PersonRepository personRepository, PatientRepository patientRepository) {
        this.doctorRepository = doctorRepository;
        this.personRepository = personRepository;
        this.patientRepository = patientRepository;
    }

    private Optional<Doctor> verifyDoctorExistence(UUID id) {
        Optional<Doctor> doctorOptional = doctorRepository.findById(id);
        if (!doctorOptional.isPresent()) {
            LOGGER.error("Doctor with id {} was not found in the db", id);
            throw new ResourceNotFoundException(Doctor.class.getSimpleName() + " with id: " + id);
        }
        return doctorOptional;
    }

    public Doctor getDoctorById(UUID id) {
        Optional<Doctor> doctorOptional = verifyDoctorExistence(id);
        return doctorOptional.get();
    }

    public UUID insertDoctor(Person person){
        Doctor doctor = DoctorBuilder.toEntity(person);
        doctor = doctorRepository.save(doctor);
        LOGGER.debug("Doctor with id {} was inserted in db", doctor.getId());
        return doctor.getId();
    }

    public Person verifyDoctorLogin(User user){
        Person person = personRepository.findByUsernameAndPassword(user.getUsername(), user.getPassword());
        return person;
    }

    public Doctor getDoctorByPersonId(UUID id){return doctorRepository.findDoctorByPerson_Id(id);}

    public List<PatientDTO> getAllPatientsOfDoctorById(UUID id){
        List<Patient> patientList = patientRepository.findAllByDoctor_Id(id);
        List<PatientDTO> patientDTOS = new ArrayList<>();
        patientList.stream().forEach(patient -> patientDTOS.add(PatientBuilder.toPatientDTO(patient)));
        return patientDTOS;
    }
}
