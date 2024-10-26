package com.biblioteca.apibiblio.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Estudiante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long estudianteId;

    private String documento;
    private String codigo;
    private String nombre;
    private String telefono;
    private String carrera;

    @JsonIgnore
    @OneToMany(mappedBy = "estudiante")
    private List<Prestamos> prestamos;
}
