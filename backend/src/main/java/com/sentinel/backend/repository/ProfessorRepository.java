package com.sentinel.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sentinel.backend.entity.Professor;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {
}
