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

import com.sentinel.backend.entity.Disciplina;
import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.service.DisciplinaService;

@RestController
@RequestMapping("/disciplinas")
@CrossOrigin("*")
@Slf4j
public class DisciplinaController {

    @Autowired
    private DisciplinaService ds;

    @GetMapping("/findAll")
    public Iterable<Disciplina> listar() {
        return ds.listar();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable long id) {
        return ds.remover(id);
    }

    @PutMapping("/update")
    public ResponseEntity<?> alterar(@RequestBody Disciplina disciplina) {
        return ds.cadastrarAlterar(disciplina, "alterar");
    }

    @PostMapping("/save")
    public ResponseEntity<?> cadastrar(@RequestBody Disciplina disciplina) {
        return ds.cadastrarAlterar(disciplina, "cadastrar");
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<Disciplina> findById(@PathVariable long id) {
        log.info("Finding disciplina with id {}", id);
        try {
            Optional<Disciplina> disciplina = ds.findById(id);
            if (disciplina.isPresent()) {
                log.info("Disciplina {} found", id);
                return new ResponseEntity<>(disciplina.get(), HttpStatus.OK);
            }
            log.warn("Disciplina {} not found", id);
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            log.error("Error retrieving disciplina {}", id, e);
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
