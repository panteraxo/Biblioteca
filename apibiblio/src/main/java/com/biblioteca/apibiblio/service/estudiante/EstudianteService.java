package com.biblioteca.apibiblio.service.estudiante;

import java.util.List;

import org.springframework.stereotype.Service;

import com.biblioteca.apibiblio.model.Estudiante;
import com.biblioteca.apibiblio.repository.EstudianteRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EstudianteService implements IEstudianteService {
    private final EstudianteRepository estudianteRepository;

    @Override
    public List<Estudiante> getAllEstudiantes() {
        return estudianteRepository.findAll();
    }

    @Override
    public Estudiante addEstudiante(Estudiante estudiante) {
        return estudianteRepository.save(estudiante);
          }

    
    @Override
    public void deleteEstudianteById(Long id) {
        estudianteRepository.deleteById(id);
      }

    @Override
    public Estudiante getEstudianteById(Long id) {
      return estudianteRepository.findById(id).orElse(null);
    }

    @Override
    public Estudiante updateEstudiante(Estudiante Estudiante, Long id) {
        return estudianteRepository.findById(id)
                .map(Estudiante1 -> {
                    
                    Estudiante1.setDocumento(Estudiante.getDocumento());
                    Estudiante1.setCodigo(Estudiante.getCodigo());
                    Estudiante1.setNombre(Estudiante.getNombre());
                    Estudiante1.setCarrera(Estudiante.getCarrera());
                    Estudiante1.setTelefono(Estudiante.getTelefono());
                    return estudianteRepository.save(Estudiante1);

                })
                .orElseGet(() -> {
                    Estudiante.setEstudianteId(id);
                    return estudianteRepository.save(Estudiante);
                });
    }
}
    