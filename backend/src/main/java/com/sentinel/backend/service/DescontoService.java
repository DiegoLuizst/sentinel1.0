package com.sentinel.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.sentinel.backend.entity.Desconto;
import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.repository.DescontoRepository;

@Service
public class DescontoService {

    @Autowired
    private DescontoRepository dr;

    @Autowired
    private RespostaModelo rm;

    public Iterable<Desconto> listar() {
        return dr.findAll();
    }

    public ResponseEntity<?> cadastrarAlterar(Desconto desconto, String acao) {
        if (desconto.getValor() == null) {
            rm.setMensagem("O valor do desconto é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        }
        if (acao.equalsIgnoreCase("cadastrar")) {
            return new ResponseEntity<>(dr.save(desconto), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(dr.save(desconto), HttpStatus.OK);
        }
    }

    public ResponseEntity<RespostaModelo> remover(long id) {
        if (!dr.existsById(id)) {
            rm.setMensagem("Desconto não encontrado!");
            return new ResponseEntity<>(rm, HttpStatus.NOT_FOUND);
        }
        dr.deleteById(id);
        rm.setMensagem("Desconto removido com sucesso!");
        return new ResponseEntity<>(rm, HttpStatus.OK);
    }

    public Optional<Desconto> findById(long id) {
        return dr.findById(id);
    }
}
