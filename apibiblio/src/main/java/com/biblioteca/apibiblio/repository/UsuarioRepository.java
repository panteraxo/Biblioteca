package com.biblioteca.apibiblio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.biblioteca.apibiblio.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
}
