package com.sentinel.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sentinel.backend.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
