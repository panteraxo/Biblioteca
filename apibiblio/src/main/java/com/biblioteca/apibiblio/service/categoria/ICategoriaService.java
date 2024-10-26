package com.biblioteca.apibiblio.service.categoria;

import java.util.List;

import com.biblioteca.apibiblio.model.Categoria;

public interface ICategoriaService {
    Categoria addCategoria(Categoria Categoria);
    Categoria updateCategoria(Categoria Categoria,Long id);
    void deleteCategoriaById(Long id);
    Categoria getCategoriaById(Long id);
    List<Categoria> getAllCategorias();
    
}
