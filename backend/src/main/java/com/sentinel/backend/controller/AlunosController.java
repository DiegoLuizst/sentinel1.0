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

import lombok.extern.slf4j.Slf4j;

import com.sentinel.backend.entity.Aluno;
import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.service.AlunoService;

@RestController
@RequestMapping("/alunos")
@CrossOrigin("*")
@Slf4j
public class AlunosController {

    @Autowired
    private AlunoService as;

    @GetMapping("/findAll")
    public Iterable<Aluno> listar() {
        return as.listar();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable long id) {
        return as.remover(id);
    }

    @PutMapping("/update")
    public ResponseEntity<?> alterar(@RequestBody Aluno aluno) {
        return as.cadastrarAlterar(aluno, "alterar");
    }

    @PostMapping("/save")
    public ResponseEntity<?> cadastrar(@RequestBody Aluno aluno) {
        return as.cadastrarAlterar(aluno, "cadastrar");
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<Aluno> findById(@PathVariable long id) {
        log.info("Finding aluno with id {}", id);
        try {
            Aluno aluno = as.findById(id);
            log.info("Aluno {} found", id);
            return new ResponseEntity<>(aluno, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error retrieving aluno {}", id, e);
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
