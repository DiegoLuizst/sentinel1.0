package com.sentinel.backend.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sentinel.backend.entity.Receita;

public interface ReceitaRepository extends JpaRepository<Receita, Long> {
    List<Receita> findByData(Date data);
    List<Receita> findByDataBetween(Date inicio, Date fim);
}
