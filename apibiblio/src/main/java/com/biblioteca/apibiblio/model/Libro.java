package com.biblioteca.apibiblio.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Libro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long libroId;

    private String ISBN;
    private String titulo;
    private String descripcion;
    private int numeroPaginas;
    private int estado;
    private int cantidad;

    @ManyToOne
    @JoinColumn(name = "categoriaId")
    private Categoria categoria;

    @ManyToOne
    @JoinColumn(name = "editorialId")
    private Editorial editorial;

    @ManyToOne
    @JoinColumn(name = "autorId")
    private Autor autor;

    @JsonIgnore
    @OneToMany(mappedBy = "libro")
    private List<Prestamos> prestamos;
}
