package com.projecto.ventas.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CrearVentaDTO {
    private Long productoId;
    private Integer cantidad;
    private Long clienteId;
}
