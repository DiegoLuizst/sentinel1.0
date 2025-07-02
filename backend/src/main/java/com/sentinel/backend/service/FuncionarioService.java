package com.sentinel.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

import com.sentinel.backend.entity.Funcionario;
import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.repository.FuncionarioRepository;

@Service
public class FuncionarioService {

    @Autowired
    private FuncionarioRepository fr;

    @Autowired
    private RespostaModelo rm;

    public Iterable<Funcionario> listar() {
        return fr.findAll();
    }

    public ResponseEntity<?> cadastrarAlterar(Funcionario funcionario, String acao) {
        if (funcionario.getNome() == null || funcionario.getNome().isEmpty()) {
            rm.setMensagem("O nome do Funcionário é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (funcionario.getEmail() == null || funcionario.getEmail().isEmpty()) {
            rm.setMensagem("O email é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (funcionario.getTelefone() == null || funcionario.getTelefone().isEmpty()) {
            rm.setMensagem("O telefone é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (funcionario.getCpf() == null || funcionario.getCpf().isEmpty()) {
            rm.setMensagem("O CPF é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (funcionario.getCep() == null || funcionario.getCep().isEmpty()) {
            rm.setMensagem("O CEP é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (funcionario.getRua() == null || funcionario.getRua().isEmpty()) {
            rm.setMensagem("A rua é obrigatória!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (funcionario.getNumero() == null || funcionario.getNumero().isEmpty()) {
            rm.setMensagem("O número é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (funcionario.getBairro() == null || funcionario.getBairro().isEmpty()) {
            rm.setMensagem("O bairro é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (funcionario.getCidade() == null || funcionario.getCidade().isEmpty()) {
            rm.setMensagem("A cidade é obrigatória!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (funcionario.getEstado() == null || funcionario.getEstado().isEmpty()) {
            rm.setMensagem("O estado é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (funcionario.getAdmissao() == null) {
            rm.setMensagem("A data de admissão é obrigatória!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (funcionario.getCargo() == null) {
            rm.setMensagem("O cargo é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        }

        if (acao.equalsIgnoreCase("cadastrar")) {
            funcionario.setStatus("ATIVO");
        } else if (funcionario.getDemissao() != null) {
            funcionario.setStatus("INATIVO");
        }

        if (acao.equalsIgnoreCase("cadastrar")) {
            return new ResponseEntity<>(fr.save(funcionario), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(fr.save(funcionario), HttpStatus.OK);
        }
    }

    public ResponseEntity<RespostaModelo> remover(long id) {
        if (!fr.existsById(id)) {
            rm.setMensagem("Funcionário não encontrado!");
            return new ResponseEntity<>(rm, HttpStatus.NOT_FOUND);
        }
        fr.deleteById(id);
        rm.setMensagem("Funcionário excluído com sucesso!");
        return new ResponseEntity<>(rm, HttpStatus.OK);
    }

    public Optional<Funcionario> findById(long id) {
        return fr.findById(id);
    }
}
