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

import com.sentinel.backend.entity.Parcela;
import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.service.ParcelaService;

@RestController
@RequestMapping("/parcelas")
@CrossOrigin("*")
@Slf4j
public class ParcelaController {

    @Autowired
    private ParcelaService ps;

    @GetMapping("/findAll")
    public Iterable<Parcela> listar() {
        return ps.listar();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable long id) {
        return ps.remover(id);
    }

    @PutMapping("/update")
    public ResponseEntity<?> alterar(@RequestBody Parcela parcela) {
        return ps.cadastrarAlterar(parcela, "alterar");
    }

    @PostMapping("/save")
    public ResponseEntity<?> cadastrar(@RequestBody Parcela parcela) {
        return ps.cadastrarAlterar(parcela, "cadastrar");
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<Parcela> findById(@PathVariable long id) {
        log.info("Finding parcela with id {}", id);
        try {
            Optional<Parcela> parcela = ps.findById(id);
            if (parcela.isPresent()) {
                log.info("Parcela {} found", id);
                return new ResponseEntity<>(parcela.get(), HttpStatus.OK);
            }
            log.warn("Parcela {} not found", id);
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            log.error("Error retrieving parcela {}", id, e);
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
