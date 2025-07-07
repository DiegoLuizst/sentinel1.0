package com.sentinel.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.sentinel.backend.entity.DiarioClasse;
import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.repository.DiarioClasseRepository;

@Service
public class DiarioClasseService {

    @Autowired
    private DiarioClasseRepository repository;

    @Autowired
    private RespostaModelo rm;

    public Iterable<DiarioClasse> listar() {
        return repository.findAll();
    }

    public ResponseEntity<?> cadastrarAlterar(DiarioClasse diario, String acao) {
        if (diario.getProfessor() == null || diario.getTurma() == null
                || diario.getDisciplina() == null || diario.getAluno() == null) {
            rm.setMensagem("Professor, Turma, Disciplina e Aluno são obrigatórios!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        }
        DiarioClasse saved = repository.save(diario);
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

    public Optional<DiarioClasse> findById(long id) {
        return repository.findById(id);
    }
}
