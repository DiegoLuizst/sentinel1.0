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

import com.sentinel.backend.entity.Despesa;
import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.service.DespesaService;

@RestController
@RequestMapping("/despesas")
@CrossOrigin("*")
@Slf4j
public class DespesaController {

    @Autowired
    private DespesaService ds;

    @GetMapping("/findAll")
    public Iterable<Despesa> listar() {
        return ds.listar();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable long id) {
        return ds.remover(id);
    }

    @PutMapping("/update")
    public ResponseEntity<?> alterar(@RequestBody Despesa despesa) {
        return ds.cadastrarAlterar(despesa, "alterar");
    }

    @PostMapping("/save")
    public ResponseEntity<?> cadastrar(@RequestBody Despesa despesa) {
        return ds.cadastrarAlterar(despesa, "cadastrar");
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<Despesa> findById(@PathVariable long id) {
        log.info("Finding despesa with id {}", id);
        try {
            Optional<Despesa> despesa = ds.findById(id);
            if (despesa.isPresent()) {
                log.info("Despesa {} found", id);
                return new ResponseEntity<>(despesa.get(), HttpStatus.OK);
            }
            log.warn("Despesa {} not found", id);
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            log.error("Error retrieving despesa {}", id, e);
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
