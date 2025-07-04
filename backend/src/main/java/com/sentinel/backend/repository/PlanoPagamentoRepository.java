package com.sentinel.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sentinel.backend.entity.PlanoPagamento;

public interface PlanoPagamentoRepository extends JpaRepository<PlanoPagamento, Long> {
}
