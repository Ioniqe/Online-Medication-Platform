package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.security.services;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.PersonDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.builder.PersonBuilder;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Person;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private final PersonRepository personRepository;

    public UserDetailsServiceImpl(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Person person = personRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
        return UserDetailsImpl.build(PersonBuilder.toPersonDTOWithDetails(person));
    }
}
