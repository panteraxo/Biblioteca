package com.biblioteca.apibiblio.service.autor;

import java.util.List;

import com.biblioteca.apibiblio.model.Autor;

public interface IAutorService {
    Autor addAutor(Autor Autor);
    Autor updateAutor(Autor Autor,Long id);
    void deleteAutorById(Long id);
    Autor getAutorById(Long id);
    List<Autor> getAllAutors();
    
}
