package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;
import java.util.UUID;

@Entity(name="medicine")
@Table(name = "medicine")
public class Medicine implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Type(type = "uuid-binary")
    @Column(name = "id")
    private UUID id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "dosage", nullable = false)
    private String dosage;

    public Medicine() {
    }

    public Medicine(String name, String dosage) {
        this.name = name;
        this.dosage = dosage;
    }

    @OneToMany(mappedBy = "medicine", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<SideEffect> sideEffect;

    @ManyToMany(mappedBy = "medicines")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<MedicationList> medicationLists;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDosage() {
        return dosage;
    }

    public void setDosage(String dosage) {
        this.dosage = dosage;
    }

    public Set<SideEffect> getSideEffect() {
        return sideEffect;
    }

    public void setSideEffect(Set<SideEffect> sideEffect) {
        this.sideEffect = sideEffect;
    }

    public Set<MedicationList> getMedicationLists() {
        return medicationLists;
    }

    public void setMedicationLists(Set<MedicationList> medicationLists) {
        this.medicationLists = medicationLists;
    }
}
