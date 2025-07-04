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

import com.sentinel.backend.entity.Desconto;
import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.service.DescontoService;

@RestController
@RequestMapping("/descontos")
@CrossOrigin("*")
@Slf4j
public class DescontoController {

    @Autowired
    private DescontoService ds;

    @GetMapping("/findAll")
    public Iterable<Desconto> listar() {
        return ds.listar();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable long id) {
        return ds.remover(id);
    }

    @PutMapping("/update")
    public ResponseEntity<?> alterar(@RequestBody Desconto desconto) {
        return ds.cadastrarAlterar(desconto, "alterar");
    }

    @PostMapping("/save")
    public ResponseEntity<?> cadastrar(@RequestBody Desconto desconto) {
        return ds.cadastrarAlterar(desconto, "cadastrar");
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<Desconto> findById(@PathVariable long id) {
        log.info("Finding desconto with id {}", id);
        try {
            Optional<Desconto> desconto = ds.findById(id);
            if (desconto.isPresent()) {
                log.info("Desconto {} found", id);
                return new ResponseEntity<>(desconto.get(), HttpStatus.OK);
            }
            log.warn("Desconto {} not found", id);
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            log.error("Error retrieving desconto {}", id, e);
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
