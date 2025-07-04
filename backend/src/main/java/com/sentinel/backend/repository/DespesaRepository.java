package com.sentinel.backend.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sentinel.backend.entity.Despesa;

public interface DespesaRepository extends JpaRepository<Despesa, Long> {
    List<Despesa> findByData(Date data);
    List<Despesa> findByDataBetween(Date inicio, Date fim);
}
