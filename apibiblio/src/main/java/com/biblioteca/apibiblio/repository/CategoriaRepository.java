package com.biblioteca.apibiblio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.biblioteca.apibiblio.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    
}
