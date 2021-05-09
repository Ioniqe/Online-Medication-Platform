package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.repository;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PatientRepository extends JpaRepository<Patient, UUID> {
    List<Patient> findAllByCaregiver_Id(UUID id);
    List<Patient> findAllByDoctor_Id(UUID id);
    Patient findPatientById(UUID id);

    Patient findPatientByPerson_Id(UUID id);

//    @Query(value = "SELECT patient.id FROM patient " +
//            "INNER JOIN person ON patient.person_id = person.id " +
//            "WHERE CAST(ENCODE(person.id , 'hex') AS uuid) = :personID", nativeQuery = true)
//    UUID getPatientIdByPersonId(UUID personID);

//    @Modifying
//    @Query(value = "UPDATE patient " +
//            "SET patient.caregiver_id = :caregiverID " +
//            "WHERE CAST(ENCODE(patient.id , 'hex') AS uuid) = :patientID", nativeQuery = true)
//    void setCaregiverToPatient( @Param("patientID") UUID patientID, @Param("caregiverID") byte[] caregiverID);
}
