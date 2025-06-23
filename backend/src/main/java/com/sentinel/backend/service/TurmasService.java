package com.sentinel.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

import lombok.extern.slf4j.Slf4j;

import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.entity.Turma;

import com.sentinel.backend.repository.TurmasRepository;

@Service
@Slf4j
public class TurmasService {

    @Autowired
    private TurmasRepository tr;

    @Autowired
    private RespostaModelo rm;

    // Listar todos
    public Iterable<Turma> listar() {
        return tr.findAll();
    }

    // Cadastrar ou alterar
    public ResponseEntity<?> cadastrarAlterar(Turma tm, String acao) {
        if (tm.getNome() == null || tm.getNome().isEmpty()) {
            rm.setMensagem("O nome da Turma é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (tm.getAno() == null || tm.getAno().isEmpty()) {
            rm.setMensagem("O Ano é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (tm.getTurno() == null || tm.getTurno().isEmpty()) {
            rm.setMensagem("O Turno é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (tm.getSala() == null || tm.getSala().isEmpty()) {
            rm.setMensagem("A Sala é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (tm.getNivel() == null || tm.getNivel().isEmpty()) {
            rm.setMensagem("O Nivel é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        }

        if (acao.equalsIgnoreCase("cadastrar")) {
            return new ResponseEntity<>(tr.save(tm), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(tr.save(tm), HttpStatus.OK);
        }
    }

    // Remover
    public ResponseEntity<RespostaModelo> remover(long id) {
        if (!tr.existsById(id)) {
            rm.setMensagem("Turma não encontrada!");
            return new ResponseEntity<>(rm, HttpStatus.NOT_FOUND);
        }

        tr.deleteById(id);
        rm.setMensagem("Turma excluída com sucesso!");
        return new ResponseEntity<>(rm, HttpStatus.OK);
    }

    public Optional<Turma> findById(long id) {
        log.debug("Fetching turma id {}", id);
        Optional<Turma> turma = this.tr.findById(id);
        turma.ifPresent(t -> log.debug("Fetched turma id {}", id));
        return turma;

    }

}
