package com.sentinel.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

import lombok.extern.slf4j.Slf4j;

import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.entity.Usuario;
import com.sentinel.backend.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
@Slf4j
public class UsuarioService {

    @Autowired
    private UsuarioRepository ur;


    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RespostaModelo rm;

    public Iterable<Usuario> listar() {
        return ur.findAll();
    }

    public ResponseEntity<?> cadastrarAlterar(Usuario usuario, String acao) {
        if (usuario.getNome() == null || usuario.getNome().isEmpty()) {
            rm.setMensagem("O nome do Usuário é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (usuario.getEmail() == null || usuario.getEmail().isEmpty()) {
            rm.setMensagem("O e-mail é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (usuario.getSenha() == null || usuario.getSenha().isEmpty()) {
            rm.setMensagem("A senha é obrigatória!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (usuario.getPermissaoGrupo() == null) {
            rm.setMensagem("O grupo de permissão é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        }

        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));

        if (acao.equalsIgnoreCase("cadastrar")) {
            return new ResponseEntity<>(ur.save(usuario), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(ur.save(usuario), HttpStatus.OK);
        }
    }

    public ResponseEntity<RespostaModelo> remover(long id) {
        if (!ur.existsById(id)) {
            rm.setMensagem("Usuário não encontrado!");
            return new ResponseEntity<>(rm, HttpStatus.NOT_FOUND);
        }

        ur.deleteById(id);
        rm.setMensagem("Usuário excluído com sucesso!");
        return new ResponseEntity<>(rm, HttpStatus.OK);
    }

    public Optional<Usuario> findById(long id) {
        log.debug("Fetching usuario id {}", id);
        Optional<Usuario> usuario = ur.findById(id);
        usuario.ifPresent(u -> log.debug("Fetched usuario id {}", id));
        return usuario;
    }
}
