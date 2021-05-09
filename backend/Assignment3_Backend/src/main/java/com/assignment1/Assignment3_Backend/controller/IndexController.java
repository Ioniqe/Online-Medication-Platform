package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
//@CrossOrigin
@CrossOrigin(origins = "*")
public class IndexController {

    @GetMapping(value = "/")
    public ResponseEntity<String> getStatus() {
        return new ResponseEntity<>("Medical App Service is running... :')", HttpStatus.OK);
    }
}
