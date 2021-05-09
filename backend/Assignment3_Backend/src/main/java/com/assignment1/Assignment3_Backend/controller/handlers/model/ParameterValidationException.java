package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.controller.handlers.model;

import org.springframework.http.HttpStatus;

import java.util.List;

public class ParameterValidationException extends CustomException {
    private static final String MESSAGE = "Parameter is invalid!";
    private static final HttpStatus httpStatus = HttpStatus.BAD_REQUEST;

    public ParameterValidationException(String resource, List<String> errors) {
        super(MESSAGE, httpStatus, resource, errors);
    }
}