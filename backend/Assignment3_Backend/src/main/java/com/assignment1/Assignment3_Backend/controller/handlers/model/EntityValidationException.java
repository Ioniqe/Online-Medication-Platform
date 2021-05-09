package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.controller.handlers.model;

import org.springframework.http.HttpStatus;

import java.util.List;

public class EntityValidationException extends CustomException {
    private static final String MESSAGE =  "Entity could not be processed !";
    private static final HttpStatus httpStatus = HttpStatus.UNPROCESSABLE_ENTITY;

    public EntityValidationException(String resource, List<String> errors) {
        super(MESSAGE,httpStatus, resource, errors);
    }
}

