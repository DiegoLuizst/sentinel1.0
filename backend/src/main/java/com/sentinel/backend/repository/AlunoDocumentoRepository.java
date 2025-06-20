package com.sentinel.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sentinel.backend.entity.AlunoDocumento;

public interface AlunoDocumentoRepository extends JpaRepository<AlunoDocumento, Long> {
}
