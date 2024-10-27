package com.projecto.ventas.endpoints;

import com.projecto.ventas.DTO.CrearVentaDTO;
import com.projecto.ventas.models.Venta;
import com.projecto.ventas.service.ProductoService;
import com.projecto.ventas.service.VentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/venta")
@CrossOrigin(origins="http://localhost:3000")
public class EndpointsVentas {

    @Autowired
    private final VentaService ventaService;

    public EndpointsVentas(VentaService ventaService) {
        this.ventaService = ventaService;
    }

    @PostMapping("/nueva")
    public Venta newVenta(@RequestBody CrearVentaDTO crearVentaDTO) {
        return ventaService.newVenta(crearVentaDTO);
    }

    @PostMapping("/cancelar/{id_venta}")
    public Venta cancelarVenta(@PathVariable("id_venta") Long id_venta) {
        return ventaService.cancelarVenta(id_venta);
    }

    @GetMapping("/{id_cliente}")
    public Iterable<Venta> getVentas(@PathVariable("id_cliente") Long id_cliente){
        return ventaService.getVentas(id_cliente);
    }
}
