package com.biblioteca.apibiblio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.biblioteca.apibiblio.model.Editorial;

public interface EditorialRepository extends JpaRepository<Editorial, Long> {
    
}
