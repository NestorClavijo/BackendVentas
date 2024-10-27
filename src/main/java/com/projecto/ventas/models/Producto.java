package com.projecto.ventas.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.w3c.dom.Text;

import java.util.Set;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "producto")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long producto_id;

    @Column(name = "nombre",length=255 ,nullable=false)
    private String nombre;

    @Column(name = "precio",length=255 ,nullable=false)
    private float precio;

    @Column(name = "cantidad",length=255 ,nullable=false)
    private Integer cantidad;

    @Column(name = "descripcion",length=255 ,nullable=false, unique = true)
    private String descripcion;

    @Column(name = "descripcion_corta",length=255 ,nullable=false)
    private String descripcionCorta;

    @Column(name = "foto",columnDefinition = "TEXT")
    private String foto;

    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;

}
