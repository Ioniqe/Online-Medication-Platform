package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.controller;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.SideEffectDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Medicine;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.SideEffect;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service.MedicineService;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service.SideEffectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@RestController
//@CrossOrigin(origins = "http://localhost:8080", allowedHeaders = "*", exposedHeaders = "Authorization")
@CrossOrigin(origins = "*")
public class SideEffectsController {

    private final SideEffectService sideEffectService;
    private final MedicineService medicineService;

    @Autowired
    public SideEffectsController(SideEffectService sideEffectService, MedicineService medicineService) {
        this.sideEffectService = sideEffectService;
        this.medicineService = medicineService;
    }

    //--------------------------------CREATE SIDE EFFECT-------------------------------
    @RequestMapping(value = "/side_effect/new/{medicineId}", method = RequestMethod.POST)
    public ResponseEntity<UUID> createSideEffectOfMedicineId(
            @RequestBody SideEffectDTO sideEffectDTO,
            @PathVariable("medicineId") UUID medicineId) {
        Medicine medicine = medicineService.getMedicineById(medicineId);
        UUID sideEffectID = sideEffectService.insertSideEffect(sideEffectDTO, medicine);
        return new ResponseEntity<>(sideEffectID, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/side_effect/new", method = RequestMethod.POST)
    public ResponseEntity<UUID> createSideEffect(@RequestBody SideEffectDTO sideEffectDTO) {
        UUID sideEffectID = sideEffectService.saveSideEffect(sideEffectDTO);
        return new ResponseEntity<>(sideEffectID, HttpStatus.CREATED);
    }

    //------------------------------CREATE SIDE EFFECTS LIST-----------------------------
    @RequestMapping(value = "/side_effects_list/new/{medicineId}", method = RequestMethod.POST)
    public ResponseEntity<List<UUID>> createSideEffectsList(
            @RequestBody List<SideEffectDTO> sideEffectDTOs,
            @PathVariable("medicineId") UUID medicineId) {
        Medicine medicine = medicineService.getMedicineById(medicineId);
        List<UUID> newIds = new ArrayList<>();
        sideEffectDTOs.stream().forEach(sideEffectDTO -> {
            UUID id = sideEffectService.insertSideEffect(sideEffectDTO, medicine);
            newIds.add(id);
        });
        return new ResponseEntity<>(newIds, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/side_effects_list/{medicineId}", method = RequestMethod.POST)
    public ResponseEntity<UUID> assignSideEffectsList(
            @RequestBody List<SideEffectDTO> sideEffectDTOs,
            @PathVariable("medicineId") UUID medicineId) {
        Medicine medicine = medicineService.getMedicineById(medicineId);

        try { //remove medicine from deleted side effects(for this medicine)
            Set<SideEffect> sideEffects = medicine.getSideEffect();
            boolean ok = false;
            for(SideEffect se : sideEffects){
                ok = false;
                for(SideEffectDTO dto : sideEffectDTOs){
                    if (dto.getSideEffect().equals(se.getSideEffect())) {
                        ok = true;
                    }
                }
                if(!ok){
                    se.setMedicine(null);
                    sideEffectService.saveSideEffectWithId(se);
                }
            }
        } catch (Exception e) {
            System.out.println("Medicine has no sideEffects");
        }

        List<SideEffect> sideEffectList = new ArrayList<>();

        sideEffectDTOs.forEach(sideEffectDTO -> {
            SideEffect sideEffect = sideEffectService.associateSideEffWithMedication(sideEffectDTO, medicine);
            sideEffectList.add(sideEffect);
        });

        medicineService.addSideEffectsListToMedicine(sideEffectList, medicine);
        return new ResponseEntity<>(medicineId, HttpStatus.OK);
    }

    //-----------------------------READ LIST FROM MEDICINE ID------------------------------
    @RequestMapping(value = "/side_effects/medicine/{medicineId}", method = RequestMethod.GET)
    public ResponseEntity<List<SideEffectDTO>> getSideEffectsOfMedicineId(@PathVariable("medicineId") UUID id) {
        List<SideEffectDTO> sideEffectsDTOS = sideEffectService.getSideEffectOfMedicineById(id);
        return new ResponseEntity<>(sideEffectsDTOS, HttpStatus.OK);
    }

    //-----------------------------------READ ALL LIST--------------------------------------
    @RequestMapping(value = "/side_effects", method = RequestMethod.GET)
    public ResponseEntity<List<SideEffectDTO>> getAllSideEffects() {
        List<SideEffectDTO> sideEffectDTOS = sideEffectService.getAllSideEffects();
        return new ResponseEntity<>(sideEffectDTOS, HttpStatus.OK);
    }
}
