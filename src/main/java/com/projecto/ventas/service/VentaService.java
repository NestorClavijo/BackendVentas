package com.projecto.ventas.service;
import com.projecto.ventas.DTO.CrearVentaDTO;
import com.projecto.ventas.models.Venta;

public interface VentaService {
    Venta newVenta(CrearVentaDTO crearVentaDTO);
    Iterable<Venta> getVentas(Long id_cliente);
    Venta cancelarVenta(Long id_venta);
}
