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

## Base do Projeto

**Branch:** [feature/project-base](https://github.com/Marcelo-Diament/sequelize-aula-02/tree/feature/project-base)

Agora vamos, finalmente criar nosso projeto! =)

### Projeto Express com Express Generator

Nessa prática, faremos tudo através do Node.js, então não teremos front end. Vamos criar nossa pasta de backend utilizando o Express Generator, que acabamos de instalar globalmente. É bem simples, basta executarmos:

``` sh
express backend --view=ejs
```

O termo `express` chama o pacote que instalamos. `backend` é o nome do projeto Express, da pasta que será criada. E `--view=ejs` indica que a template engine que utilizaremos será o EJS.

Verá que a pasta `backend` foi criada já com uma série de arquivos dentro dela (caso tenha dúvidas em relação ao Express e ao Express Generator, consulte os repositórios específicos sobre esse tema, como [express-intro](https://github.com/Marcelo-Diament/express-intro) ou [express-generator](https://github.com/Marcelo-Diament/express-generator)). Sobre o EJS, há o repositório [template-engine-ejs](https://github.com/Marcelo-Diament/template-engine-ejs).

### Script Start

Agora vamos atualizar o _script_ `start` do arquivo `./backend/package.json` para usarmos o `nodemon` .

Nesse arquivo (dentro da pasta `./backend` ) vamos substituir o trecho `node` do _script_ `start` por `nodemon` . Ficará assim:

``` json
{
  "name": "backend",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "nodemon ./bin/www"
  },
  "dependencies": {
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "ejs": "~2.6.1",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "morgan": "~1.9.1"
  }
}
```

Dependendo de quando estiver realizando essa prática as versões das dependências podem mudar.

### Dependências do Projeto

Agora já vamos deixar instaladas as dependências. Dentro da pasta `backend` vamos instalar o pacote 'sequelize' e o pacote 'mysql2' de uma só vez:

``` sh
cd backend && npm install --save sequelize mysql2
```

E vamos instalar, também, a dependência de desenvolvimento 'sequelize-cli':

``` sh
npm install --save -D sequelize-cli
```

### Conectando o Banco de Dados

Bom, como é necessário criarmos a conexão com nosso banco de dados para podermos trabalhar com o Sequelize e o nosso BD (Banco de Dados) MySQL, vamos considerar a tarefa de preparar a conexão (não é a conexão em si) como parte do setup do projeto.

#### Config

Na pasta `./backend` vamos criar um arquivo `database.js` dentro de uma pasta que vamos criar também, chamada `config` . Faremos isso via terminal.

Considerando que já estamos dentro da pasta `./backend` no terminal, executaremos o seguinte comando:

``` sh
mkdir config && cd config && touch database.js && code database.js
```

Simplesmente estamos concatenando os comandos para 1. criar a pasta `config` , 2. acessar a pasta `config` , 3. criar o arquivo `database.js` e 4. abrir o arquivo `database.js` .

O arquivo `./backend/config/database.js` abrirá automaticamente. Então vamos incluir o seguinte código dentro dele:

``` js
const config = {
    username: 'root',
    password: '',
    database: 'aula_sequelize_02',
    host: 'localhost',
    dialect: 'mysql'
}

module.exports = config
```

Perceba que são aqueles mesmos dados de conexão que mencionamos anteriormente. Temos:

| Propriedade (chave) | Valor               | Descrição                          |
| ------------------- | ------------------- | ---------------------------------- |
| username            | 'root'              | Nome de usuário do BD              |
| password            | ''                  | Senha do BD (no caso, vazia)       |
| database            | 'aula_sequelize_02' | Nome do Banco de Dados que criamos |
| host                | 'localhost'         | Host (poderia ser '127.0.0.1')     |
| dialect             | 'mysql'             | Dialeto - usaremos o MySQL         |

> Atenção! Esses dados são dados sensíveis - devem estar no arquivo `.gitignore` do nosso repositório para não serem compartilhados com o mundo. Como se trata apenas de um exercício e de uma conexão local padrão, sem senha, nesse caso não tem problema.

Observação: poderíamos já exportar essas configurações sem criarmos uma `const` , isso é opcional - mas fica mais compreensível definindo uma `const` e dando um nome aos dados que estamos informando.

Agora que temos os dados necessários para a conexão, vamos criar um arquivo que de fato permite conectarmos nosso backend ao BD (mas ainda não é a conexão em si).

Vamos criar o arquivo `.sequelizerc` (um arquivo oculto, pois se inicia com ponto). Ele deve ser criado na pasta `./backend` .

``` sh
touch .sequelizerc && code .sequelizerc
```

Nesse arquivo, declararemos o seguinte trecho de código:

``` js
const path = require('path')

module.exports = {
    'config': path.resolve('config', 'database.js'),
    'models': path.resolve('models')
}
```

Estamos simplesmente declarando qual o caminho para o arquivo com os dados de conexão e para os modelos que criaremos. O `path` nada mais faz do que unir as pastas do nosso caminho (como um `join` faria).

## Página Inicial

**Branch:** [feature/project-base](https://github.com/Marcelo-Diament/sequelize-aula-02/tree/feature/project-base)

Antes de entrarmos nas telas de usuários, vamos apenas ajustar nossa Homepage. Dessa forma, já faremos uma revisão breve sobre os principais conceitos do Express, MVC (no caso apenas o V - View e o C - Controller) e EJS (template engine). Lembrando que grande parte do trabalho já foi feita pelo Express Generator.

### Revisão

**./backend/app.js**

Tudo começa no arquivo `./backend/app.js` . Referente exclusivamente à página inicial (ou _index_, Homepage), temos os seguintes _snippets_ (trechos de código):

``` js
// Importantdo a rota index
var indexRouter = require('./routes/index');

// Definindo que usaremos a rota index quando acessarem '/'
app.use('/', indexRouter);
```

**./backend/routes/index.js**

A rota index vem construída dessa maneira:

``` js
// Método get, que recebe a rota (a partir de onde ele é chamado) e um callback que recebe request, response e next
router.get('/', function(req, res, next) {

    // Aqui estamos pedindo para renderizar a view index (primeiro parâmetro) e enviar um objeto com a propriedade title e o valor Express
    res.render('index', {
        title: 'Express'
    });

});
```

Ou seja, ao acessarmos `localhost:3000` , chamamos a rota `index` , que renderiza a view `index` enviando `title` com o valor `Express` .

A porta 3000 da URL é definida em `var port = normalizePort(process.env. PORT || '3000'); ` , no arquivo `backend\bin\www` .

**backend\views\index.ejs**

Por fim, temos a view `index` , responsável por renderizar a tela que o usuário final visualiza (podendo receber propriedades através da rota - ou do _controller_ que criaremos em breve). O EJS (e outros template engines) lembram muito a sintaxe do HTML, mas nos permitem usar JS dentro do próprio HTML, através de uma sintaxe específica. No caso, usamos `<%= umObjeto.suaPropriedade %>` para renderizarmos algo a partir de objetos JS:

``` ejs
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <h1><%= title %></h1>
    <p>Welcome to <%= title %></p>
  </body>
</html>
```

**Visualizando nossa Página Inicial**

Primeiro precisamos garantir que todas as dependências sejam instaladas. Então, de dentro da pasta `./backend` , vamos executar:

``` sh
npm install
```

E, finalmente, para visualizarmos nossa página incial, precisamos iniciar nosso servidor. Precisamos executar o comando no terminal:

``` sh
npm run start
```

Isso vai chamar o _script_ `start` que definimos no `./backend/package.json` , que por sua vez chama o nodemon. A partir daí, qualquer alteração nos arquivos em `./backend` fará com que o servidor já atualize (ainda assim, precisamos atualizar a aba no navegador para vermos as atualizações).

Agora é só acessarmos o endereço `localhost:3000` para vermos nossa tela inicial! =)

### Controller

O Controller serve para gerenciar, controlar, o que deve acontecer entre o acesso à rota (_request_) e a resposta entregue na tela (_response_). Dessa forma conseguimos implantar regras de negócio de forma a isolar tal responsabilidade.

Começaremos criando uma pasta chamada `controllers` e um arquivo `index.js` dentro dela (_controller_ responsável pela rota `index` ). No terminal, executaremos (a partir da pasta `./backend` )

``` sh
mkdir controllers && cd controllers && touch index.js && code index.js
```

O _controller_ nada mais é do que um objeto JS com métodos a serem chamados de acordo com cada rota. Esse objeto deve ser exportado como um módulo. Nesse arquivo teremos a seguinte estrutura:

``` js
// Criamos o objeto controller
const controller = {
    // Definimos uma chave que corresponde ao método index, que por sua vez, tem como valor uma arrow function que recebe req, res e next
    index: (req, res, next) => {
        //Aqui estamos renderizando a view index e enviando as propriedades title e subtitle e seus respectivos valores
        res.render('index', {
            title: 'Página Inicial',
            subtitle: 'Bem vindo à prática de Sequelize #02!'
        });
    }
}

module.exports = controller
```

Nesse caso só estamos prevendo um método - `index` - que responde ao acesso à página inicial sob o método `GET` (por isso o método do Express utilizado na rota é o `get()` ).

### Atualização Rota index

Agora precisamos utilizar o _controller_ `index` na respectiva rota. Vamos importá-lo (com `require()` ) e atrelá-lo à rota para a página inicial ( `'/'` ) sob o método GET ( `get()` ). No final das contas, estamos apenas utilizando o método `index` do _controller_ como segundo parâmetro da rota. Então o arquivo `./backend/routes/index.js` fica assim (já com algumas alterações de escrita):

``` js
const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/index')

router.get('/', controller.index)

module.exports = router
```

### Atualização da View index

E, para finalizarmos, vamos atualizar nossa _view_ `index` (em `./backend/views/index.ejs` ). Somente trocaremos a frase padrão pela propriedade `subtitle` que criamos no _controller_:

``` ejs
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <h1><%= title %></h1>
    <p><%= subtitle %></p>
  </body>
</html>
```

Com isso finalizamos nossa página inicial!

Sim, está super simples - mas a ideia é partirmos logo para o Sequelize, e não criarmos um front bonito para a Homepage.

## Templates Parciais

**Branch:** [feature/project-base](https://github.com/Marcelo-Diament/sequelize-aula-02/tree/feature/project-base)

Um último passo antes de entrarmos na parte de usuários é isolarmos as _tags_ HTML `head` , `header` e `footer` como _templates_ parciais (ou _subtemplates_). Mas... por quê?

Como essas 3 _tags_ sempre se repetem, isolarmos elas e importarmos em cada _template_ faz muito mais sentido. Assim, evitamos códigos duplicados e só precisamos atualizar um trecho quando houver algum tipo de alteração.

São pouquíssimos passos, quase que um `Control + X` / `Control + V` .

### Pasta partials

O primeiro passo é criarmos a pasta `./backend/views/partials` (partindo já de `./backend` ):

``` sh
cd views && mkdir partials
```

Dentro dessa pasta criaremos os 3 arquivos:

``` sh
cd partials && touch head.ejs header.ejs footer.ejs
```

### Head, Header e Footer

Agora tudo o que temos que fazer é recortar cada trecho e colar no respectivo _subtemplate_. Mas... já que vamos mexer nisso, já vamos adicionar algumas classes (respeitando o padrão [BEM](http://getbem.com/naming/), onde organizamos os seletores por Bloco, Elemento e Modificador) para darmos um 'talento' nesse estilo.

Lembre-se de que não há um `header` nem um `footer` definido ainda, então vamos criar algo bem simples.

**./backend/views/partials/head.ejs**

Já vamos incluir a abertura da tag `body` também.

``` ejs
<!DOCTYPE html>
<html>

<head>
  <title><%= title %> | Sequelize #01</title>
  <link rel='stylesheet' href='/stylesheets/style.css' />
</head>

<body>
```

**./backend/views/partials/header.ejs**

Vamos usar um texto fixo como `h1` em nosso `header` .

``` ejs
<header class="header">
  <h1 class="header__title">Sequelize #01 | Raw Queries</h1>
</header>
```

**./backend/views/partials/footer.ejs**

No `footer` usaremos um texto fixo acompanhado do símbolo HTML de _copyright_ e do ano atual. Repare que estamos usando JS puro dentro da sintaxe de renderização do EJS. E fechamos o `body` .

``` ejs
<footer class="footer">
  <p class="footer__copy">Sequelize #01 - Raw Queries &copy; | <%= new Date().getFullYear() %></p>
</footer>
</body>

</html>
```

### Incluindo os Templates Parciais

Agora que temos nossos templates parciais prontos, precisamos inclui-los na _view_ `index` . Para isso usaremos a seguinte sintaxe: `<%- include('caminho-do-arquivo/a-partir-da-view-atual') %>` :

``` ejs
<%- include('partials/head') %>
<%- include('partials/header') %>
<h1><%= title %></h1>
<p><%= subtitle %></p>
<%- include('partials/footer') %>
```

E para nossa _homepage_ não ficar tão sem graça assim, vamos incrementar um pouquinho mais.

``` ejs
<%- include('partials/head') %>
<%- include('partials/header') %>
<main>
  <section class="main-section">
    <h2 class="main-section__title"><%= title %></h2>
    <h3 class="main-section__subtitle"><%= subtitle %></h3>
    <p class="main-section__description">Nesse repositório criaremos um projeto simples, onde poderemos criar, consultar, editar e excluir usuários a partir de um banco de dados MySQL.</p>
    <p class="main-section__description">O intuito é entendermos como conectar o backend (node.js) a um banco de dados, realizar o CRUD (Create, Read, Update e Delete) através do Sequelize e utilizarmos queries SQL puras para executarmos as ações (Raw Queries).</p>
    <p class="main-section__description">Embora o Sequelize tenha outras features mais bacanas, como usar os métodos do Sequelize e Models, iniciaremos pelo básico.</p>
  </section>
</main>
<%- include('partials/footer') %>
```

### Atualizando o Estilo

E pra finalizar essa _branch_, vamos atualizar o estilo geral das nossas páginas. O arquivo responsável pelo estilo é o `./backend/public/stylesheets/style.css` . Vamos criar algumas variáveis e aplicar um estilo simples usando as classes que já criamos. Ficará assim:

``` css
:root {
    --azul: #00B7FF;
    --branco: #fff;
    --chumbo: #3e3e3e;
    --cinza: #eee;
    --preto: #000;
}

body {
    font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

a {
    color: var(--azul);
    text-decoration: none;
}

.header,
.footer {
    background-color: var(--azul);
    color: var(--branco);
    margin: 0;
    max-height: 76px;
    min-height: 40px;
    padding: 16px;
    text-align: center;
    width: -webkit-fill-available;
}

.header__title {
    font-size: 16px;
}

.footer__title {
    font-size: 14px;
    font-weight: bolder;
}

main {
    min-height: calc(100vh - 180px);
    padding: 16px;
}

.main-section__title {
    font-size: 24px;
}

.main-section__subtitle {
    color: var(--chumbo);
    font-size: 20px;
}

.main-section__description {
    color: var(--chumbo);
    font-size: 16px;
}
```
