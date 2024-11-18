package com.projecto.ventas.service;

import com.projecto.ventas.models.Producto;
import org.springframework.http.ResponseEntity;

public interface ProductoService {
    Iterable<Producto> getAllProducto();
    ResponseEntity<Producto> getProducto(Long producto_id);
}
