package com.sentinel.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sentinel.backend.entity.Pagamento;

public interface PagamentoRepository extends JpaRepository<Pagamento, Long> {
    List<Pagamento> findByParcelaId(Long parcelaId);
}
