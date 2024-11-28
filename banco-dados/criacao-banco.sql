CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `celular` varchar(45) NOT NULL,
  `data_nascimento` varchar(45) NOT NULL,
  `cep` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
 
--  CREATE TABLE produtos(
-- id_produtos INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
-- nome_produto VARCHAR(245) NOT NULL,
-- preco_produto VARCHAR(300) NOT NULL,
-- descricao_produto VARCHAR(500) NOT NULL,
-- foto_produto MEDIUMBLOB NOT NULL,
-- usuarios_id INT NOT NULL,
-- FOREIGN KEY (usuarios_id) REFERENCES usuarios(id)
-- );

-- CREATE TABLE login(
-- id_login INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
-- email_login VARCHAR(245) NOT NULL,
-- senha_login VARCHAR(245) NOT NULL,
-- usuarios_id INT NOT NULL,
-- FOREIGN KEY (usuarios_id) REFERENCES usuarios(id)
-- );