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

import com.biblioteca.apibiblio.model.Categoria;
import com.biblioteca.apibiblio.service.categoria.ICategoriaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;



@RequiredArgsConstructor
@RestController
@RequestMapping("${api.prefix}/Categoria")
public class CategoriaController {
    @Autowired
    private  ICategoriaService CategoriaService;

    @GetMapping("/all")
    public ResponseEntity<List<Categoria>> getAllCategorias(){
        List<Categoria> listaCategorias = CategoriaService.getAllCategorias();
        return ResponseEntity.ok(listaCategorias);
    }

    @PostMapping("/add")
    @ResponseBody
    public ResponseEntity<?> addCategoria(@RequestBody Categoria obj){
        HashMap<String,Object> salida = new HashMap<>();
        obj.setNombre(obj.getNombre());
        obj.setDescripcion(obj.getDescripcion());
        Categoria objSalida = CategoriaService.addCategoria(obj);
        if(objSalida == null){
            salida.put("mensaje", "No se pudo agregar la Categoria");
            
        }else{
            salida.put("mensaje", "Categoria agregado correctamente");
        }
        return ResponseEntity.ok(salida);
    }

    @PutMapping("/update")
    @ResponseBody
    public ResponseEntity<?> updateCategoria(@RequestBody Categoria obj){
        HashMap<String,Object> salida = new HashMap<>();
        Categoria objSalida = CategoriaService.updateCategoria(obj, obj.getCategoriaId());
        if(objSalida == null){
            salida.put("mensaje", "No se pudo actualizar el Categoria");
            
        }else{
            salida.put("mensaje", "Categoria actualizado correctamente");
        }
        return ResponseEntity.ok(salida);
    }
    @DeleteMapping("/delete/{id}")
    @ResponseBody
    public ResponseEntity<?> deleteCategoria(@PathVariable Long id){
        HashMap<String,Object> salida = new HashMap<>();
        try {
            CategoriaService.deleteCategoriaById(id);
        salida.put("mensaje", "Categoria eliminado correctamente");
        } catch (Exception e) {
           e.printStackTrace();
           salida.put("mensaje", "Categoria no se ha eliminado correctamente");
        }
        return ResponseEntity.ok(salida);
    }    
}
