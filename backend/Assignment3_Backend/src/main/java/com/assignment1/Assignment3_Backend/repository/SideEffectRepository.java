package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.repository;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.SideEffect;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SideEffectRepository extends JpaRepository<SideEffect, UUID> {
    List<SideEffect> findAllByMedicine_Id(UUID id);

    @Query(value="SELECT side_effects.id, side_effects.side_effects, side_effects.medication_id FROM side_effects",  nativeQuery = true)
    List<SideEffect> getAllSideEffects();

    SideEffect findSideEffectById(UUID id);
}
