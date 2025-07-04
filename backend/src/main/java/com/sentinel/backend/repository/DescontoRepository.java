package com.sentinel.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sentinel.backend.entity.Desconto;

public interface DescontoRepository extends JpaRepository<Desconto, Long> {
    List<Desconto> findByParcelaId(Long parcelaId);
    List<Desconto> findByPagamentoId(Long pagamentoId);
}
