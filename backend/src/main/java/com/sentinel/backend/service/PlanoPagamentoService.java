package com.sentinel.backend.service;

import java.math.BigDecimal;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.sentinel.backend.entity.PlanoPagamento;
import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.repository.PlanoPagamentoRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class PlanoPagamentoService {

    @Autowired
    private PlanoPagamentoRepository pr;

    @Autowired
    private RespostaModelo rm;

    public Iterable<PlanoPagamento> listar() {
        return pr.findAll();
    }

    public ResponseEntity<?> cadastrarAlterar(PlanoPagamento plano, String acao) {
        if (plano.getDescricao() == null || plano.getDescricao().isEmpty()) {
            rm.setMensagem("A descrição do plano é obrigatória!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (plano.getNumeroParcelas() <= 0) {
            rm.setMensagem("Número de parcelas deve ser maior que zero!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (plano.getPeriodicidade() == null || plano.getPeriodicidade().isEmpty()) {
            rm.setMensagem("A periodicidade é obrigatória!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (plano.getValorTotal() == null || plano.getValorTotal().compareTo(BigDecimal.ZERO) <= 0) {
            rm.setMensagem("O valor total é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        }

        if (acao.equalsIgnoreCase("cadastrar")) {
            return new ResponseEntity<>(pr.save(plano), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(pr.save(plano), HttpStatus.OK);
        }
    }

    public ResponseEntity<RespostaModelo> remover(long id) {
        if (!pr.existsById(id)) {
            rm.setMensagem("Plano de pagamento não encontrado!");
            return new ResponseEntity<>(rm, HttpStatus.NOT_FOUND);
        }
        pr.deleteById(id);
        rm.setMensagem("Plano de pagamento excluído com sucesso!");
        return new ResponseEntity<>(rm, HttpStatus.OK);
    }

    public Optional<PlanoPagamento> findById(long id) {
        log.debug("Fetching planoPagamento id {}", id);
        Optional<PlanoPagamento> plano = pr.findById(id);
        plano.ifPresent(p -> log.debug("Fetched planoPagamento id {}", id));
        return plano;
    }
}
