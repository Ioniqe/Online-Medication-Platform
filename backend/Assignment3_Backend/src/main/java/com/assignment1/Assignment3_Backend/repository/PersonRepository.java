package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.repository;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PersonRepository extends JpaRepository<Person, UUID> {
    Person findPersonByUsername(String username);

    @Query(value = "SELECT person.id, person.username, person.password, person.type_id, person.firstname,  " +
            "person.lastname, person.birth_date, person.gender_id, person.address " +
            "FROM person INNER JOIN type ON person.type_id = type.id " +
            "WHERE :personType = type.type", nativeQuery = true)
    List<Person> findAllByPeopleByType(@Param("personType") String type);

    Person findPersonById(UUID id);

    @Modifying
    @Query(value = "DELETE FROM person " +
            "WHERE :personId = CAST(ENCODE(person.id, 'hex') AS uuid)", nativeQuery = true)
    void deleteById(@Param("personId") UUID id);

    @Query(value = "SELECT person.id, person.username, person.password, person.type_id, person.firstname,  " +
            "person.lastname, person.birth_date, person.gender_id, person.address FROM person " +
            "WHERE :username = person.username AND :password = person.password", nativeQuery = true)
    Person findByUsernameAndPassword(@Param("username") String username, @Param("password") String password);

    Optional<Person> findByUsername(String username);
}
