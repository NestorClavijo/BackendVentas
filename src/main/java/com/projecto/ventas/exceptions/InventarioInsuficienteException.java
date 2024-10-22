package com.projecto.ventas.exceptions;

public class InventarioInsuficienteException extends RuntimeException {
    public InventarioInsuficienteException(String mensaje) {
        super(mensaje);
    }
}
