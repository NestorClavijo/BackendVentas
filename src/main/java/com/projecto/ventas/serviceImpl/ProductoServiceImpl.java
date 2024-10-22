package com.projecto.ventas.serviceImpl;

import com.projecto.ventas.models.Producto;
import com.projecto.ventas.repositry.ProductoRepository;
import com.projecto.ventas.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductoServiceImpl implements ProductoService {

    @Autowired
    private final ProductoRepository productoRespository;

    public ProductoServiceImpl(ProductoRepository productoRespository) {
        this.productoRespository = productoRespository;
    }

    @Autowired
    public Iterable<Producto> getAllProducto() {
        return this.productoRespository.findAll();
    }

    @Override
    public ResponseEntity<Producto> getProducto(Long producto_id) {
        Optional<Producto> producto = productoRespository.findById(producto_id);
        return producto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
