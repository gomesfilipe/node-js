/* Comando para acessar o mysql no cmd */
/* mysql -h localhost -u root -p */

/* Tipos de dados: text, chat, int, float, date, blob (arquivos) */

SHOW DATABASES; /* Mostra todos os bancos de dados */
CREATE DATABASE name_bd; /* Cria um novo banco de dados */
USE name_bd; /* Acessa um banco de dados específico */
SHOW TABLES; /* Mostra tabelas do banco de dados que você acessou */

CREATE TABLE users(
    nome VARCHAR(50), /* Máximo 50 caracteres */
    email VARCHAR(100), /* Máximo 100 caracteres */
    idade INT
); /* Criando uma tabela com colunas para nome, email e idade */

DESCRIBE nome_table; /* Mostra uma determinada tabela */

/* Inserindo valores na tabela */
INSERT INTO users(nome, email, idade) VALUES(
    "Filipe Gomes",
    "email@teste.com.br",
    20
);

INSERT INTO users(email, idade, nome) VALUES(
    "email2@teste.com.br",
    25,
    "Pedro Silva"
);

INSERT INTO users(idade, nome) VALUES(
    22,
    "Ana Chagas"
);

INSERT INTO users(email, idade, nome) VALUES(
    "email3@teste.com.br",
    25,
    "Carlos Castro"
);

SELECT * FROM users; /* Ver todos os dados de uma tabela */

/* Consultando valores específicos da tabela */
SELECT * FROM users WHERE idade = 25; 
SELECT * FROM users WHERE nome = "Filipe Gomes";
SELECT * FROM users WHERE idade < 23; 

/* Deletando da tabela */
DELETE FROM users WHERE nome = "Carlos Castro";

/* Atualizando valor específico na tabela */
UPDATE users SET nome ="Nome Teste" WHERE nome = "Ana Chagas";
