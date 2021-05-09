# Sequelize \#02 | Models e Model Querying

![Screenshot](https://raw.githubusercontent.com/Marcelo-Diament/sequelize-aula-01/main/backend/public/images/sequelize-aula-01.png)

Prática 02 do módulo Sequelize. Nessa prática iremos realizar as 4 etapas de um CRUD - criar um registro no Banco de Dados (C - _Create_), consultar um ou todos os registros (R - _Read_), atuaizar um registro (U - _Update_) e excluir um registro (D - _Delete_) através de _Models_ e _Model Querying_.

Usaremos o Node.js como base, o Express como 'mini _framework_' para configurarmos nosso servidor (com ajuda do Express Generator), EJS como _template engine_ para nossas telas, Banco de Dados MySQL e o Sequelize, foco da prática, para nos conectarmos ao BD e manipularmos os registros com _Model Queries_ (_queries_ baseadas em modelos). Também implementaremos alguns recursos como paginação e ordenação.

## Como Usar o Repositório?

A ideia da prática é que consiga reproduzir esse projeto na sua própria máquina, do zero - seguindo as instruções desse repositório. Mas, caso queira baixar o repositório e 'rodar' em ambiente local, basta executar os seguintes passos:

1. Ativar o MySQL através do XAMPP

2. Ativar sua conexão (no caso com os dados `host: localhost`, `user: root`, `password: (vazia)`)

3. Criar um Banco de Dados MySQL chamado `aula_sequelize_02`

4. Criar uma tabela chamada `funcoes` com os campos `id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY` e `funcao VARCHAR(100) NOT NULL`.

5. Popular a tabela com os valores `Administrador` e `Usuário Final` (nessa ordem).

6. Criar uma tabela chamada `usuarios` com os campos `id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY`, `nome VARCHAR(100) NOT NULL`, `sobrenome VARCHAR(100) NOT NULL`, `email VARCHAR(100) NOT NULL`,  `senha VARCHAR(100) NOT NULL` e `id_funcao INT UNSIGNED` e criar a _contraint_ (_FK x PK_) (`CONSTRAINT fk_funcao_id FOREIGN KEY (id_funcao) REFERENCES funcoes(id)`). O campo senha ficará vunerável, mas nas aulas seguintes veremos como encriptar a senha de melhor maneira.

7. Popular essa tabela com alguns registros (opcional, mas vale a pena para poder visualizar os usuários logo no início)

6. Garantir que possui o Express e o Nodemon instalados globalmente

7. Instalar as dependências do projeto e iniciar o servidor (via terminal)

``` sh
cd backend && npm install && npm run start
```

8. Abrir `localhost:3000` no seu navegador

As seguir há o detalhamento de cada etapa percorrida ao longo do projeto - inclusive as etapas mencionadas acima.

Faça bom proveito e esperamos que ajude em sua jornada de aprendizado! =)

## Introdução

Nesse repositório criaremos um projeto simples, onde poderemos criar, consultar, editar e excluir usuários a partir de um banco de dados MySQL.

### Objetivo

O intuito é entendermos como:

1. Conectar o backend (node.js) com um banco de dados

2. Realizar o CRUD (_Create, Read, Update e Delete_) através do Sequelize

3. Utilizarmos queries SQL através do modelo para executarmos as ações (_Model Queries_)

Embora o Sequelize tenha outras features mais bacanas, como usar os métodos do Sequelize e Models, iniciaremos pelo básico.

### Pré Requisitos

Para executar essa prática, precisaremos de:

1. VS Code (ou outra IDE) para trabalharmos nosso código

2. GitBash (ou outro terminal) para executarmos nossos comandos de instalação de pacotes

3. Banco de dados MySQL (sugerimos o download do XAMPP/LAMP/MAMP - de acordo com seu sistema operacional)

4. Um SGBD (Sistema de Gestão de Banco de Dados) - pode ser o Workbench ou o phpMyAdmin, por exemplo

5. Node.js instalado (verifique se está instalado com o comando de terminal `node -v`)

