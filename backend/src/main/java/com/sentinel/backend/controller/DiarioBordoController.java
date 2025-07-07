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

import com.sentinel.backend.entity.DiarioBordo;
import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.service.DiarioBordoService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/diarios-bordo")
@CrossOrigin("*")
@Slf4j
public class DiarioBordoController {

    @Autowired
    private DiarioBordoService service;

    @GetMapping("/findAll")
    public Iterable<DiarioBordo> listar() {
        return service.listar();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable long id) {
        return service.remover(id);
    }

    @PutMapping("/update")
    public ResponseEntity<?> alterar(@RequestBody DiarioBordo diario) {
        return service.cadastrarAlterar(diario, "alterar");
    }

    @PostMapping("/save")
    public ResponseEntity<?> cadastrar(@RequestBody DiarioBordo diario) {
        return service.cadastrarAlterar(diario, "cadastrar");
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<DiarioBordo> findById(@PathVariable long id) {
        log.info("Finding diario bordo with id {}", id);
        try {
            Optional<DiarioBordo> obj = service.findById(id);
            if (obj.isPresent()) {
                log.info("Diario bordo {} found", id);
                return new ResponseEntity<>(obj.get(), HttpStatus.OK);
            }
            log.warn("Diario bordo {} not found", id);
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            log.error("Error retrieving diario bordo {}", id, e);
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
