package com.sentinel.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

import com.sentinel.backend.entity.Parcela;
import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.repository.ParcelaRepository;

@Service
public class ParcelaService {

    @Autowired
    private ParcelaRepository pr;

    @Autowired
    private RespostaModelo rm;

    public Iterable<Parcela> listar() {
        return pr.findAll();
    }

    public ResponseEntity<?> cadastrarAlterar(Parcela parcela, String acao) {
        if (parcela.getMatricula() == null) {
            rm.setMensagem("A matrícula é obrigatória!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        }
        if (acao.equalsIgnoreCase("cadastrar")) {
            return new ResponseEntity<>(pr.save(parcela), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(pr.save(parcela), HttpStatus.OK);
        }
    }

    public ResponseEntity<RespostaModelo> remover(long id) {
        if (!pr.existsById(id)) {
            rm.setMensagem("Parcela não encontrada!");
            return new ResponseEntity<>(rm, HttpStatus.NOT_FOUND);
        }
        pr.deleteById(id);
        rm.setMensagem("Parcela excluída com sucesso!");
        return new ResponseEntity<>(rm, HttpStatus.OK);
    }

    public Optional<Parcela> findById(long id) {
        return pr.findById(id);
    }
}
