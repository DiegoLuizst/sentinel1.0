INSERT INTO permissoes_grupo (nome) VALUES ('ADMIN');
INSERT INTO usuario_auth (username, password, role) VALUES ('admin@example.com', '$2b$10$dbqs8pL80Nb/xPZ6XTD2zu.1StJ7vu0AgynHl3v3s3E.cQ/Gc6LxG', 'ADMIN');
INSERT INTO usuarios (nome, email, senha, permissao_grupo_id) VALUES ('Administrador', 'admin@example.com', '$2b$10$dbqs8pL80Nb/xPZ6XTD2zu.1StJ7vu0AgynHl3v3s3E.cQ/Gc6LxG', 1);
