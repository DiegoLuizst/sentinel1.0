package com.sentinel.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sentinel.backend.entity.Parcela;

public interface ParcelaRepository extends JpaRepository<Parcela, Long> {
}
