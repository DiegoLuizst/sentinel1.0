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

import com.sentinel.backend.entity.PlanoPagamento;
import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.service.PlanoPagamentoService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/planos-pagamento")
@CrossOrigin("*")
@Slf4j
public class PlanoPagamentoController {

    @Autowired
    private PlanoPagamentoService ps;

    @GetMapping("/findAll")
    public Iterable<PlanoPagamento> listar() {
        return ps.listar();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable long id) {
        return ps.remover(id);
    }

    @PutMapping("/update")
    public ResponseEntity<?> alterar(@RequestBody PlanoPagamento plano) {
        return ps.cadastrarAlterar(plano, "alterar");
    }

    @PostMapping("/save")
    public ResponseEntity<?> cadastrar(@RequestBody PlanoPagamento plano) {
        return ps.cadastrarAlterar(plano, "cadastrar");
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<PlanoPagamento> findById(@PathVariable long id) {
        log.info("Finding planoPagamento with id {}", id);
        try {
            Optional<PlanoPagamento> plano = ps.findById(id);
            if (plano.isPresent()) {
                log.info("PlanoPagamento {} found", id);
                return new ResponseEntity<>(plano.get(), HttpStatus.OK);
            }
            log.warn("PlanoPagamento {} not found", id);
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            log.error("Error retrieving planoPagamento {}", id, e);
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
