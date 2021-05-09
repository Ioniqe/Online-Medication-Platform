package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.repository;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.MedicationList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MedicationListRepository extends JpaRepository<MedicationList, UUID> {
    List<MedicationList> findAllByMedicationPlan_Id(UUID id);

    @Modifying
    @Query(value = "DELETE FROM medication_list_medicine " +
            "WHERE CAST(ENCODE(medication_list_medicine.medication_list_id, 'hex') AS uuid) = :listId", nativeQuery = true)
    void deleteListFromJoinTable(@Param("listId")UUID listId);
}
