package com.projecto.ventas.config;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    Long user_id;
    String nombre;
    String apellido;
    String email;
    String telefono;
    String username;
    String password;
}
