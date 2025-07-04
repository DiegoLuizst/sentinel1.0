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

import com.sentinel.backend.entity.Matricula;
import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.service.MatriculaService;

@RestController
@RequestMapping("/matriculas")
@CrossOrigin("*")
@Slf4j
public class MatriculaController {

    @Autowired
    private MatriculaService ms;

    @GetMapping("/findAll")
    public Iterable<Matricula> listar() {
        return ms.listar();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable long id) {
        return ms.remover(id);
    }

    @PutMapping("/update")
    public ResponseEntity<?> alterar(@RequestBody Matricula matricula) {
        return ms.cadastrarAlterar(matricula, "alterar");
    }

    @PostMapping("/save")
    public ResponseEntity<?> cadastrar(@RequestBody Matricula matricula) {
        return ms.cadastrarAlterar(matricula, "cadastrar");
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<Matricula> findById(@PathVariable long id) {
        log.info("Finding matricula with id {}", id);
        try {
            Optional<Matricula> matricula = ms.findById(id);
            if (matricula.isPresent()) {
                log.info("Matricula {} found", id);
                return new ResponseEntity<>(matricula.get(), HttpStatus.OK);
            }
            log.warn("Matricula {} not found", id);
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            log.error("Error retrieving matricula {}", id, e);
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
