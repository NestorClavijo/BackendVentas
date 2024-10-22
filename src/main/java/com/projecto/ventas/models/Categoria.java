package com.projecto.ventas.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "categoria")
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoria_id;

    @Column(name = "nombre",length=255, nullable = false,unique = true)
    private String nombre;

    @Column(name = "descripcion",length=255, nullable = false,unique = true)
    private String descripcion;
}
