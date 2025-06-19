package com.sentinel.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sentinel.backend.entity.Alunos;
import com.sentinel.backend.repository.AlunosRepository;

@Service
public class AlunosService {

    @Autowired
    private AlunosRepository alunosRepository;

    public String save(Alunos alunos) {
        this.alunosRepository.save(alunos);

        return "Aluno cadastrado com sucesso!";

    }

}
