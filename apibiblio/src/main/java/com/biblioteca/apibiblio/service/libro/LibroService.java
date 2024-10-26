package com.biblioteca.apibiblio.service.libro;

import java.util.List;

import org.springframework.stereotype.Service;

import com.biblioteca.apibiblio.model.Libro;
import com.biblioteca.apibiblio.repository.LibroRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LibroService implements ILibroService {
    private final LibroRepository libroRepository;

    @Override
    public List<Libro> getAllLibros() {
        return libroRepository.findAll();
    }

    @Override
    public Libro addLibro(Libro libro) {
        return libroRepository.save(libro);
          }

    
    @Override
    public void deleteLibroById(Long id) {
        libroRepository.deleteById(id);
      }

    @Override
    public Libro getLibroById(Long id) {
      return libroRepository.findById(id).orElse(null);
    }

    @Override
    public Libro updateLibro(Libro libro, Long id) {
        return libroRepository.findById(id)
                .map(libro1 -> {
                    
                    libro1.setAutor(libro.getAutor());
                    libro1.setCantidad(libro.getCantidad());
                    libro1.setCategoria(libro.getCategoria());
                    libro1.setDescripcion(libro.getDescripcion());
                    libro1.setEditorial(libro.getEditorial());
                    libro1.setEstado(libro.getEstado());
                    libro1.setISBN(libro.getISBN());
                    libro1.setNumeroPaginas(libro.getNumeroPaginas());
                    libro1.setTitulo(libro.getTitulo());

                    return libroRepository.save(libro1);

                })
                .orElseGet(() -> {
                    libro.setLibroId(id);
                    return libroRepository.save(libro);
                });
    }
}
    