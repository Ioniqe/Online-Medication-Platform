package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.repository;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, UUID> {
    @Query(value = "SELECT medicine.id, medicine.name, medicine.dosage FROM medicine " +
            "INNER JOIN medication_list_medicine ON medicine.id = medication_list_medicine.medicine_id " +
            "INNER JOIN medication_list ON medication_list.id = medication_list_medicine.medication_list_id " +
            "WHERE CAST(ENCODE(medication_list.id, 'hex') AS uuid) = :medListId", nativeQuery = true)
    List<Medicine> findMedicinesByMedicationListId(@Param("medListId") UUID uuid);

    @Query(value = "SELECT medicine.id, medicine.name, medicine.dosage FROM medicine", nativeQuery = true)
    List<Medicine> getAllMedicines();

    @Modifying
    @Query(value = "DELETE FROM medication_list_medicine " +
            "WHERE CAST(ENCODE(medication_list_medicine.medicine_id, 'hex') AS uuid) = :medicineID", nativeQuery = true)
    void deleteMedicineFromMedicationLists(@Param("medicineID") UUID medicineID);
}

