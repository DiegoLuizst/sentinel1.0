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

import com.sentinel.backend.entity.Receita;
import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.service.ReceitaService;

@RestController
@RequestMapping("/receitas")
@CrossOrigin("*")
@Slf4j
public class ReceitaController {

    @Autowired
    private ReceitaService rs;

    @GetMapping("/findAll")
    public Iterable<Receita> listar() {
        return rs.listar();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable long id) {
        return rs.remover(id);
    }

    @PutMapping("/update")
    public ResponseEntity<?> alterar(@RequestBody Receita receita) {
        return rs.cadastrarAlterar(receita, "alterar");
    }

    @PostMapping("/save")
    public ResponseEntity<?> cadastrar(@RequestBody Receita receita) {
        return rs.cadastrarAlterar(receita, "cadastrar");
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<Receita> findById(@PathVariable long id) {
        log.info("Finding receita with id {}", id);
        try {
            Optional<Receita> receita = rs.findById(id);
            if (receita.isPresent()) {
                log.info("Receita {} found", id);
                return new ResponseEntity<>(receita.get(), HttpStatus.OK);
            }
            log.warn("Receita {} not found", id);
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            log.error("Error retrieving receita {}", id, e);
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
