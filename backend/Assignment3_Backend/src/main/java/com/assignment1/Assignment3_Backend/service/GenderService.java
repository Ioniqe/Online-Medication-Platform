package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Gender;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.repository.GenderRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class GenderService {
    private final GenderRepository genderRepository;

    @Autowired
    public GenderService(GenderRepository genderRepository) {
        this.genderRepository = genderRepository;
    }

    public Gender getGenderByGender(String gender){return genderRepository.findGenderByGender(gender);}
}
