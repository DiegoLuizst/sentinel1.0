INSERT IGNORE INTO permissoes_grupo (nome) VALUES ('ADMIN');
INSERT IGNORE INTO usuario_auth (username, password, role) VALUES ('admin@example.com', '$2b$10$dbqs8pL80Nb/xPZ6XTD2zu.1StJ7vu0AgynHl3v3s3E.cQ/Gc6LxG', 'ADMIN');
INSERT IGNORE INTO usuarios (nome, email, senha, permissao_grupo_id) VALUES ('Administrador', 'admin@example.com', '$2b$10$dbqs8pL80Nb/xPZ6XTD2zu.1StJ7vu0AgynHl3v3s3E.cQ/Gc6LxG', 1);

-- Permissões de Páginas
INSERT IGNORE INTO permissoes_pagina (id, nome, rota, metodo_http) VALUES
  (1, 'Usuários - Listar', '/usuarios', 'GET'),
  (2, 'Usuários - Criar', '/usuarios', 'POST'),
  (3, 'Usuários - Atualizar', '/usuarios', 'PUT'),
  (4, 'Usuários - Remover', '/usuarios', 'DELETE'),
  (5, 'Permissão Grupo - Listar', '/permissao', 'GET'),
  (6, 'Permissão Grupo - Criar', '/permissao', 'POST'),
  (7, 'Permissão Grupo - Atualizar', '/permissao', 'PUT'),
  (8, 'Permissão Grupo - Remover', '/permissao', 'DELETE'),
  (9, 'Permissão Página - Listar', '/paginas', 'GET'),
  (10, 'Permissão Página - Criar', '/paginas', 'POST'),
  (11, 'Permissão Página - Atualizar', '/paginas', 'PUT'),
  (12, 'Permissão Página - Remover', '/paginas', 'DELETE'),
  (13, 'Turmas - Listar', '/turmas', 'GET'),
  (14, 'Turmas - Criar', '/turmas', 'POST'),
  (15, 'Turmas - Atualizar', '/turmas', 'PUT'),
  (16, 'Turmas - Remover', '/turmas', 'DELETE'),
  (17, 'Alunos - Listar', '/alunos', 'GET'),
  (18, 'Alunos - Criar', '/alunos', 'POST'),
  (19, 'Alunos - Atualizar', '/alunos', 'PUT'),
  (20, 'Alunos - Remover', '/alunos', 'DELETE'),
  (21, 'Cargo Funcionário - Listar', '/cargos', 'GET'),
  (22, 'Cargo Funcionário - Criar', '/cargos', 'POST'),
  (23, 'Cargo Funcionário - Atualizar', '/cargos', 'PUT'),
  (24, 'Cargo Funcionário - Remover', '/cargos', 'DELETE'),
  (25, 'Disciplina - Listar', '/disciplinas', 'GET'),
  (26, 'Disciplina - Criar', '/disciplinas', 'POST'),
  (27, 'Disciplina - Atualizar', '/disciplinas', 'PUT'),
  (28, 'Disciplina - Remover', '/disciplinas', 'DELETE');

-- Vincula todas as páginas ao grupo ADMIN
INSERT IGNORE INTO grupo_paginas (grupo_id, pagina_id) VALUES
  (1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(1,9),(1,10),
  (1,11),(1,12),(1,13),(1,14),(1,15),(1,16),(1,17),(1,18),(1,19),(1,20),
  (1,21),(1,22),(1,23),(1,24),(1,25),(1,26),(1,27),(1,28);
