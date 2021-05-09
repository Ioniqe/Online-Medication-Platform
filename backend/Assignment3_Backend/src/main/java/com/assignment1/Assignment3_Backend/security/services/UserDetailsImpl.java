package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.security.services;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.PersonDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Person;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public class UserDetailsImpl implements UserDetails {
    private static final long serialVersionUID = 1L;

    private UUID id;
    private String username;
    @JsonIgnore
    private String password;
    private String firstname;
    private String lastname;
    private LocalDate birth_date;
    private String address;
    private String gender;
    private String type;

    private Collection<? extends GrantedAuthority> authorities;

    public UserDetailsImpl(UUID id, String username, String password, String firstname,
                           String lastname, LocalDate birth_date, String address, String gender,
                           String type, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.birth_date = birth_date;
        this.address = address;
        this.gender = gender;
        this.type = type;
        this.authorities = authorities;
    }

    public static UserDetailsImpl build(PersonDTO person) {
        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + person.getType().toUpperCase()));

        return new UserDetailsImpl(
                person.getId(),
                person.getUsername(),
                person.getPassword(),
                person.getFirstname(),
                person.getLastname(),
                person.getBirth_date(),
                person.getAddress(),
                person.getGender(),
                person.getType(),
                authorities);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public UUID getId() {
        return id;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public String getFirstname() {
        return firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public LocalDate getBirth_date() {
        return birth_date;
    }

    public String getAddress() {
        return address;
    }

    public String getGender() {
        return gender;
    }

    public String getType() {
        return type;
    }
}