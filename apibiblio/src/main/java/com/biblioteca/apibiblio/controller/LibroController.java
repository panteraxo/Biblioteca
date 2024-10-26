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

import com.biblioteca.apibiblio.model.Libro;
import com.biblioteca.apibiblio.service.libro.ILibroService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;



@RequiredArgsConstructor
@RestController
@RequestMapping("${api.prefix}/libro")
public class LibroController {
    @Autowired
    private  ILibroService libroService;

    @GetMapping("/all")
    public ResponseEntity<List<Libro>> getAllLibros(){
        List<Libro> listaLibros = libroService.getAllLibros();
        return ResponseEntity.ok(listaLibros);
    }

    @PostMapping("/add")
    @ResponseBody
    public ResponseEntity<?> addLibro(@RequestBody Libro obj){
        HashMap<String,Object> salida = new HashMap<>();
        obj.setAutor(obj.getAutor());
        obj.setCantidad(obj.getCantidad());
        obj.setCategoria(obj.getCategoria());
        obj.setDescripcion(obj.getDescripcion());
        obj.setEditorial(obj.getEditorial());
        obj.setEstado(obj.getEstado());
        obj.setISBN(obj.getISBN());
        obj.setNumeroPaginas(obj.getNumeroPaginas());
        obj.setTitulo(obj.getTitulo());
        Libro objSalida = libroService.addLibro(obj);
        if(objSalida == null){
            salida.put("mensaje", "No se pudo agregar el libro");
            
        }else{
            salida.put("mensaje", "Libro agregado correctamente");
        }
        return ResponseEntity.ok(salida);
    }

    @PutMapping("/update")
    @ResponseBody
    public ResponseEntity<?> updateLibro(@RequestBody Libro obj){
        HashMap<String,Object> salida = new HashMap<>();
        Libro objSalida = libroService.updateLibro(obj, obj.getLibroId());
        if(objSalida == null){
            salida.put("mensaje", "No se pudo actualizar el libro");
            
        }else{
            salida.put("mensaje", "Libro actualizado correctamente");
        }
        return ResponseEntity.ok(salida);
    }
    @DeleteMapping("/delete/{id}")
    @ResponseBody
    public ResponseEntity<?> deleteLibro(@PathVariable Long id){
        HashMap<String,Object> salida = new HashMap<>();
        try {
            libroService.deleteLibroById(id);
        salida.put("mensaje", "Libro eliminado correctamente");
        } catch (Exception e) {
           e.printStackTrace();
           salida.put("mensaje", "Libro no se ha eliminado correctamente");
        }
        return ResponseEntity.ok(salida);
    }



   
    
}
