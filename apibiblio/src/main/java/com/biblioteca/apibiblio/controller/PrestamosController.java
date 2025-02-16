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

import com.biblioteca.apibiblio.model.Prestamos;
import com.biblioteca.apibiblio.service.prestamos.IPrestamosService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;



@RequiredArgsConstructor
@RestController
@RequestMapping("${api.prefix}/Prestamos")
public class PrestamosController {
    @Autowired
    private  IPrestamosService PrestamosService;

    @GetMapping("/all")
    public ResponseEntity<List<Prestamos>> getAllPrestamoss(){
        List<Prestamos> listaPrestamoss = PrestamosService.getAllPrestamoss();
        return ResponseEntity.ok(listaPrestamoss);
    }

    @PostMapping("/add")
    @ResponseBody
    public ResponseEntity<?> addPrestamos(@RequestBody Prestamos obj){
        HashMap<String,Object> salida = new HashMap<>();
        obj.setEstado(obj.getEstado());
        obj.setEstudiante(obj.getEstudiante());
        obj.setFechaDevolucion(obj.getFechaDevolucion());
        obj.setFechaPrestamo(obj.getFechaPrestamo());
        obj.setLibro(obj.getLibro());
        obj.setEstado(obj.getEstado());
        Prestamos objSalida = PrestamosService.addPrestamos(obj);
        if(objSalida == null){
            salida.put("mensaje", "No se pudo agregar el Prestamos");
            
        }else{
            salida.put("mensaje", "Prestamos agregado correctamente");
        }
        return ResponseEntity.ok(salida);
    }

    @PutMapping("/update/{id}")
    @ResponseBody
    public ResponseEntity<?> updatePrestamos(@PathVariable Long id, @RequestBody Prestamos obj){
        HashMap<String,Object> salida = new HashMap<>();
        Prestamos objSalida = PrestamosService.updatePrestamos(obj, id);
        if(objSalida == null){
            salida.put("mensaje", "No se pudo actualizar el Prestamos");
            
        }else{
            salida.put("mensaje", "Prestamos actualizado correctamente");
        }
        return ResponseEntity.ok(salida);
    }
    @DeleteMapping("/delete/{id}")
    @ResponseBody
    public ResponseEntity<?> deletePrestamos(@PathVariable Long id){
        HashMap<String,Object> salida = new HashMap<>();
        try {
            PrestamosService.deletePrestamosById(id);
        salida.put("mensaje", "Prestamos eliminado correctamente");
        } catch (Exception e) {
           e.printStackTrace();
           salida.put("mensaje", "Prestamos no se ha eliminado correctamente");
        }
        return ResponseEntity.ok(salida);
    }



   
    
}
