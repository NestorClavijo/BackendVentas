package com.projecto.ventas.repositry;

import com.projecto.ventas.DTO.InformeDTO;
import com.projecto.ventas.models.Estado;
import com.projecto.ventas.models.Venta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VentaRepository extends JpaRepository<Venta,Long> {

    @Query("SELECT v FROM Venta v WHERE v.cliente.id = :clienteId AND v.estado = :estado")
    List<Venta> findVentasByClienteIdAndEstado(
            @Param("clienteId") Long clienteId,
            @Param("estado") Estado estado
    );

    @Query("SELECT v FROM Venta v WHERE v.cliente.id = :clienteId AND v.estado = :estado and v.producto.id =:productoId")
    Venta findVentasByClienteIdAndEstadoAndProductoId(
            @Param("clienteId") Long clienteId,
            @Param("estado") Estado estado,
            @Param("productoId") Long productoId
    );

    @Query("SELECT new com.projecto.ventas.DTO.InformeDTO(p.nombre, SUM(v.cantidad * p.precio)) " +
            "FROM Venta v JOIN v.producto p " +
            "WHERE v.estado = 'REALIZADO' " +
            "GROUP BY p.producto_id")
    List<InformeDTO> informeVentas();
}
