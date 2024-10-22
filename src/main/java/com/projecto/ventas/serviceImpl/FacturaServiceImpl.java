package com.projecto.ventas.serviceImpl;

import com.projecto.ventas.DTO.CrearFacturaDTO;
import com.projecto.ventas.exceptions.InventarioInsuficienteException;
import com.projecto.ventas.models.Estado;
import com.projecto.ventas.models.Factura;
import com.projecto.ventas.models.Producto;
import com.projecto.ventas.models.Venta;
import com.projecto.ventas.repositry.FacturaRepository;
import com.projecto.ventas.repositry.ProductoRepository;
import com.projecto.ventas.repositry.VentaRepository;
import com.projecto.ventas.service.FacturaService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacturaServiceImpl implements FacturaService {

    @Autowired
    private final VentaRepository ventaRespository;
    private final ProductoRepository productoRepository;
    private final FacturaRepository facturaRespository;

    public FacturaServiceImpl(VentaRepository ventaRespository, ProductoRepository productoRepository, FacturaRepository facturaRespository) {
        this.ventaRespository = ventaRespository;
        this.productoRepository = productoRepository;
        this.facturaRespository = facturaRespository;
    }

    @Override
    @Transactional
    public Factura newFactura(CrearFacturaDTO crearFacturaDTO){

        List<Venta> ventas = ventaRespository.findVentasByClienteIdAndEstado(crearFacturaDTO.getCliente_id(), Estado.ENPROCESO);

        Factura factura = Factura.builder()
                .fecha_hora(crearFacturaDTO.getFecha_hora())
                .build();

        for (Venta venta : ventas) {
            if (!estaDisponible(venta.getProducto().getCantidad(), venta.getCantidad())) {
                // Si algún producto no tiene suficiente inventario, cancelar la operación y devolver null o lanzar una excepción
                throw new InventarioInsuficienteException("No hay suficiente inventario para el producto: " + venta.getProducto().getNombre());
            }
        }

        facturaRespository.save(factura);

        for (Venta venta : ventas){
            // Solo se reduce el inventario si el estado es REALIZADO
            if (Estado.REALIZADO.equals(crearFacturaDTO.getEstado())) {
                // Reducir inventario
                reducirInventario(venta.getProducto(), venta.getCantidad());
                venta.setEstado(Estado.REALIZADO);
            } else {
                // Si no es REALIZADO, cancelar la venta
                venta.setEstado(Estado.CANCELADO);
            }
            // Asignar la factura a la venta
            venta.setFactura(factura);
            ventaRespository.save(venta);
        }

        return factura;
    }

    private void reducirInventario(Producto producto, Integer cantidad){

        if(estaDisponible(producto.getCantidad(),cantidad)){
            Integer aux = producto.getCantidad() - cantidad;
            producto.setCantidad(aux);
            productoRepository.save(producto);
        }
    }

    private Boolean estaDisponible(Integer cantProducto, Integer cantSolicitada){
        return cantSolicitada <= cantProducto;
    }
}
