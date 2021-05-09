package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity;

import javax.persistence.*;
import java.util.Set;

@Entity(name = "type")
@Table(name = "type")
public class Type{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "type", nullable = false)
    private String type;

    @OneToMany(mappedBy = "type")
    private Set<Person> people;

    public Type() {
    }

    public Type(String type, Set<Person> people) {
        this.type = type;
        this.people = people;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Set<Person> getPeople() {
        return people;
    }

    public void setPeople(Set<Person> people) {
        this.people = people;
    }
}
