package com.aicyp.common;

public class ApiException extends RuntimeException {
    public ApiException(String message) {
        super(message);
    }
}