package com.projecto.ventas.serviceImpl;

import com.projecto.ventas.DTO.CrearVentaDTO;
import com.projecto.ventas.exceptions.InventarioInsuficienteException;
import com.projecto.ventas.models.*;
import com.projecto.ventas.repositry.*;
import com.projecto.ventas.service.VentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VentaServiceImpl implements VentaService {

    @Autowired
    private final FacturaRepository facturaRespository;
    private final ProductoRepository productoRepository;
    private final ClienteRepository clienteRepository;
    private final VentaRepository ventaRepository;

    public VentaServiceImpl(FacturaRepository facturaRespository, ProductoRepository productoRespository, ClienteRepository clienteRepository, VentaRepository ventaRepository) {
        this.facturaRespository = facturaRespository;
        this.productoRepository = productoRespository;
        this.clienteRepository = clienteRepository;
        this.ventaRepository = ventaRepository;
    }

    @Override
    public Venta newVenta(CrearVentaDTO crearVentaDTO) {

        Venta venta = (Venta) ventaRepository.findVentasByClienteIdAndEstadoAndProductoId(crearVentaDTO.getClienteId(), Estado.ENPROCESO, crearVentaDTO.getProductoId());

        Producto producto = productoRepository.findById(crearVentaDTO.getProductoId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        if(venta != null && estaDisponible(producto.getCantidad(),crearVentaDTO.getCantidad() + venta.getCantidad()) ){
            venta.setCantidad(crearVentaDTO.getCantidad() + venta.getCantidad());
            return ventaRepository.save(venta);
        }
        else{
            Factura factura = facturaRespository.findById(0L)
                    .orElseThrow(() -> new RuntimeException("Factura con id 0 no encontrada"));

            Cliente cliente = clienteRepository.findById(crearVentaDTO.getClienteId())
                    .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

            if(estaDisponible(producto.getCantidad(),crearVentaDTO.getCantidad() )){

                Venta venta2 = Venta.builder()
                        .cantidad(crearVentaDTO.getCantidad())
                        .factura(factura)
                        .estado(Estado.ENPROCESO)
                        .cliente(cliente)
                        .producto(producto)
                        .build();

                return ventaRepository.save(venta2);
            }else{
                throw new InventarioInsuficienteException("Inventario insuficiente para el producto");
            }
        }
    }

    private Boolean estaDisponible(Integer cantProducto, Integer cantSolicitada){
        return cantSolicitada <= cantProducto;
    }

    @Override
    public Iterable<Venta> getVentas(Long id_cliente){
        return ventaRepository.findVentasByClienteIdAndEstado(id_cliente,Estado.ENPROCESO);
    }

    @Override
    public Venta cancelarVenta(Long id_venta){
        Venta venta = ventaRepository.findById(id_venta).orElseThrow(() -> new RuntimeException("Venta no encontrada"));
        venta.setEstado(Estado.CANCELADO);
        return ventaRepository.save(venta);
    }

}
