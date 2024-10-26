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

import com.biblioteca.apibiblio.model.Autor;
import com.biblioteca.apibiblio.service.autor.IAutorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;



@RequiredArgsConstructor
@RestController
@RequestMapping("${api.prefix}/Autor")
public class AutorController {
    @Autowired
    private  IAutorService AutorService;

    @GetMapping("/all")
    public ResponseEntity<List<Autor>> getAllAutors(){
        List<Autor> listaAutors = AutorService.getAllAutors();
        return ResponseEntity.ok(listaAutors);
    }

    @PostMapping("/add")
    @ResponseBody
    public ResponseEntity<?> addAutor(@RequestBody Autor obj){
        HashMap<String,Object> salida = new HashMap<>();
        obj.setNombre(obj.getNombre());
        obj.setApellido(obj.getApellido());
        obj.setFechaNacimiento(obj.getFechaNacimiento());
        obj.setBiografia(obj.getBiografia());
        
        Autor objSalida = AutorService.addAutor(obj);
        if(objSalida == null){
            salida.put("mensaje", "No se pudo agregar el Autor");
            
        }else{
            salida.put("mensaje", "Autor agregado correctamente");
        }
        return ResponseEntity.ok(salida);
    }

    @PutMapping("/update")
    @ResponseBody
    public ResponseEntity<?> updateAutor(@RequestBody Autor obj){
        HashMap<String,Object> salida = new HashMap<>();
        Autor objSalida = AutorService.updateAutor(obj, obj.getAutorId());
        if(objSalida == null){
            salida.put("mensaje", "No se pudo actualizar el Autor");
            
        }else{
            salida.put("mensaje", "Autor actualizado correctamente");
        }
        return ResponseEntity.ok(salida);
    }
    @DeleteMapping("/delete/{id}")
    @ResponseBody
    public ResponseEntity<?> deleteAutor(@PathVariable Long id){
        HashMap<String,Object> salida = new HashMap<>();
        try {
            AutorService.deleteAutorById(id);
        salida.put("mensaje", "Autor eliminado correctamente");
        } catch (Exception e) {
           e.printStackTrace();
           salida.put("mensaje", "Autor no se ha eliminado correctamente");
        }
        return ResponseEntity.ok(salida);
    }



   
    
}
