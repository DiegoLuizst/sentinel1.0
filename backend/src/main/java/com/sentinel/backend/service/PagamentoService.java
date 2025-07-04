package com.sentinel.backend.service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.sentinel.backend.entity.Desconto;
import com.sentinel.backend.entity.Pagamento;
import com.sentinel.backend.entity.Parcela;
import com.sentinel.backend.entity.Receita;
import com.sentinel.backend.entity.RespostaModelo;
import com.sentinel.backend.repository.DescontoRepository;
import com.sentinel.backend.repository.PagamentoRepository;
import com.sentinel.backend.repository.ParcelaRepository;
import com.sentinel.backend.repository.ReceitaRepository;
import com.sentinel.backend.service.LancamentoFinanceiroService;

@Service
public class PagamentoService {

    @Autowired
    private PagamentoRepository pagamentoRepository;

    @Autowired
    private ParcelaRepository parcelaRepository;

    @Autowired
    private ReceitaRepository receitaRepository;

    @Autowired
    private DescontoRepository descontoRepository;

    @Autowired
    private RespostaModelo rm;

    @Autowired
    private LancamentoFinanceiroService lancamentoFinanceiroService;

    public Iterable<Pagamento> listar() {
        return pagamentoRepository.findAll();
    }

    public ResponseEntity<?> cadastrarAlterar(Pagamento pagamento, String acao) {
        if (pagamento.getParcela() == null) {
            rm.setMensagem("A parcela é obrigatória!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        }
        if (pagamento.getValorPago() == null) {
            rm.setMensagem("O valor pago é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        }
        if (pagamento.getDataPagamento() == null) {
            rm.setMensagem("A data do pagamento é obrigatória!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        }

        Pagamento saved = pagamentoRepository.save(pagamento);
        atualizarParcela(saved.getParcela());
        gerarReceita(saved);

        if (acao.equalsIgnoreCase("cadastrar")) {
            return new ResponseEntity<>(saved, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(saved, HttpStatus.OK);
        }
    }

    private void gerarReceita(Pagamento pagamento) {
        Receita r = new Receita();
        r.setDescricao("Pagamento parcela " + pagamento.getParcela().getId());
        r.setValor(pagamento.getValorPago());
        r.setData(pagamento.getDataPagamento());
        r.setCategoria("PAGAMENTO");
        receitaRepository.save(r);
        lancamentoFinanceiroService.atualizarLancamento(pagamento.getDataPagamento());
    }

    private void atualizarParcela(Parcela parcela) {
        List<Pagamento> pagamentos = pagamentoRepository.findByParcelaId(parcela.getId());
        BigDecimal totalPagos = pagamentos.stream()
                .map(Pagamento::getValorPago)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        List<Desconto> descontos = descontoRepository.findByParcelaId(parcela.getId());
        BigDecimal totalDescontos = descontos.stream()
                .map(Desconto::getValor)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal saldo = parcela.getValorOriginal()
                .subtract(totalDescontos)
                .subtract(totalPagos);

        if (saldo.compareTo(BigDecimal.ZERO) <= 0) {
            parcela.setStatus("QUITADO");
            parcelaRepository.save(parcela);
        }
    }

    public ResponseEntity<RespostaModelo> remover(long id) {
        if (!pagamentoRepository.existsById(id)) {
            rm.setMensagem("Pagamento não encontrado!");
            return new ResponseEntity<>(rm, HttpStatus.NOT_FOUND);
        }
        pagamentoRepository.deleteById(id);
        rm.setMensagem("Pagamento removido com sucesso!");
        return new ResponseEntity<>(rm, HttpStatus.OK);
    }

    public Optional<Pagamento> findById(long id) {
        return pagamentoRepository.findById(id);
    }
}
