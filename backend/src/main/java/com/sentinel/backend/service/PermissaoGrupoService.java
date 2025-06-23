package com.sentinel.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

import lombok.extern.slf4j.Slf4j;

import com.sentinel.backend.entity.PermissaoGrupo;
import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.repository.PermissaoGrupoRepository;

@Service
@Slf4j
public class PermissaoGrupoService {

    @Autowired
    private PermissaoGrupoRepository pgr;

    @Autowired
    private RespostaModelo rm;

    public Iterable<PermissaoGrupo> listar() {
        return pgr.findAll();
    }

    public ResponseEntity<?> cadastrarAlterar(PermissaoGrupo permissaoGrupo, String acao) {
        if (permissaoGrupo.getNome() == null || permissaoGrupo.getNome().isEmpty()) {
            rm.setMensagem("O nome do grupo de permissão é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        }

        if (acao.equalsIgnoreCase("cadastrar")) {
            return new ResponseEntity<>(pgr.save(permissaoGrupo), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(pgr.save(permissaoGrupo), HttpStatus.OK);
        }
    }

    public ResponseEntity<RespostaModelo> remover(long id) {
        if (!pgr.existsById(id)) {
            rm.setMensagem("Grupo de permissão não encontrado!");
            return new ResponseEntity<>(rm, HttpStatus.NOT_FOUND);
        }

        pgr.deleteById(id);
        rm.setMensagem("Grupo de permissão excluído com sucesso!");
        return new ResponseEntity<>(rm, HttpStatus.OK);
    }

    public Optional<PermissaoGrupo> findById(long id) {
        log.debug("Fetching permissaoGrupo id {}", id);
        Optional<PermissaoGrupo> pg = pgr.findById(id);
        pg.ifPresent(p -> log.debug("Fetched permissaoGrupo id {}", id));
        return pg;
    }
}
