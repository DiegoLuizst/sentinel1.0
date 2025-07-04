package com.sentinel.backend.service;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.sentinel.backend.entity.LancamentoFinanceiro;
import com.sentinel.backend.entity.Receita;
import com.sentinel.backend.entity.Despesa;
import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.repository.LancamentoFinanceiroRepository;
import com.sentinel.backend.repository.ReceitaRepository;
import com.sentinel.backend.repository.DespesaRepository;

@Service
public class LancamentoFinanceiroService {

    @Autowired
    private LancamentoFinanceiroRepository lfr;

    @Autowired
    private ReceitaRepository receitaRepository;

    @Autowired
    private DespesaRepository despesaRepository;

    @Autowired
    private RespostaModelo rm;

    public Iterable<LancamentoFinanceiro> listar() {
        return lfr.findAll();
    }

    public void atualizarLancamento(Date data) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(data);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        Date diaInicio = cal.getTime();
        cal.add(Calendar.DAY_OF_MONTH, 1);
        Date diaFim = cal.getTime();

        List<Receita> receitasDia = receitaRepository.findByDataBetween(diaInicio, diaFim);
        BigDecimal totalReceitasDia = receitasDia.stream().map(Receita::getValor).reduce(BigDecimal.ZERO, BigDecimal::add);
        List<Despesa> despesasDia = despesaRepository.findByDataBetween(diaInicio, diaFim);
        BigDecimal totalDespesasDia = despesasDia.stream().map(Despesa::getValor).reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal saldoDia = totalReceitasDia.subtract(totalDespesasDia);

        cal.setTime(diaInicio);
        cal.set(Calendar.DAY_OF_MONTH, 1);
        Date mesInicio = cal.getTime();
        cal.add(Calendar.MONTH, 1);
        Date mesFim = cal.getTime();

        List<Receita> receitasMes = receitaRepository.findByDataBetween(mesInicio, mesFim);
        BigDecimal totalReceitasMes = receitasMes.stream().map(Receita::getValor).reduce(BigDecimal.ZERO, BigDecimal::add);
        List<Despesa> despesasMes = despesaRepository.findByDataBetween(mesInicio, mesFim);
        BigDecimal totalDespesasMes = despesasMes.stream().map(Despesa::getValor).reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal saldoMes = totalReceitasMes.subtract(totalDespesasMes);

        Optional<LancamentoFinanceiro> opt = lfr.findByData(diaInicio);
        LancamentoFinanceiro lf = opt.orElseGet(LancamentoFinanceiro::new);
        lf.setData(diaInicio);
        lf.setSaldoDiario(saldoDia);
        lf.setSaldoMensal(saldoMes);
        lfr.save(lf);
    }

    public ResponseEntity<?> cadastrarAlterar(LancamentoFinanceiro lancamento, String acao) {
        if (acao.equalsIgnoreCase("cadastrar")) {
            return new ResponseEntity<>(lfr.save(lancamento), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(lfr.save(lancamento), HttpStatus.OK);
        }
    }

    public ResponseEntity<RespostaModelo> remover(long id) {
        if (!lfr.existsById(id)) {
            rm.setMensagem("Lançamento financeiro não encontrado!");
            return new ResponseEntity<>(rm, HttpStatus.NOT_FOUND);
        }
        lfr.deleteById(id);
        rm.setMensagem("Lançamento financeiro removido com sucesso!");
        return new ResponseEntity<>(rm, HttpStatus.OK);
    }

    public Optional<LancamentoFinanceiro> findById(long id) {
        return lfr.findById(id);
    }
}
