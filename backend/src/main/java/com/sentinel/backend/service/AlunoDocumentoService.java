package com.sentinel.backend.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sentinel.backend.entity.Aluno;
import com.sentinel.backend.entity.AlunoDocumento;
import com.sentinel.backend.repository.AlunoDocumentoRepository;
import com.sentinel.backend.repository.AlunoRepository;

@Service
public class AlunoDocumentoService {

    private final Path root = Paths.get("uploads");

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private AlunoDocumentoRepository documentoRepository;

    public List<AlunoDocumento> salvar(Long alunoId, MultipartFile[] files) throws IOException {
        Aluno aluno = alunoRepository.findById(alunoId).orElseThrow();

        Files.createDirectories(root);

        List<AlunoDocumento> salvos = new ArrayList<>();
        for (MultipartFile file : files) {
            String filename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path destination = root.resolve(filename);
            Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);

            AlunoDocumento doc = new AlunoDocumento();
            doc.setFileName(file.getOriginalFilename());
            doc.setFilePath(destination.toString());
            doc.setAluno(aluno);
            salvos.add(documentoRepository.save(doc));
        }
        return salvos;
    }
}
