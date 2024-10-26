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

import com.biblioteca.apibiblio.model.Editorial;
import com.biblioteca.apibiblio.service.editorial.IEditorialService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;



@RequiredArgsConstructor
@RestController
@RequestMapping("${api.prefix}/Editorial")
public class EditorialController {
    @Autowired
    private  IEditorialService EditorialService;

    @GetMapping("/all")
    public ResponseEntity<List<Editorial>> getAllEditorials(){
        List<Editorial> listaEditorials = EditorialService.getAllEditorials();
        return ResponseEntity.ok(listaEditorials);
    }

    @PostMapping("/add")
    @ResponseBody
    public ResponseEntity<?> addEditorial(@RequestBody Editorial obj){
        HashMap<String,Object> salida = new HashMap<>();
        obj.setNombre(obj.getNombre());
        obj.setPais(obj.getPais());
        obj.setSitioWeb(obj.getSitioWeb());

        Editorial objSalida = EditorialService.addEditorial(obj);
        if(objSalida == null){
            salida.put("mensaje", "No se pudo agregar el Editorial");
            
        }else{
            salida.put("mensaje", "Editorial agregado correctamente");
        }
        return ResponseEntity.ok(salida);
    }

    @PutMapping("/update")
    @ResponseBody
    public ResponseEntity<?> updateEditorial(@RequestBody Editorial obj){
        HashMap<String,Object> salida = new HashMap<>();
        Editorial objSalida = EditorialService.updateEditorial(obj, obj.getEditorialId());
        if(objSalida == null){
            salida.put("mensaje", "No se pudo actualizar el Editorial");
            
        }else{
            salida.put("mensaje", "Editorial actualizado correctamente");
        }
        return ResponseEntity.ok(salida);
    }
    @DeleteMapping("/delete/{id}")
    @ResponseBody
    public ResponseEntity<?> deleteEditorial(@PathVariable Long id){
        HashMap<String,Object> salida = new HashMap<>();
        try {
            EditorialService.deleteEditorialById(id);
        salida.put("mensaje", "Editorial eliminado correctamente");
        } catch (Exception e) {
           e.printStackTrace();
           salida.put("mensaje", "Editorial no se ha eliminado correctamente");
        }
        return ResponseEntity.ok(salida);
    }



   
    
}
