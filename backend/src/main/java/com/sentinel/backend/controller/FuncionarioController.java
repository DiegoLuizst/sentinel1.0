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

import com.sentinel.backend.entity.Funcionario;
import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.service.FuncionarioService;

@RestController
@RequestMapping("/funcionarios")
@CrossOrigin("*")
@Slf4j
public class FuncionarioController {

    @Autowired
    private FuncionarioService fs;

    @GetMapping("/findAll")
    public Iterable<Funcionario> listar() {
        return fs.listar();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable long id) {
        return fs.remover(id);
    }

    @PutMapping("/update")
    public ResponseEntity<?> alterar(@RequestBody Funcionario funcionario) {
        return fs.cadastrarAlterar(funcionario, "alterar");
    }

    @PostMapping("/save")
    public ResponseEntity<?> cadastrar(@RequestBody Funcionario funcionario) {
        return fs.cadastrarAlterar(funcionario, "cadastrar");
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<Funcionario> findById(@PathVariable long id) {
        log.info("Finding funcionario with id {}", id);
        try {
            Optional<Funcionario> funcionario = fs.findById(id);
            if (funcionario.isPresent()) {
                log.info("Funcionario {} found", id);
                return new ResponseEntity<>(funcionario.get(), HttpStatus.OK);
            }
            log.warn("Funcionario {} not found", id);
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            log.error("Error retrieving funcionario {}", id, e);
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
