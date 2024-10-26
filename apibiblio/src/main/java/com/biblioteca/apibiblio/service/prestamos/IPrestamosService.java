package com.biblioteca.apibiblio.service.prestamos;

import java.util.List;

import com.biblioteca.apibiblio.model.Prestamos;

public interface IPrestamosService {
    Prestamos addPrestamos(Prestamos Prestamos);
    Prestamos updatePrestamos(Prestamos Prestamos,Long id);
    void deletePrestamosById(Long id);
    Prestamos getPrestamosById(Long id);
    List<Prestamos> getAllPrestamoss();
    
}
