package com.biblioteca.apibiblio.service.usuario;

import java.util.List;

import org.springframework.stereotype.Service;
import com.biblioteca.apibiblio.model.Usuario;
import com.biblioteca.apibiblio.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsuarioService implements IUsuarioService {
    private final UsuarioRepository usuarioRepository;

    @Override
    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    @Override
    public Usuario addUsuario(Usuario Usuario) {
        return usuarioRepository.save(Usuario);
          }

    
    @Override
    public void deleteUsuarioById(Long id) {
        usuarioRepository.deleteById(id);
      }

    @Override
    public Usuario getUsuarioById(Long id) {
      return usuarioRepository.findById(id).orElse(null);
    }

    @Override
    public Usuario updateUsuario(Usuario Usuario, Long id) {
        return usuarioRepository.findById(id)
                .map(Usuario1 -> {
                    
                    Usuario1.setNombre(Usuario.getNombre());
                    Usuario1.setApellido(Usuario.getApellido());
                    Usuario1.setCorreo(Usuario.getCorreo());
                    Usuario1.setTelefono(Usuario.getTelefono());
                    Usuario1.setDireccion(Usuario.getDireccion());
                    Usuario1.setUsuario(Usuario.getUsuario());
                    Usuario1.setContrasena(Usuario.getContrasena());
                    Usuario1.setRol(Usuario.getRol());

                    return usuarioRepository.save(Usuario1);

                })
                .orElseGet(() -> {
                    Usuario.setUsuarioId(id);
                    return usuarioRepository.save(Usuario);
                });
    }
}
    