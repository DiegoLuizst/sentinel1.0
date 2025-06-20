package com.sentinel.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "permissoes_pagina")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PermissaoPagina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome; // Ex: "Cadastro de Usuários"
    private String rota; // Ex: "/usuarios"
    private String metodoHttp; // Ex: GET, POST, PUT, DELETE
}
