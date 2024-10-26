package com.biblioteca.apibiblio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.biblioteca.apibiblio.model.Prestamos;

public interface PrestamosRepository extends JpaRepository<Prestamos, Long> {

}
