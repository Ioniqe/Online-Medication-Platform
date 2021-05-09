package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.SideEffectDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.builder.SideEffectBuilder;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Medicine;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.SideEffect;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.repository.SideEffectRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class SideEffectService {
    private static final Logger LOGGER = LoggerFactory.getLogger(SideEffectService.class);
    public final SideEffectRepository sideEffectRepository;

    @Autowired
    public SideEffectService(SideEffectRepository sideEffectRepository) {
        this.sideEffectRepository = sideEffectRepository;
    }

    public List<SideEffectDTO> getSideEffectOfMedicineById(UUID id){
        List<SideEffect> sideEffectList = sideEffectRepository.findAllByMedicine_Id(id);
        List<SideEffectDTO> sideEffectDTOS = new ArrayList<>();
        sideEffectList.stream().forEach(sideEff -> sideEffectDTOS.add(SideEffectBuilder.toSideEffectDTOWithId(sideEff)));
        return sideEffectDTOS;
    }

    public UUID insertSideEffect(SideEffectDTO sideEffectDTO, Medicine medicine) {
        SideEffect sideEffect = SideEffectBuilder.toEntity(sideEffectDTO, medicine);
        sideEffect = sideEffectRepository.save(sideEffect);
        LOGGER.debug("Side Effect with id {} of medicine id {} was inserted in db", sideEffect.getId(), medicine.getId());
        return sideEffect.getId();
    }

    public List<SideEffectDTO> getAllSideEffects(){
        List<SideEffect> sideEffects = sideEffectRepository.getAllSideEffects();
        List<SideEffectDTO> sideEffectDTOS = new ArrayList<>();
        sideEffects.stream().forEach(sideEff -> sideEffectDTOS.add(SideEffectBuilder.toSideEffectDTOWithId(sideEff)));
        return sideEffectDTOS;
    }

    public UUID saveSideEffect(SideEffectDTO sideEffectDTO){
        SideEffect sideEffect = SideEffectBuilder.toEntity(sideEffectDTO);
        sideEffect = sideEffectRepository.save(sideEffect);
        LOGGER.debug("Side Effect with id {} was inserted in db", sideEffect.getId());
        return sideEffect.getId();
    }

    public UUID saveSideEffectWithId(SideEffect sideEffect){
        sideEffect = sideEffectRepository.save(sideEffect);
        LOGGER.debug("Side Effect with id {} was inserted in db", sideEffect.getId());
        return sideEffect.getId();
    }

    public SideEffect associateSideEffWithMedication(SideEffectDTO sideEffectDTO, Medicine medicine){
        SideEffect sideEffect = sideEffectRepository.findSideEffectById(sideEffectDTO.getId());
        sideEffect.setMedicine(medicine);
        sideEffect = sideEffectRepository.save(sideEffect);
        return sideEffect;
    }
}
