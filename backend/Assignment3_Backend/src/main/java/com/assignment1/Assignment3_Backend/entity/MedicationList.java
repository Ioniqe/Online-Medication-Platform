package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Entity(name = "medication_list")
@Table(name = "medication_list")
public class MedicationList implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Type(type = "uuid-binary")
    @Column(name = "id")
    private UUID id;

    @Column(name = "start_interval", nullable = false, columnDefinition = "TIME")
    private LocalDateTime startInterval;

    @Column(name = "end_interval", nullable = false, columnDefinition = "TIME")
    private LocalDateTime endInterval;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "med_plan_id", nullable = false, unique = true)
    private MedicationPlan medicationPlan;

    @ManyToMany
    @JoinTable(
            name = "medication_list_medicine",
            joinColumns = @JoinColumn(name = "medication_list_id"),
            inverseJoinColumns = @JoinColumn(name = "medicine_id"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Medicine> medicines;

    public MedicationList() {
    }

    public MedicationList(LocalDateTime startInterval, LocalDateTime endInterval, MedicationPlan medicationPlan) {
        this.startInterval = startInterval;
        this.endInterval = endInterval;
        this.medicationPlan = medicationPlan;
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

    public LocalDateTime getStartInterval() {
        return startInterval;
    }

    public void setStartInterval(LocalDateTime startInterval) {
        this.startInterval = startInterval;
    }

    public LocalDateTime getEndInterval() {
        return endInterval;
    }

    public void setEndInterval(LocalDateTime endInterval) {
        this.endInterval = endInterval;
    }

    public MedicationPlan getMedicationPlan() {
        return medicationPlan;
    }

    public void setMedicationPlan(MedicationPlan medicationPlan) {
        this.medicationPlan = medicationPlan;
    }

    public Set<Medicine> getMedicines() {
        return medicines;
    }

    public void setMedicines(Set<Medicine> medicines) {
        this.medicines = medicines;
    }
}
