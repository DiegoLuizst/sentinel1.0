package com.sentinel.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.sentinel.backend.entity.PermissaoGrupo;
import com.sentinel.backend.entity.Professor;
import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.entity.Usuario;
import com.sentinel.backend.repository.PermissaoGrupoRepository;
import com.sentinel.backend.repository.ProfessorRepository;

@Service
public class ProfessorService {

    @Autowired
    private ProfessorRepository pr;

    @Autowired
    private RespostaModelo rm;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PermissaoGrupoRepository permissaoGrupoRepository;

    public Iterable<Professor> listar() {
        return pr.findAll();
    }

    public ResponseEntity<?> cadastrarAlterar(Professor professor, String acao) {
        if (professor.getFuncionario() == null) {
            rm.setMensagem("O funcionário é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        }
        Usuario usuario = professor.getUsuario();
        if (usuario == null && acao.equalsIgnoreCase("cadastrar")) {
            usuario = new Usuario();
            usuario.setNome(professor.getFuncionario().getNome());
            usuario.setEmail(professor.getFuncionario().getEmail());
            usuario.setSenha("123456");
            PermissaoGrupo pg = permissaoGrupoRepository.findAll().stream()
                    .filter(p -> "ADMIN".equalsIgnoreCase(p.getNome()))
                    .findFirst().orElse(null);
            usuario.setPermissaoGrupo(pg);
            ResponseEntity<?> resp = usuarioService.cadastrarAlterar(usuario, "cadastrar");
            if (resp.getStatusCode() != HttpStatus.CREATED && resp.getStatusCode() != HttpStatus.OK) {
                return resp;
            }
            professor.setUsuario((Usuario) resp.getBody());
        } else if (usuario != null) {
            usuarioService.cadastrarAlterar(usuario, acao);
        }
        if (acao.equalsIgnoreCase("cadastrar")) {
            return new ResponseEntity<>(pr.save(professor), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(pr.save(professor), HttpStatus.OK);
        }
    }

    public ResponseEntity<RespostaModelo> remover(long id) {
        if (!pr.existsById(id)) {
            rm.setMensagem("Professor não encontrado!");
            return new ResponseEntity<>(rm, HttpStatus.NOT_FOUND);
        }
        pr.deleteById(id);
        rm.setMensagem("Professor excluído com sucesso!");
        return new ResponseEntity<>(rm, HttpStatus.OK);
    }

    public Optional<Professor> findById(long id) {
        return pr.findById(id);
    }
}
