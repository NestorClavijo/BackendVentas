package com.projecto.ventas.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InformeDTO {
    private String nombreProducto;
    private Double cantidadVendida;
}
