package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.repository;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, UUID> {
    List<MedicalRecord> findAllByPatient_Id(UUID id);
}
