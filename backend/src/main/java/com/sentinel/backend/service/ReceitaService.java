package com.sentinel.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.sentinel.backend.entity.Receita;
import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.repository.ReceitaRepository;
import com.sentinel.backend.service.LancamentoFinanceiroService;

@Service
public class ReceitaService {

    @Autowired
    private ReceitaRepository rr;

    @Autowired
    private RespostaModelo rm;

    @Autowired
    private LancamentoFinanceiroService lancamentoFinanceiroService;

    public Iterable<Receita> listar() {
        return rr.findAll();
    }

    public ResponseEntity<?> cadastrarAlterar(Receita receita, String acao) {
        if (receita.getValor() == null) {
            rm.setMensagem("O valor é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        }
        Receita saved = rr.save(receita);
        lancamentoFinanceiroService.atualizarLancamento(saved.getData());
        if (acao.equalsIgnoreCase("cadastrar")) {
            return new ResponseEntity<>(saved, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(saved, HttpStatus.OK);
        }
    }

    public ResponseEntity<RespostaModelo> remover(long id) {
        if (!rr.existsById(id)) {
            rm.setMensagem("Receita não encontrada!");
            return new ResponseEntity<>(rm, HttpStatus.NOT_FOUND);
        }
        rr.deleteById(id);
        rm.setMensagem("Receita removida com sucesso!");
        return new ResponseEntity<>(rm, HttpStatus.OK);
    }

    public Optional<Receita> findById(long id) {
        return rr.findById(id);
    }
}
