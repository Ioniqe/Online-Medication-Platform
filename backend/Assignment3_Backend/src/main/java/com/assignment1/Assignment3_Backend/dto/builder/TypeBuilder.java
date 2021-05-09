package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.builder;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.TypeDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Type;

public class TypeBuilder {

    public TypeBuilder() {
    }

    public static TypeDTO toTypeDTO(Type type){
        return new TypeDTO(type.getId(), type.getType());
    }

}
