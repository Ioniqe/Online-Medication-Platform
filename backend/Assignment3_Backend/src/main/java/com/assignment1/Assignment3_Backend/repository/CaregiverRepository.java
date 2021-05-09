package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.repository;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Caregiver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface CaregiverRepository extends JpaRepository<Caregiver, UUID> {
    Caregiver findCaregiverById(UUID id);
    Caregiver findCaregiverByPerson_Id(UUID id);
}
