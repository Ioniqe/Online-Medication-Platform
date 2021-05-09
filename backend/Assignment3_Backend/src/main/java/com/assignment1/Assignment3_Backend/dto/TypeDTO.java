package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto;

public class TypeDTO {
    private Integer id;
    private String type;

    public TypeDTO() {
    }

    public TypeDTO(Integer id, String type) {
        this.id = id;
        this.type = type;
    }

    public TypeDTO(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
