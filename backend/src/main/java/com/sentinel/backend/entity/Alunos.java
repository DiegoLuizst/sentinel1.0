package com.sentinel.backend.entity;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "alunos")
@Getter
@Setter
public class Alunos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private Date data;
    private String genero;
    private String cep;
    private String rua;
    private String numero;
    private String complemento;
    private String bairro;
    private String cidade;
    private String estado;
    private String telefone;
    private String email;
    private String nome_resp1;
    private String telefone_resp1;
    private String email_resp1;
    private String cpf_resp1;
    private String cep_resp1;
    private String rua_resp1;
    private String numero_resp1;
    private String complemento_resp1;
    private String bairro_resp1;
    private String cidade_resp1;
    private String estado_resp1;
    private String parentesco_resp1;
    private String nome_resp2;
    private String telefone_resp2;
    private String email_resp2;
    private String cpf_resp2;
    private String cep_resp2;
    private String rua_resp2;
    private String numero_resp2;
    private String complemento_resp2;
    private String bairro_resp2;
    private String cidade_resp2;
    private String estado_resp2;
    private String parentesco_resp2;

    @ManyToOne(optional = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "turma_id", referencedColumnName = "id")
    private Turma turma;
}
