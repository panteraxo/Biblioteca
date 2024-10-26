package com.biblioteca.apibiblio.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Prestamos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long prestamoId;
    
    private String fechaPrestamo;
    private String fechaDevolucion;
    private int estado;

    @ManyToOne
    @JoinColumn(name = "estudianteId", nullable = false)
    private Estudiante estudiante;

    @ManyToOne
    @JoinColumn(name = "libroId", nullable = false)
    private Libro libro;
}
