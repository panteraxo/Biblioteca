package com.biblioteca.apibiblio.service.estudiante;

import java.util.List;

import com.biblioteca.apibiblio.model.Estudiante;

public interface IEstudianteService {
    Estudiante addEstudiante(Estudiante Estudiante);
    Estudiante updateEstudiante(Estudiante Estudiante,Long id);
    void deleteEstudianteById(Long id);
    Estudiante getEstudianteById(Long id);
    List<Estudiante> getAllEstudiantes();
    
}
