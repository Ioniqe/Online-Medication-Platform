package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.builder;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.PersonDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Person;

public class PersonBuilder {

    public PersonBuilder() {
    }

    public static PersonDTO toPersonDTO(Person person){
        return new PersonDTO(person.getId(), person.getUsername(), person.getPassword(), person.getFirstname(),
                person.getLastname(), person.getBirth_date(), person.getAddress());
    }

    public static PersonDTO toPersonDTOWithGender(Person person){
        return new PersonDTO(person.getId(), person.getUsername(), person.getPassword(), person.getFirstname(),
                person.getLastname(), person.getBirth_date(), person.getAddress(), person.getGender().getGender());
    }

    public static PersonDTO toPersonDTOWithDetails(Person person){
        return new PersonDTO(person.getId(), person.getUsername(), person.getPassword(), person.getFirstname(),
                person.getLastname(), person.getBirth_date(), person.getAddress(), person.getGender().getGender(), person.getType().getType());
    }

    public static Person toEntity(PersonDTO personDTO){
        return new Person(personDTO.getUsername(), personDTO.getPassword(), personDTO.getFirstname(),
                personDTO.getLastname(), personDTO.getBirth_date(), personDTO.getAddress());
    }
}
