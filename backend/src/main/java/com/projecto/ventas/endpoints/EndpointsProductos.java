package com.projecto.ventas.endpoints;

import com.projecto.ventas.models.Producto;
import com.projecto.ventas.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/producto")
@CrossOrigin(origins="*")
public class EndpointsProductos {

    @Autowired
    private final ProductoService productoService;

    public EndpointsProductos(ProductoService productoService) {
        this.productoService = productoService;
    }

    @CrossOrigin(origins="*")
    @GetMapping("/all")
    public Iterable<Producto> getAllProducto(){
        return this.productoService.getAllProducto();
    }

    @CrossOrigin(origins="*")
    @GetMapping("/{producto_id}")
    public ResponseEntity<Producto> getProducto(@PathVariable("producto_id") Long producto_id){
        return this.productoService.getProducto(producto_id);
    }

}
