package com.projecto.ventas.DTO;

import com.projecto.ventas.models.Estado;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CrearFacturaDTO {
    private LocalDateTime fecha_hora;
    private Long cliente_id;
    private Estado estado;
}
