CREATE DATABASE db_Clothean;
USE db_Clothean;

CREATE TABLE tbl_Usuario
(
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(255) NOT NULL,
	email VARCHAR(255) UNIQUE NOT NULL,
	cpf CHAR(14) NOT NULL,
	telefone CHAR(15) NOT NULL,
	senha VARCHAR(255) NOT NULL,
    perfil ENUM('Adm', 'Usuario') DEFAULT 'Usuario'  NOT NULL
);

INSERT INTO Tbl_Usuario (nome, email, cpf, telefone, senha, perfil) VALUES 
('Otávio', 'otav@gmail.com', '50916371840', '(11) 99218-1213', 'Ota_01', 'Adm');

SELECT * FROM tbl_Usuario
WHERE email = 'otavio.augusttocc@gmail.com';

TRUNCATE TABLE tbl_Usuario;
DROP TABLE tbl_Usuario;

DESCRIBE tbl_Usuario;