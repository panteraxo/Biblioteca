package com.biblioteca.apibiblio.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter

@NoArgsConstructor
@Entity
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long categoriaId;
    private String nombre;
    private String descripcion;

    @JsonIgnore
    @OneToMany(mappedBy = "categoria")
    private List<Libro> libros;
}
