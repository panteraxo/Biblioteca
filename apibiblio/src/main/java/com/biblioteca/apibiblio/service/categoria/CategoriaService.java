package com.biblioteca.apibiblio.service.categoria;

import java.util.List;

import org.springframework.stereotype.Service;

import com.biblioteca.apibiblio.model.Categoria;
import com.biblioteca.apibiblio.repository.CategoriaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoriaService implements ICategoriaService {
    private final CategoriaRepository categoriaRepository;

    @Override
    public List<Categoria> getAllCategorias() {
        return categoriaRepository.findAll();
    }

    @Override
    public Categoria addCategoria(Categoria Categoria) {
        return categoriaRepository.save(Categoria);
          }

    
    @Override
    public void deleteCategoriaById(Long id) {
        categoriaRepository.deleteById(id);
      }

    @Override
    public Categoria getCategoriaById(Long id) {
      return categoriaRepository.findById(id).orElse(null);
    }

    @Override
    public Categoria updateCategoria(Categoria Categoria, Long id) {
        return categoriaRepository.findById(id)
                .map(Categoria1 -> {
                    Categoria1.setNombre(Categoria.getNombre());
                    Categoria1.setDescripcion(Categoria.getDescripcion());
                    
                    

                    return categoriaRepository.save(Categoria1);

                })
                .orElseGet(() -> {
                    Categoria.setCategoriaId(id);
                    return categoriaRepository.save(Categoria);
                });
    }
}
    