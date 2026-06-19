USE defaultdb;

CREATE TABLE tbl_Usuario
(
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	cpf CHAR(14) NOT NULL,
	telefone CHAR(11) NOT NULL,
	senha VARCHAR(255) NOT NULL,
    perfil VARCHAR(30) DEFAULT 'Usuario'
);

INSERT INTO tbl_Usuario (nome, email, cpf, telefone, senha) VALUES 
('Otávio', 'otavio.augusttocc@gmail.com', '50916371840', '11992181212', 'Ota_01');

SELECT * FROM tbl_Usuario
WHERE email = 'otavio.augusttocc@gmail.com';

#TRUNCATE TABLE tbl_Usuario;
#DROP TABLE tbl_Usuario;

DESCRIBE tbl_Usuario;