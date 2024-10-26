package com.biblioteca.apibiblio.service.editorial;

import java.util.List;

import org.springframework.stereotype.Service;

import com.biblioteca.apibiblio.model.Editorial;
import com.biblioteca.apibiblio.repository.EditorialRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EditorialService implements IEditorialService {
    private final EditorialRepository editorialRepository;

    @Override
    public List<Editorial> getAllEditorials() {
        return editorialRepository.findAll();
    }

    @Override
    public Editorial addEditorial(Editorial Editorial) {
        return editorialRepository.save(Editorial);
          }

    
    @Override
    public void deleteEditorialById(Long id) {
        editorialRepository.deleteById(id);
      }

    @Override
    public Editorial getEditorialById(Long id) {
      return editorialRepository.findById(id).orElse(null);
    }

    @Override
    public Editorial updateEditorial(Editorial Editorial, Long id) {
        return editorialRepository.findById(id)
                .map(Editorial1 -> {
                    
                    Editorial1.setNombre(Editorial.getNombre());
                    Editorial1.setPais(Editorial.getPais());
                    Editorial1.setSitioWeb(Editorial.getSitioWeb());
                    
                    return editorialRepository.save(Editorial1);

                })
                .orElseGet(() -> {
                    Editorial.setEditorialId(id);
                    return editorialRepository.save(Editorial);
                });
    }
}
    