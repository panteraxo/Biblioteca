package com.biblioteca.apibiblio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.biblioteca.apibiblio.model.Libro;

public interface LibroRepository extends JpaRepository<Libro, Long> {
    
}
