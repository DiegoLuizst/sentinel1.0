package com.sentinel.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sentinel.backend.entity.Aluno;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {

}
