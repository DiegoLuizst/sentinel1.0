package com.sentinel.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

import com.sentinel.backend.entity.Aluno;
import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.repository.AlunoRepository;

@Service
@Slf4j
public class AlunoService {

    @Autowired
    private AlunoRepository ar;

    @Autowired
    private RespostaModelo rm;

    public Iterable<Aluno> listar() {
        return ar.findAll();
    }

    public ResponseEntity<?> cadastrarAlterar(Aluno aluno, String acao) {
        if (aluno.getNome() == null || aluno.getNome().isEmpty()) {
            rm.setMensagem("O nome do Aluno é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        }

        if (acao.equalsIgnoreCase("cadastrar")) {
            return new ResponseEntity<>(ar.save(aluno), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(ar.save(aluno), HttpStatus.OK);
        }
    }

    public ResponseEntity<RespostaModelo> remover(long id) {
        if (!ar.existsById(id)) {
            rm.setMensagem("Aluno não encontrado!");
            return new ResponseEntity<>(rm, HttpStatus.NOT_FOUND);
        }

        ar.deleteById(id);
        rm.setMensagem("Aluno excluído com sucesso!");
        return new ResponseEntity<>(rm, HttpStatus.OK);
    }

    public Aluno findById(long id) {
        log.debug("Fetching aluno id {}", id);
        Aluno aluno = ar.findById(id).get();
        log.debug("Fetched aluno id {}", id);
        return aluno;
    }
}
