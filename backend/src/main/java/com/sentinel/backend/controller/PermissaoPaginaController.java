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

import com.sentinel.backend.entity.PermissaoPagina;
import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.service.PermissaoPaginaService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/paginas")
@CrossOrigin("*")
@Slf4j
public class PermissaoPaginaController {

    @Autowired
    private PermissaoPaginaService pps;

    @GetMapping("/findAll")
    public Iterable<PermissaoPagina> listar() {
        return pps.listar();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable long id) {
        return pps.remover(id);
    }

    @PutMapping("/update")
    public ResponseEntity<?> alterar(@RequestBody PermissaoPagina permissaoPagina) {
        return pps.cadastrarAlterar(permissaoPagina, "alterar");
    }

    @PostMapping("/save")
    public ResponseEntity<?> cadastrar(@RequestBody PermissaoPagina permissaoPagina) {
        return pps.cadastrarAlterar(permissaoPagina, "cadastrar");
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<PermissaoPagina> findById(@PathVariable long id) {
        log.info("Finding permissaoPagina with id {}", id);
        try {
            Optional<PermissaoPagina> pg = pps.findById(id);
            if (pg.isPresent()) {
                log.info("PermissaoPagina {} found", id);
                return new ResponseEntity<>(pg.get(), HttpStatus.OK);
            }
            log.warn("PermissaoPagina {} not found", id);
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            log.error("Error retrieving permissaoPagina {}", id, e);
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
