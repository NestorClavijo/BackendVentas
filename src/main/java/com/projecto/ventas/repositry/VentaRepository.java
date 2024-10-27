package com.projecto.ventas.repositry;

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
}
