package com.projecto.ventas.endpoints;

import com.projecto.ventas.DTO.CrearFacturaDTO;
import com.projecto.ventas.models.Factura;
import com.projecto.ventas.service.FacturaService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/factura")
@RequiredArgsConstructor
@CrossOrigin(origins="*")
public class EndpointsFactura {

    @Autowired
    private final FacturaService facturaService;

    @CrossOrigin(origins="*")
    @PostMapping("/nueva")
    public Factura newFactura(@RequestBody CrearFacturaDTO crearFacturaDTO) {
        return facturaService.newFactura(crearFacturaDTO);
    }
}
