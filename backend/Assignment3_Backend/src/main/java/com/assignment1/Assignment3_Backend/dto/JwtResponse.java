package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto;

import java.time.LocalDate;
import java.util.UUID;

public class JwtResponse {
    private String token;
    private UUID id;
    private String username;
    private String password;
    private String firstname;
    private String lastname;
    private LocalDate birth_date;
    private String address;

    private String gender;
    private String type;

    public JwtResponse(String token, UUID id, String username, String password,
                       String firstname, String lastname, LocalDate birth_date,
                       String address, String gender, String type) {
        this.token = token;
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.birth_date = birth_date;
        this.address = address;
        this.gender = gender;
        this.type = type;
    }

    public JwtResponse() {
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public LocalDate getBirth_date() {
        return birth_date;
    }

    public void setBirth_date(LocalDate birth_date) {
        this.birth_date = birth_date;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
