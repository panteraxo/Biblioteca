package com.biblioteca.apibiblio.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.HashMap;

import com.biblioteca.apibiblio.model.Estudiante;
import com.biblioteca.apibiblio.service.estudiante.IEstudianteService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;



@RequiredArgsConstructor
@RestController
@RequestMapping("${api.prefix}/Estudiante")
public class EstudianteController {
    @Autowired
    private  IEstudianteService estudianteService;

    @GetMapping("/all")
    public ResponseEntity<List<Estudiante>> getAllEstudiantes(){
        List<Estudiante> listaEstudiantes = estudianteService.getAllEstudiantes();
        return ResponseEntity.ok(listaEstudiantes);
    }

    @PostMapping("/add")
    @ResponseBody
    public ResponseEntity<?> addEstudiante(@RequestBody Estudiante obj){
        HashMap<String,Object> salida = new HashMap<>();
        obj.setDocumento(obj.getDocumento());
        obj.setCodigo(obj.getCodigo());
        obj.setNombre(obj.getNombre());
        obj.setCarrera(obj.getCarrera());
        obj.setTelefono(obj.getTelefono());
        
        Estudiante objSalida = estudianteService.addEstudiante(obj);
        if(objSalida == null){
            salida.put("mensaje", "No se pudo agregar el Estudiante");
            
        }else{
            salida.put("mensaje", "Estudiante agregado correctamente");
        }
        return ResponseEntity.ok(salida);
    }

    @PutMapping("/update")
    @ResponseBody
    public ResponseEntity<?> updateEstudiante(@RequestBody Estudiante obj){
        HashMap<String,Object> salida = new HashMap<>();
        Estudiante objSalida = estudianteService.updateEstudiante(obj, obj.getEstudianteId());
        if(objSalida == null){
            salida.put("mensaje", "No se pudo actualizar el Estudiante");
            
        }else{
            salida.put("mensaje", "Estudiante actualizado correctamente");
        }
        return ResponseEntity.ok(salida);
    }
    @DeleteMapping("/delete/{id}")
    @ResponseBody
    public ResponseEntity<?> deleteEstudiante(@PathVariable Long id){
        HashMap<String,Object> salida = new HashMap<>();
        try {
            estudianteService.deleteEstudianteById(id);
        salida.put("mensaje", "Estudiante eliminado correctamente");
        } catch (Exception e) {
           e.printStackTrace();
           salida.put("mensaje", "Estudiante no se ha eliminado correctamente");
        }
        return ResponseEntity.ok(salida);
    }



   
    
}
