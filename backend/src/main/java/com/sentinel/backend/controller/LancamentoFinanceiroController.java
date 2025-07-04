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

import com.sentinel.backend.entity.LancamentoFinanceiro;
import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.service.LancamentoFinanceiroService;

@RestController
@RequestMapping("/lancamentos-financeiros")
@CrossOrigin("*")
@Slf4j
public class LancamentoFinanceiroController {

    @Autowired
    private LancamentoFinanceiroService lfs;

    @GetMapping("/findAll")
    public Iterable<LancamentoFinanceiro> listar() {
        return lfs.listar();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable long id) {
        return lfs.remover(id);
    }

    @PutMapping("/update")
    public ResponseEntity<?> alterar(@RequestBody LancamentoFinanceiro lancamento) {
        return lfs.cadastrarAlterar(lancamento, "alterar");
    }

    @PostMapping("/save")
    public ResponseEntity<?> cadastrar(@RequestBody LancamentoFinanceiro lancamento) {
        return lfs.cadastrarAlterar(lancamento, "cadastrar");
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<LancamentoFinanceiro> findById(@PathVariable long id) {
        log.info("Finding lancamentoFinanceiro with id {}", id);
        try {
            Optional<LancamentoFinanceiro> lf = lfs.findById(id);
            if (lf.isPresent()) {
                log.info("LancamentoFinanceiro {} found", id);
                return new ResponseEntity<>(lf.get(), HttpStatus.OK);
            }
            log.warn("LancamentoFinanceiro {} not found", id);
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            log.error("Error retrieving lancamentoFinanceiro {}", id, e);
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
