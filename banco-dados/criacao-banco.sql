
--  CREATE TABLE usuarios(
-- id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
-- nome VARCHAR(245) NOT NULL,
-- email VARCHAR(245) NOT NULL,
-- senha VARCHAR(12) NOT NULL,
-- celular VARCHAR(14) NOT NULL,
-- data_nascimento VARCHAR(45) NOT NULL,
-- cep VARCHAR(9) NOT NULL
-- );

CREATE TABLE produtos(
id_produtos INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome_produto VARCHAR(245) NOT NULL,
preco_produto VARCHAR(300) NOT NULL,
descricao_produto VARCHAR(500) NOT NULL,
foto_produto VARCHAR(500) NOT NULL,
usuarios_id INT NOT NULL,
FOREIGN KEY (usuarios_id) REFERENCES usuarios(id)
);
