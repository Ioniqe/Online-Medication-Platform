package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.repository;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeRepository  extends JpaRepository<Type, Integer> {
    Type findTypeById(Integer id);
    Type findTypeByType(String type);
}
