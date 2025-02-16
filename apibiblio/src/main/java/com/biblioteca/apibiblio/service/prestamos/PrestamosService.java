package com.biblioteca.apibiblio.service.prestamos;

import java.util.List;

import org.springframework.stereotype.Service;

import com.biblioteca.apibiblio.model.Prestamos;
import com.biblioteca.apibiblio.repository.PrestamosRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PrestamosService implements IPrestamosService {
    private final PrestamosRepository prestamosRepository;

    @Override
    public List<Prestamos> getAllPrestamoss() {
        return prestamosRepository.findAll();
    }

    @Override
    public Prestamos addPrestamos(Prestamos Prestamos) {
        return prestamosRepository.save(Prestamos);
          }

    
    @Override
    public void deletePrestamosById(Long id) {
        prestamosRepository.deleteById(id);
      }

    @Override
    public Prestamos getPrestamosById(Long id) {
      return prestamosRepository.findById(id).orElse(null);
    }

    @Override
    public Prestamos updatePrestamos(Prestamos Prestamos, Long id) {
        return prestamosRepository.findById(id)
                .map(Prestamos1 -> {
                    Prestamos1.setEstado(Prestamos.getEstado());
                    return prestamosRepository.save(Prestamos1);

                })
                .orElseGet(() -> {
                    Prestamos.setPrestamoId(id);
                    return prestamosRepository.save(Prestamos);
                });
    }
}
    