6. NPM (ou Yarn) instalado (verifique se está instalado com o comando de terminal `npm -v`)

### Tecnologias

**Linguagens**

Basicamente utilizaremos JavaScript, SQL e Bash (comandos de terminal).

**Frameworks, Bibliotecas e Pacotes**

Para essa prática usaremos o Node.js como tecnologia de back end.

Para o servidor, utilizaremos o Express (e o pacote Express Generator para facilitar nossa vida).

Para a interface com o usuário, utilizaremos o EJS como template engine.

Para o banco de dados, seguiremos com MySQL como linguagem (e o pacote MySQL2) e utilizaremos o Sequelize (e o Sequelize-CLI como dependência para desenvolvimento) para manipular o banco a partir do back end.

Por fim, usaremos o pacote nodemon para que o servidor seja automaticamente atualizado a cada alteração em nosso código.

## Preset do Projeto

Alguns passos antes de iniciarmos.

### Banco de Dados

Como trabalharemos com um banco de dados MySQL, o primeiro passo é já criarmos nosso banco, uma tabela e incluir alguns registros.

Precisamos ativar a opção 'MySQL' no painel de controle do XAMPP para isso.

#### Criando o Banco de Dados

O primeiro passo é nos conectarmos pelo SGBD (usaremos o Workbench mas pode ser qualquer um). Nese passo é importante que já tome nota dos seus dados de conexão. Normalmente são:

> Host: 'localhost' OU '127.0.0.1' | Port: 3306 OU 3307 (Windows/Linux) OU 8888 OU 8889 (Mac) | User: 'root' | Senha: vazia (Windows/Linux) ou 'root' (Mac)

Esses dados são salvos quando realiza a conexão no SGBD e a porta é exibida no XAMPP também.

Então vamos executar o comando a seguir (através do Workbench, por exemplo) para criarmos o BD:

``` myqsl
CREATE DATABASE aula_sequelize_02;
```

Também precisamos 'usar' o banco:

``` mysql
USE aula_sequelize_02;
```

#### Criando a tabela funcoes

Vamos criar uma tabela dentro desse banco, vai se chamar `funcoes` :

``` mysql
CREATE TABLE funcoes (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    funcao VARCHAR(100) NOT NULL
);
```

#### Populando a tabela

``` mysql
INSERT INTO funcoes (funcao) VALUES ('Administrador'), ('Usuário Final');
```

#### Criando a tabela usuarios

Agora vamos criar uma tabela dentro desse banco, vai se chamar `usuarios` :

``` mysql
CREATE TABLE usuarios (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    id_funcao INT UNSIGNED,
	  CONSTRAINT fk_funcao_id FOREIGN KEY (id_funcao) REFERENCES funcoes(id)
);
```

Será uma tabela extremamente simples, apenas com os campos ID, Nome, Sobrenome e Email.

#### Populando a tabela

Por fim, incluiremos alguns usuários na tabela:

