package com.biblioteca.apibiblio.service.editorial;

import java.util.List;

import com.biblioteca.apibiblio.model.Editorial;

public interface IEditorialService {
    Editorial addEditorial(Editorial Editorial);
    Editorial updateEditorial(Editorial Editorial,Long id);
    void deleteEditorialById(Long id);
    Editorial getEditorialById(Long id);
    List<Editorial> getAllEditorials();
    
}
