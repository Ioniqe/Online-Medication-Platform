package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;
import java.util.UUID;

@Entity(name="doctor")
@Table(name = "doctor")
public class Doctor implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Type(type = "uuid-binary")
    @Column(name = "id")
    private UUID id;


    public Doctor() {
    }

    public Doctor(Set<Patient> listOfPatients, Person person) {
        this.listOfPatients = listOfPatients;
        this.person = person;
    }

    @OneToMany(mappedBy = "doctor", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Patient> listOfPatients;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="person_id", nullable=false, unique=true)
    private Person person;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Set<Patient> getListOfPatients() {
        return listOfPatients;
    }

    public void setListOfPatients(Set<Patient> listOfPatients) {
        this.listOfPatients = listOfPatients;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

}

