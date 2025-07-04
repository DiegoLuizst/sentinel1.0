package com.sentinel.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sentinel.backend.entity.Matricula;

public interface MatriculaRepository extends JpaRepository<Matricula, Long> {
}
