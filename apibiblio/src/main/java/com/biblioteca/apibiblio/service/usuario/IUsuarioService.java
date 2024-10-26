package com.biblioteca.apibiblio.service.usuario;

import java.util.List;

import com.biblioteca.apibiblio.model.Usuario;

public interface IUsuarioService {
    Usuario addUsuario(Usuario Usuario);
    Usuario updateUsuario(Usuario Usuario,Long id);
    void deleteUsuarioById(Long id);
    Usuario getUsuarioById(Long id);
    List<Usuario> getAllUsuarios();
    
}
