package com.sentinel.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

import com.sentinel.backend.entity.Disciplina;
import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.repository.DisciplinaRepository;

@Service
public class DisciplinaService {

    @Autowired
    private DisciplinaRepository dr;

    @Autowired
    private RespostaModelo rm;

    public Iterable<Disciplina> listar() {
        return dr.findAll();
    }

    public ResponseEntity<?> cadastrarAlterar(Disciplina disciplina, String acao) {
        if (disciplina.getNome() == null || disciplina.getNome().isEmpty()) {
            rm.setMensagem("O nome da Disciplina é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (disciplina.getCarga_horaria() == null || disciplina.getCarga_horaria().isEmpty()) {
            rm.setMensagem("A carga horária é obrigatória!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        }
        if (acao.equalsIgnoreCase("cadastrar")) {
            return new ResponseEntity<>(dr.save(disciplina), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(dr.save(disciplina), HttpStatus.OK);
        }
    }

    public ResponseEntity<RespostaModelo> remover(long id) {
        if (!dr.existsById(id)) {
            rm.setMensagem("Disciplina não encontrada!");
            return new ResponseEntity<>(rm, HttpStatus.NOT_FOUND);
        }
        dr.deleteById(id);
        rm.setMensagem("Disciplina excluída com sucesso!");
        return new ResponseEntity<>(rm, HttpStatus.OK);
    }

    public Optional<Disciplina> findById(long id) {
        return dr.findById(id);
    }
}
