package com.projecto.ventas.repositry;

import com.projecto.ventas.models.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto,Long> {
}
