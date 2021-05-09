package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.builder;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.SideEffectDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Medicine;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.SideEffect;

public class SideEffectBuilder {
    public SideEffectBuilder() {
    }

    public static SideEffectDTO toSideEffectDTOWithId(SideEffect sideEffect) {
        return new SideEffectDTO(sideEffect.getId(), sideEffect.getSideEffect());
    }

    public static SideEffect toEntity(SideEffectDTO sideEffectDTO, Medicine medicine) {
        return new SideEffect(sideEffectDTO.getSideEffect(), medicine);
    }

    public static SideEffect toEntity(SideEffectDTO sideEffectDTO) {
        return new SideEffect(sideEffectDTO.getSideEffect());
    }
}
