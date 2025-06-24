package com.sentinel.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

import com.sentinel.backend.entity.PermissaoPagina;
import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.repository.PermissaoPaginaRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class PermissaoPaginaService {

    @Autowired
    private PermissaoPaginaRepository ppr;

    @Autowired
    private RespostaModelo rm;

    public Iterable<PermissaoPagina> listar() {
        return ppr.findAll();
    }

    public ResponseEntity<?> cadastrarAlterar(PermissaoPagina permissaoPagina, String acao) {
        if (permissaoPagina.getNome() == null || permissaoPagina.getNome().isEmpty()) {
            rm.setMensagem("O nome da permissão de página é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        }

        if (acao.equalsIgnoreCase("cadastrar")) {
            return new ResponseEntity<>(ppr.save(permissaoPagina), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(ppr.save(permissaoPagina), HttpStatus.OK);
        }
    }

    public ResponseEntity<RespostaModelo> remover(long id) {
        if (!ppr.existsById(id)) {
            rm.setMensagem("Permissão de página não encontrada!");
            return new ResponseEntity<>(rm, HttpStatus.NOT_FOUND);
        }

        ppr.deleteById(id);
        rm.setMensagem("Permissão de página excluída com sucesso!");
        return new ResponseEntity<>(rm, HttpStatus.OK);
    }

    public Optional<PermissaoPagina> findById(long id) {
        log.debug("Fetching permissaoPagina id {}", id);
        Optional<PermissaoPagina> pp = ppr.findById(id);
        pp.ifPresent(p -> log.debug("Fetched permissaoPagina id {}", id));
        return pp;
    }
}
