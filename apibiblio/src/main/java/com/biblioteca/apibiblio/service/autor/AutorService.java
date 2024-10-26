package com.biblioteca.apibiblio.service.autor;

import java.util.List;

import org.springframework.stereotype.Service;

import com.biblioteca.apibiblio.model.Autor;
import com.biblioteca.apibiblio.repository.AutorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AutorService implements IAutorService {
    private final AutorRepository autorRepository;

    @Override
    public List<Autor> getAllAutors() {
        return autorRepository.findAll();
    }

    @Override
    public Autor addAutor(Autor Autor) {
        return autorRepository.save(Autor);
          }

    
    @Override
    public void deleteAutorById(Long id) {
        autorRepository.deleteById(id);
      }

    @Override
    public Autor getAutorById(Long id) {
      return autorRepository.findById(id).orElse(null);
    }

    @Override
    public Autor updateAutor(Autor Autor, Long id) {
        return autorRepository.findById(id)
                .map(Autor1 -> {
                    
                    Autor1.setNombre(Autor.getNombre());
                    Autor1.setApellido(Autor.getApellido());
                    Autor1.setFechaNacimiento(Autor.getFechaNacimiento());
                    Autor1.setBiografia(Autor.getBiografia());
                    return autorRepository.save(Autor1);

                })
                .orElseGet(() -> {
                    Autor.setAutorId(id);
                    return autorRepository.save(Autor);
                });
    }
}
    