``` mysql
INSERT INTO usuarios (nome, sobrenome, email, senha, id_funcao)
VALUES ('Marcelo','Diament','marcelo@diament.com.br','Senha123',1),
('Henrique','Serra','henrique@diament.com.br','Senha123',1),
('Wolfgang','Amadeus Mozart','wolfg@ngamadeusmoz.art','Senha123',2),
('Ludwig','van Beethoven', 'ludv@nbeethov.en','Senha123',2),
('Pyotr','Ilyich Tchaikovsky','tch@ikov.sky','Senha123',2),
('Igor','Stravinsky', 'i.str@vins.sky','Senha123',2),
('George','Friedrich Händel','h@ndel.com','Senha123',2),
('Giacomo','Puccini', 'gi@puccini.com','Senha123',2),
('Johannes','Brahms', 'br@hms.net','Senha123',2),
('Antonio','Salieri', 'tonho@salieri.mus','Senha123',2),
('Antonio','Vivaldi', 'vivaldi@gmail.com','Senha123',2),
('Franz','Schubert', 'schubert@fra.nz','Senha123',2),
('Johann','Sebastian Bach','johan@ba.ch','Senha123',2),
('Frédéric','Chopin','fred@chop.in','Senha123',2),
('Chiquinha','Gonzaga','chica@gonzaga.com','Senha123',2),
('Heitor','Villa-Lobos','villa@lobos.com','Senha123',2),
('Alfredo','da Rocha Viana Filho','pixinguinha@ig.com.br','Senha123',2),
('Ary','Barroso','barroso.ary@terra.com.br','Senha123',2),
('Angenor','de Oliveira,','cartola@live.com','Senha123',2),
('Noel','Rosa','noel.rosa@outlook.com','Senha123',2),
('João','Rubinato','adoni@ran-barbosa.com','Senha123',2),
('Luiz','Gonzada','l.gonzada@gmail.com','Senha123',2),
('Vinicius','de Moraes','poeta@ig.com.br','Senha123',2),
('Lupicínio','Rodrigues','loop@live.com','Senha123',2),
('Dorival','Caymmi','dori@val.com','Senha123',2),
('Antônio Carlos','Jobim','tom@jobim.co','Senha123',2),
('Antônio José','Santana Martins','tom@tomze.com.br','Senha123',2),
('Baden','Powell','baden@powell.com.br','Senha123',2),
('Roberto','Carlos','rei@rb.com.br','Senha123',2),
('Erasmo','Carols','erasmo@carlos.com.br','Senha123',2),
('Gilberto','Gil','gil@berto.com','Senha123',2),
('Milton','Nascimento','miltinho@nascimento.com.br','Senha123',2),
('Caetano','Veloso','caeto@veloso.com','Senha123',2),
('Paulinho','da Viola','pdv@gmail.com','Senha123',2),
('Sebastião','Rodrigues Maia','timm@ia.com.br','Senha123',2),
('Chico','Buarque de Holanda','chico@buarque.com','Senha123',2),
('Aldir','Blanc','aldir@blanc.com','Senha123',2),
('João','Bosco','johnny@bosco.com','Senha123',2),
('Alceu','Paiva Valença','alceu@valenca.com','Senha123',2),
('Zé','Ramalho','ze@ramalho.com.br','Senha123',2),
('Antonio','Pecci Filho','toquinho@gmail.com','Senha123',2),
('Djavan','Caetano Viana','dj@van.com.br','Senha123',2),
('Marisa','Monte','marisa@monte.com','Senha123',2),
('Agenor','de Miranda Araújo Neto','cazuza@baraovermelho.com','Senha123',2);
```

Podemos ainda executar um `SELECT` para vermos os registros inseridos:

``` mysql
SELECT usuarios.nome AS 'Nome',
    usuarios.sobrenome AS 'Sobrenome',
    usuarios.email AS 'Email',
    usuarios.senha AS 'Senha',
    funcoes.funcao AS 'Função'
FROM usuarios
LEFT JOIN funcoes ON usuarios.id_funcao = funcoes.id;
```

### Dependências Globais

Não é obrigatório, mas já podemos deixar algumas dependências de forma global, para utilizarmos mais facilmente nos próximos projetos.

É importante lembrar que, caso queira deixar a dependência salva no `package.json` (arquivo responsável - também - por mapear as dependências do projeto), devemos instalar localmente, indicando a opção `--save` para salvar como dependência. Também podemos indicar como uma dependência de desenvolvimento passando a opção `-D` após `--save` .

#### Express Generator

Trata-se de um _boilerplate_ do Express, ou seja, esse pacote já cria um projeto estruturado de Express para nós. Para instalar devemos executar no terminal o seguinte comando:

``` sh
npm install express-generator -g
```

#### Nodemon

É um pacote que simplesmente observa as alterações no projeto e atualiza o servidor automaticamente (sem precisarmos 'derrubar' o servidor com o `Control + C` e reiniciarmos com `node arquivo.js` ). Comando para instalação:

``` sh
npm install -g nodemon
```
