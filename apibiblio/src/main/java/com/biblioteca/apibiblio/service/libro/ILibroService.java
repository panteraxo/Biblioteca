package com.biblioteca.apibiblio.service.libro;

import java.util.List;

import com.biblioteca.apibiblio.model.Libro;

public interface ILibroService {
    Libro addLibro(Libro libro);
    Libro updateLibro(Libro libro,Long id);
    void deleteLibroById(Long id);
    Libro getLibroById(Long id);
    List<Libro> getAllLibros();
    
}
