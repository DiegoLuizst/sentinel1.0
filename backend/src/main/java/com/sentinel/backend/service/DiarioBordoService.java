package com.sentinel.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.sentinel.backend.entity.DiarioBordo;
import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.repository.DiarioBordoRepository;

@Service
public class DiarioBordoService {

    @Autowired
    private DiarioBordoRepository repository;

    @Autowired
    private RespostaModelo rm;

    public Iterable<DiarioBordo> listar() {
        return repository.findAll();
    }

    public ResponseEntity<?> cadastrarAlterar(DiarioBordo diario, String acao) {
        if (diario.getAluno() == null || diario.getTurma() == null || diario.getProfessor() == null) {
            rm.setMensagem("Aluno, Turma e Professor são obrigatórios!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        }
        DiarioBordo saved = repository.save(diario);
        if (acao.equalsIgnoreCase("cadastrar")) {
            return new ResponseEntity<>(saved, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(saved, HttpStatus.OK);
        }
    }

    public ResponseEntity<RespostaModelo> remover(long id) {
        if (!repository.existsById(id)) {
            rm.setMensagem("Registro não encontrado!");
            return new ResponseEntity<>(rm, HttpStatus.NOT_FOUND);
        }
        repository.deleteById(id);
        rm.setMensagem("Registro removido com sucesso!");
        return new ResponseEntity<>(rm, HttpStatus.OK);
    }

    public Optional<DiarioBordo> findById(long id) {
        return repository.findById(id);
    }
}
