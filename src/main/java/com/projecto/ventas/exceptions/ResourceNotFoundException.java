package com.projecto.ventas.exceptions;

public class ResourceNotFoundException extends Throwable {
    public ResourceNotFoundException(String mensaje) {
        super(mensaje);
    }
}
