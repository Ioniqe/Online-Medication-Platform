package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.TypeDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.builder.TypeBuilder;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Type;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.repository.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TypeService {
    private final TypeRepository typeRepository;

    @Autowired
    public TypeService(TypeRepository typeRepository) {
        this.typeRepository = typeRepository;
    }

    public TypeDTO getTypeById(Integer id){return TypeBuilder.toTypeDTO(typeRepository.findTypeById(id));}

    public Type getTypeByType(String type){return typeRepository.findTypeByType(type);}
}
