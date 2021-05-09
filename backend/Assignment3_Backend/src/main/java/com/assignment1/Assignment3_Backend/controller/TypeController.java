package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.controller;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.TypeDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
//@CrossOrigin(origins = "http://localhost:8080", allowedHeaders = "*", exposedHeaders = "Authorization")
@CrossOrigin(origins = "*")
@RequestMapping(value = "/type")
public class TypeController {

    private final TypeService typeService;

    @Autowired
    public TypeController(TypeService typeService) {
        this.typeService = typeService;
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<TypeDTO> getType(@PathVariable("id") Integer typeId) {
        TypeDTO dto = typeService.getTypeById(typeId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
}
