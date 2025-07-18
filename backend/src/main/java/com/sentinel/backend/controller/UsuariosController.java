package com.sentinel.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

import lombok.extern.slf4j.Slf4j;

import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.entity.Usuario;
import com.sentinel.backend.service.UsuarioService;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin("*")
@Slf4j
public class UsuariosController {

    @Autowired
    private UsuarioService us;

    @GetMapping("/findAll")
    public Iterable<Usuario> listar() {
        return us.listar();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable long id) {
        return us.remover(id);
    }

    @PutMapping("/update")
    public ResponseEntity<?> alterar(@RequestBody Usuario usuario) {
        return us.cadastrarAlterar(usuario, "alterar");
    }

    @PostMapping("/save")
    public ResponseEntity<?> cadastrar(@RequestBody Usuario usuario) {
        return us.cadastrarAlterar(usuario, "cadastrar");
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<Usuario> findById(@PathVariable long id) {
        log.info("Finding usuario with id {}", id);
        try {
            Optional<Usuario> optUsuario = us.findById(id);
            if (optUsuario.isPresent()) {
                log.info("Usuario {} found", id);
                return new ResponseEntity<>(optUsuario.get(), HttpStatus.OK);
            }
            log.warn("Usuario {} not found", id);
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            log.error("Error retrieving usuario {}", id, e);
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
