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

import com.sentinel.backend.entity.Cargo;
import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.service.CargoService;

@RestController
@RequestMapping("/cargos")
@CrossOrigin("*")
@Slf4j
public class CargoController {

    @Autowired
    private CargoService cs;

    @GetMapping("/findAll")
    public Iterable<Cargo> listar() {
        return cs.listar();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable long id) {
        return cs.remover(id);
    }

    @PutMapping("/update")
    public ResponseEntity<?> alterar(@RequestBody Cargo cargo) {
        return cs.cadastrarAlterar(cargo, "alterar");
    }

    @PostMapping("/save")
    public ResponseEntity<?> cadastrar(@RequestBody Cargo cargo) {
        return cs.cadastrarAlterar(cargo, "cadastrar");
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<Cargo> findById(@PathVariable long id) {
        log.info("Finding cargo with id {}", id);
        try {
            Optional<Cargo> cargo = cs.findById(id);
            if (cargo.isPresent()) {
                log.info("Cargo {} found", id);
                return new ResponseEntity<>(cargo.get(), HttpStatus.OK);
            }
            log.warn("Cargo {} not found", id);
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            log.error("Error retrieving cargo {}", id, e);
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
