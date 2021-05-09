package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto;

import java.util.UUID;

public class SideEffectDTO {
    private UUID id;
    private String sideEffect;

    public SideEffectDTO() {
    }

    public SideEffectDTO(String sideEffect) {
        this.sideEffect = sideEffect;
    }

    public SideEffectDTO(UUID id, String sideEffect) {
        this.id = id;
        this.sideEffect = sideEffect;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getSideEffect() {
        return sideEffect;
    }

    public void setSideEffect(String sideEffect) {
        this.sideEffect = sideEffect;
    }
}
