package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.persistence.Entity;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Set;
import java.util.UUID;

@Entity(name="person")
@Table(name = "person")
public class Person implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Type(type = "uuid-binary")
    @Column(name = "id")
    private UUID id;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "type_id", nullable = false)
    private com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Type type;

    @Column(name = "firstname", nullable = false)
    private String firstname;

    @Column(name = "lastname", nullable = false)
    private String lastname;

    @Column(name = "birth_date", nullable = false, columnDefinition = "DATE")
    @NotNull
    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private LocalDate birth_date;

    @Column(name = "address", nullable = false)
    private String address;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name="gender_id", nullable=false)
    private Gender gender;

    @OneToMany(mappedBy = "person", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Patient> listOfPatients;

    @OneToMany(mappedBy = "person", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Doctor> listOfDoctors;

    @OneToMany(mappedBy = "person", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Caregiver> listOfCaregivers;

    public Person() {
    }

    public Person(String username, String password, com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Type type, String firstname, String lastname, LocalDate birth_date, String address, Gender gender, Set<Patient> listOfPatients, Set<Doctor> listOfDoctors, Set<Caregiver> listOfCaregivers) {
        this.username = username;
        this.password = password;
        this.type = type;
        this.firstname = firstname;
        this.lastname = lastname;
        this.birth_date = birth_date;
        this.address = address;
        this.gender = gender;
        this.listOfPatients = listOfPatients;
        this.listOfDoctors = listOfDoctors;
        this.listOfCaregivers = listOfCaregivers;
    }

    public Person(String username, String password, String firstname, String lastname, LocalDate birth_date, String address) {
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.birth_date = birth_date;
        this.address = address;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
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

    public com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Type getType() {
        return type;
    }

    public void setType(com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Type type) {
        this.type = type;
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

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Set<Patient> getListOfPatients() {
        return listOfPatients;
    }

    public void setListOfPatients(Set<Patient> listOfPatients) {
        this.listOfPatients = listOfPatients;
    }

    public Set<Doctor> getListOfDoctors() {
        return listOfDoctors;
    }

    public void setListOfDoctors(Set<Doctor> listOfDoctors) {
        this.listOfDoctors = listOfDoctors;
    }

    public Set<Caregiver> getListOfCaregivers() {
        return listOfCaregivers;
    }

    public void setListOfCaregivers(Set<Caregiver> listOfCaregivers) {
        this.listOfCaregivers = listOfCaregivers;
    }

    public Integer getGenderId(){
        return gender.getId();
    }
}
