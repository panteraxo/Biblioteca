package com.biblioteca.apibiblio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.biblioteca.apibiblio.model.Autor;

public interface AutorRepository extends JpaRepository<Autor, Long> {
    
}
