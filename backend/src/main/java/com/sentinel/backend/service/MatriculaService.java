package com.sentinel.backend.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.sentinel.backend.entity.Matricula;
import com.sentinel.backend.entity.Parcela;
import com.sentinel.backend.entity.PlanoPagamento;
import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.repository.MatriculaRepository;
import com.sentinel.backend.repository.ParcelaRepository;

@Service
public class MatriculaService {

    @Autowired
    private MatriculaRepository mr;

    @Autowired
    private ParcelaRepository parcelaRepository;

    @Autowired
    private RespostaModelo rm;

    public Iterable<Matricula> listar() {
        return mr.findAll();
    }

    public ResponseEntity<?> cadastrarAlterar(Matricula matricula, String acao) {
        if (matricula.getAluno() == null) {
            rm.setMensagem("O aluno é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (matricula.getPlanoPagamento() == null) {
            rm.setMensagem("O plano de pagamento é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (matricula.getTurma() == null) {
            rm.setMensagem("A turma é obrigatória!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        }

        if (acao.equalsIgnoreCase("cadastrar")) {
            Matricula saved = mr.save(matricula);
            gerarParcelas(saved);
            return new ResponseEntity<>(saved, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(mr.save(matricula), HttpStatus.OK);
        }
    }

    private void gerarParcelas(Matricula matricula) {
        PlanoPagamento plano = matricula.getPlanoPagamento();
        int quantidade = plano.getNumeroParcelas();
        BigDecimal valorParcela = plano.getValorTotal().divide(BigDecimal.valueOf(quantidade));
        long incremento = getIncrementoMeses(plano.getPeriodicidade());
        LocalDate vencimento = LocalDate.now();
        for (int i = 1; i <= quantidade; i++) {
            Parcela p = new Parcela();
            p.setMatricula(matricula);
            p.setNumero(i);
            p.setValorOriginal(valorParcela);
            p.setDataVencimento(java.sql.Date.valueOf(vencimento));
            p.setStatus("ABERTO");
            parcelaRepository.save(p);
            vencimento = vencimento.plus(incremento, ChronoUnit.MONTHS);
        }
    }

    private long getIncrementoMeses(String periodicidade) {
        if (periodicidade == null) {
            return 1L;
        }
        return switch (periodicidade.toUpperCase()) {
            case "BIMESTRAL" -> 2L;
            case "TRIMESTRAL" -> 3L;
            case "SEMESTRAL" -> 6L;
            case "ANUAL" -> 12L;
            default -> 1L;
        };
    }

    public ResponseEntity<RespostaModelo> remover(long id) {
        if (!mr.existsById(id)) {
            rm.setMensagem("Matrícula não encontrada!");
            return new ResponseEntity<>(rm, HttpStatus.NOT_FOUND);
        }
        mr.deleteById(id);
        rm.setMensagem("Matrícula excluída com sucesso!");
        return new ResponseEntity<>(rm, HttpStatus.OK);
    }

    public Optional<Matricula> findById(long id) {
        return mr.findById(id);
    }
}
