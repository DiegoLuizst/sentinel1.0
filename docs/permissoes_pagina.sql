-- Script para inserção das permissões de página básicas
INSERT INTO permissoes_pagina (nome, rota, metodo_http) VALUES
('Cadastro de Usuários (visualizar)', '/usuarios', 'GET'),
('Cadastro de Usuários (incluir)', '/usuarios', 'POST'),
('Cadastro de Usuários (alterar)', '/usuarios', 'PUT'),
('Cadastro de Usuários (excluir)', '/usuarios', 'DELETE'),
('Cadastro de Turmas (visualizar)', '/turmas', 'GET'),
('Cadastro de Turmas (incluir)', '/turmas', 'POST'),
('Cadastro de Turmas (alterar)', '/turmas', 'PUT'),
('Cadastro de Turmas (excluir)', '/turmas', 'DELETE'),
('Cadastro de Alunos (visualizar)', '/alunos', 'GET'),
('Cadastro de Alunos (incluir)', '/alunos', 'POST'),
('Cadastro de Alunos (alterar)', '/alunos', 'PUT'),
('Cadastro de Alunos (excluir)', '/alunos', 'DELETE'),
('Permissão de Grupo (visualizar)', '/permissao', 'GET'),
('Permissão de Grupo (incluir)', '/permissao', 'POST'),
('Permissão de Grupo (alterar)', '/permissao', 'PUT'),
('Permissão de Grupo (excluir)', '/permissao', 'DELETE');
