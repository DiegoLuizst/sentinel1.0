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

import java.util.NoSuchElementException;

import lombok.extern.slf4j.Slf4j;

import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.entity.Turma;

import com.sentinel.backend.service.TurmasService;

@RestController
@RequestMapping("/turmas")
@CrossOrigin("*")
@Slf4j
public class TurmasController {

    @Autowired
    private TurmasService ts;

    @GetMapping("/findAll")
    public Iterable<Turma> listar() {
        return ts.listar();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable long id) {
        return ts.remover(id);

    }

    @PutMapping("/update")
    public ResponseEntity<?> alterar(@RequestBody Turma cm) {
        return ts.cadastrarAlterar(cm, "alterar");
    }

    @PostMapping("/save")
    public ResponseEntity<?> cadastrar(@RequestBody Turma cm) {
        return ts.cadastrarAlterar(cm, "cadastrar");
    }

    // Listar por id
    @GetMapping("/findById/{id}")
    public ResponseEntity<Turma> findById(@PathVariable long id) {
        log.info("Finding turma with id {}", id);
        try {

            Turma turma = this.ts.findById(id);
            log.info("Turma {} found", id);
            return new ResponseEntity<>(turma, HttpStatus.OK);

        } catch (NoSuchElementException e) {
            log.error("Turma {} not found", id, e);
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            log.error("Error retrieving turma {}", id, e);
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

    }

}
