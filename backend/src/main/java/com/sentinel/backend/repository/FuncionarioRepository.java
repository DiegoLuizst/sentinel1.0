package com.sentinel.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sentinel.backend.entity.Funcionario;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
}
