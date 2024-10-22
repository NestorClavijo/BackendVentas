package com.projecto.ventas.service;

import com.projecto.ventas.DTO.CrearFacturaDTO;
import com.projecto.ventas.models.Factura;

public interface FacturaService {
    public Factura newFactura(CrearFacturaDTO crearFacturaDTO);
}
