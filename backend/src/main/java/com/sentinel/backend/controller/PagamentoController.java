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

import com.sentinel.backend.entity.Pagamento;
import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.service.PagamentoService;

@RestController
@RequestMapping("/pagamentos")
@CrossOrigin("*")
@Slf4j
public class PagamentoController {

    @Autowired
    private PagamentoService ps;

    @GetMapping("/findAll")
    public Iterable<Pagamento> listar() {
        return ps.listar();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable long id) {
        return ps.remover(id);
    }

    @PutMapping("/update")
    public ResponseEntity<?> alterar(@RequestBody Pagamento pagamento) {
        return ps.cadastrarAlterar(pagamento, "alterar");
    }

    @PostMapping("/save")
    public ResponseEntity<?> cadastrar(@RequestBody Pagamento pagamento) {
        return ps.cadastrarAlterar(pagamento, "cadastrar");
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<Pagamento> findById(@PathVariable long id) {
        log.info("Finding pagamento with id {}", id);
        try {
            Optional<Pagamento> pagamento = ps.findById(id);
            if (pagamento.isPresent()) {
                log.info("Pagamento {} found", id);
                return new ResponseEntity<>(pagamento.get(), HttpStatus.OK);
            }
            log.warn("Pagamento {} not found", id);
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            log.error("Error retrieving pagamento {}", id, e);
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
