package com.projecto.ventas.repositry;

import com.projecto.ventas.models.Factura;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacturaRepository extends JpaRepository<Factura,Long> {
}
