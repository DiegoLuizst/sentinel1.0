package com.sentinel.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.sentinel.backend.entity.Despesa;
import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.repository.DespesaRepository;
import com.sentinel.backend.service.LancamentoFinanceiroService;

@Service
public class DespesaService {

    @Autowired
    private DespesaRepository dr;

    @Autowired
    private RespostaModelo rm;

    @Autowired
    private LancamentoFinanceiroService lancamentoFinanceiroService;

    public Iterable<Despesa> listar() {
        return dr.findAll();
    }

    public ResponseEntity<?> cadastrarAlterar(Despesa despesa, String acao) {
        if (despesa.getValor() == null) {
            rm.setMensagem("O valor é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        }
        Despesa saved = dr.save(despesa);
        lancamentoFinanceiroService.atualizarLancamento(saved.getData());
        if (acao.equalsIgnoreCase("cadastrar")) {
            return new ResponseEntity<>(saved, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(saved, HttpStatus.OK);
        }
    }

    public ResponseEntity<RespostaModelo> remover(long id) {
        if (!dr.existsById(id)) {
            rm.setMensagem("Despesa não encontrada!");
            return new ResponseEntity<>(rm, HttpStatus.NOT_FOUND);
        }
        dr.deleteById(id);
        rm.setMensagem("Despesa removida com sucesso!");
        return new ResponseEntity<>(rm, HttpStatus.OK);
    }

    public Optional<Despesa> findById(long id) {
        return dr.findById(id);
    }
}
