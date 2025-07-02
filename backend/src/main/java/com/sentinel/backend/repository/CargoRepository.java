package com.sentinel.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sentinel.backend.entity.Cargo;

public interface CargoRepository extends JpaRepository<Cargo, Long> {
}
