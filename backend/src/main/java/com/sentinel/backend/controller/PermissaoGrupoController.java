package com.sentinel.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sentinel.backend.entity.PermissaoGrupo;
import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.service.PermissaoGrupoService;

@RestController
@RequestMapping("/permissao")
@CrossOrigin("*")
public class PermissaoGrupoController {

    @Autowired
    private PermissaoGrupoService pgs;

    @GetMapping("/findAll")
    public Iterable<PermissaoGrupo> listar() {
        return pgs.listar();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable long id) {
        return pgs.remover(id);
    }

    @PutMapping("/update")
    public ResponseEntity<?> alterar(@RequestBody PermissaoGrupo permissaoGrupo) {
        return pgs.cadastrarAlterar(permissaoGrupo, "alterar");
    }

    @PostMapping("/save")
    public ResponseEntity<?> cadastrar(@RequestBody PermissaoGrupo permissaoGrupo) {
        return pgs.cadastrarAlterar(permissaoGrupo, "cadastrar");
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<PermissaoGrupo> findById(@PathVariable long id) {
        try {
            PermissaoGrupo pg = pgs.findById(id);
            return new ResponseEntity<>(pg, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
