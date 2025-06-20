package com.sentinel.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sentinel.backend.entity.Aluno;
import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.service.AlunoService;
import com.sentinel.backend.service.AlunoDocumentoService;

@RestController
@RequestMapping("/alunos")
@CrossOrigin("*")
public class AlunosController {

    @Autowired
    private AlunoService as;

    @Autowired
    private AlunoDocumentoService documentoService;

    @GetMapping("/findAll")
    public Iterable<Aluno> listar() {
        return as.listar();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable long id) {
        return as.remover(id);
    }

    @PutMapping("/update")
    public ResponseEntity<?> alterar(@RequestBody Aluno aluno) {
        return as.cadastrarAlterar(aluno, "alterar");
    }

    @PostMapping("/save")
    public ResponseEntity<?> cadastrar(@RequestBody Aluno aluno) {
        return as.cadastrarAlterar(aluno, "cadastrar");
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<Aluno> findById(@PathVariable long id) {
        try {
            Aluno aluno = as.findById(id);
            return new ResponseEntity<>(aluno, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/upload/{id}")
    public ResponseEntity<?> upload(@PathVariable Long id, @RequestParam("files") MultipartFile[] files) {
        try {
            return new ResponseEntity<>(documentoService.salvar(id, files), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
