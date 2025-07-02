package com.sentinel.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

import com.sentinel.backend.entity.Cargo;
import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.repository.CargoRepository;

@Service
public class CargoService {

    @Autowired
    private CargoRepository cr;

    @Autowired
    private RespostaModelo rm;

    public Iterable<Cargo> listar() {
        return cr.findAll();
    }

    public ResponseEntity<?> cadastrarAlterar(Cargo cargo, String acao) {
        if (cargo.getNome() == null || cargo.getNome().isEmpty()) {
            rm.setMensagem("O nome do Cargo é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        }
        if (acao.equalsIgnoreCase("cadastrar")) {
            return new ResponseEntity<>(cr.save(cargo), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(cr.save(cargo), HttpStatus.OK);
        }
    }

    public ResponseEntity<RespostaModelo> remover(long id) {
        if (!cr.existsById(id)) {
            rm.setMensagem("Cargo não encontrado!");
            return new ResponseEntity<>(rm, HttpStatus.NOT_FOUND);
        }
        cr.deleteById(id);
        rm.setMensagem("Cargo excluído com sucesso!");
        return new ResponseEntity<>(rm, HttpStatus.OK);
    }

    public Optional<Cargo> findById(long id) {
        return cr.findById(id);
    }
}
