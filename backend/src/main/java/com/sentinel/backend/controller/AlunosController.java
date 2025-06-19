package com.sentinel.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sentinel.backend.entity.Alunos;
import com.sentinel.backend.service.AlunosService;

@RestController
@RequestMapping("/alunos")
public class AlunosController {

    @Autowired
    private AlunosService alunosService;

    @PostMapping("/save")
    private ResponseEntity<String> save(@RequestBody Alunos alunos) {
        try {

            String mensagem = this.alunosService.save(alunos);
            return new ResponseEntity<String>(mensagem, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<String>("Erro ao cadastrar", HttpStatus.BAD_REQUEST);
        }
    }

}
