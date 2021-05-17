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

## v0.0.0 | Base do Projeto

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
    'config': path.resolve('config', 'database.js')
}
```

Estamos simplesmente declarando qual o caminho para o arquivo com os dados de conexão e para os modelos que criaremos. O `path` nada mais faz do que unir as pastas do nosso caminho (como um `join` faria).

### Página Inicial

**Branch:** [feature/project-base](https://github.com/Marcelo-Diament/sequelize-aula-02/tree/feature/project-base)

Antes de entrarmos nas telas de usuários, vamos apenas ajustar nossa Homepage. Dessa forma, já faremos uma revisão breve sobre os principais conceitos do Express, MVC (no caso apenas o V - View e o C - Controller) e EJS (template engine). Lembrando que grande parte do trabalho já foi feita pelo Express Generator.

#### Revisão

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

#### Controller

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

#### Atualização Rota index

Agora precisamos utilizar o _controller_ `index` na respectiva rota. Vamos importá-lo (com `require()` ) e atrelá-lo à rota para a página inicial ( `'/'` ) sob o método GET ( `get()` ). No final das contas, estamos apenas utilizando o método `index` do _controller_ como segundo parâmetro da rota. Então o arquivo `./backend/routes/index.js` fica assim (já com algumas alterações de escrita):

``` js
const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/index')

router.get('/', controller.index)

module.exports = router
```

#### Atualização da View index

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

#### Templates Parciais

**Branch:** [feature/project-base](https://github.com/Marcelo-Diament/sequelize-aula-02/tree/feature/project-base)

Um último passo antes de entrarmos na parte de usuários é isolarmos as _tags_ HTML `head` , `header` e `footer` como _templates_ parciais (ou _subtemplates_). Mas... por quê?

Como essas 3 _tags_ sempre se repetem, isolarmos elas e importarmos em cada _template_ faz muito mais sentido. Assim, evitamos códigos duplicados e só precisamos atualizar um trecho quando houver algum tipo de alteração.

São pouquíssimos passos, quase que um `Control + X` / `Control + V` .

#### Pasta partials

O primeiro passo é criarmos a pasta `./backend/views/partials` (partindo já de `./backend` ):

``` sh
cd views && mkdir partials
```

Dentro dessa pasta criaremos os 3 arquivos:

``` sh
cd partials && touch head.ejs header.ejs footer.ejs
```

#### Head, Header e Footer

Agora tudo o que temos que fazer é recortar cada trecho e colar no respectivo _subtemplate_. Mas... já que vamos mexer nisso, já vamos adicionar algumas classes (respeitando o padrão [BEM](http://getbem.com/naming/), onde organizamos os seletores por Bloco, Elemento e Modificador) para darmos um 'talento' nesse estilo.

Lembre-se de que não há um `header` nem um `footer` definido ainda, então vamos criar algo bem simples.

**./backend/views/partials/head.ejs**

Já vamos incluir a abertura da tag `body` também.

``` ejs
<!DOCTYPE html>
<html>

<head>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title><%= title %> | Sequelize #02</title>
  <link rel='stylesheet' href='/stylesheets/style.css' />
</head>

<body>
```

**./backend/views/partials/header.ejs**

Vamos usar um texto fixo como `h1` em nosso `header` .

``` ejs
<header class="header">
  <h1 class="header__title">Sequelize #02 | Models e Queries</h1>
  <nav class="header__nav">
    <a href="/" target="_self" rel="next" title="Acessar página iniciar">Início</a>
    <a href="/users/add" target="_self" rel="next" title="Cadastrar usuário">Cadastro</a>
    <a href="/users" target="_self" rel="next" title="Ver listagem de usuários">Usuários</a>
    <a href="https://github.com/Marcelo-Diament/sequelize-aula-02" target="_blank" rel="author" title="Ver repositório">Repositório</a>
  </nav>
</header>
```

**./backend/views/partials/footer.ejs**

No `footer` usaremos um texto fixo acompanhado do símbolo HTML de _copyright_ e do ano atual. Repare que estamos usando JS puro dentro da sintaxe de renderização do EJS. E fechamos o `body` .

``` ejs
<footer class="footer">
  <p class="footer__copy">Sequelize #02 - Models & Queries &copy; | <%= new Date().getFullYear() %></p>
</footer>
</body>

</html>
```

#### Incluindo os Templates Parciais

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
    <p class="main-section__description">O intuito é entendermos como conectar o backend (node.js) a um banco de dados, realizar o CRUD (Create, Read, Update e Delete) através do Sequelize e utilizarmos queries SQL baseadas em modelos para executarmos as ações (Model Queries).</p>
    <div class="cta">
      <a href="/users" rel="next" target="_self" title="Ver listagem de usuários" class="cta__btn">Ver Lista de Usuários</a>
    </div>
  </section>
</main>
<%- include('partials/footer') %>
```

#### Atualizando o Estilo

E pra finalizar essa _branch_, vamos atualizar o estilo geral das nossas páginas. O arquivo responsável pelo estilo é o `./backend/public/stylesheets/style.css` . Vamos criar algumas variáveis e aplicar um estilo simples usando as classes que já criamos. Ficará assim:

``` css
:root {
    --amarelo: #ffc400;
    --azul: #00B7FF;
    --branco: #fff;
    --chumbo: #3e3e3e;
    --cinza: #eee;
    --preto: #000;
    --vermelho: #ff0055;
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

.header {
    align-items: center;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
}

.header__title {
    font-size: 16px;
}

.header__nav a {
    color: var(--branco);
    font-weight: bolder;
}

.header__nav a:hover {
    color: var(--chumbo);
}

.header__nav a:hover::after {
    color: var(--branco);
}

.header__nav a:not(:last-child)::after {
    content: ' | ';
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

.cta__btn {
    background-color: var(--azul);
    border: none;
    color: var(--branco);
    display: inline-block;
    font-weight: bolder;
    text-align: center;
    margin: auto;
    padding: 6px 12px;
}

.cta__btn:hover {
    background-color: var(--chumbo);
    color: var(--azul);
    cursor: pointer;
}

@media only screen and (min-width: 640px) {
    .header {
        flex-flow: row wrap;
    }
}
```

### Usuários

**Branch:** [feature/project-base](https://github.com/Marcelo-Diament/sequelize-aula-01/tree/feature/project-base)

Agora que já possuimos uma _homepage_ e um singelo estilo aplicado a ela, vamos preparar os arquivos referentes a tela de usuários.

Faremos basicamente tudo o que fizemos com a Página Inicial, começando pela rota e seu _controller_.

#### Rota users

No arquivo `./backend/routes/users.js` , vamos preparar a rota para a listagem dos usuários na _view_ `users` (considerando que cada usuário terá um Nome, Sobrenome, Email, Senha e ID da Função - conforme a tabela que criamos no nosso Banco de Dados).

``` js
const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/users')

router.get('/', controller.list)

module.exports = router
```

#### Controller users

Nesse momento, se estiver com o servidor 'rodando', verá que um erro é acusado. Isso ocorre por que ainda não criamos nosso _controller_ `users` . Faremos isso agora mesmo! Vamos criar o arquivo `./backend/controllers/users.js` e defini-lo dessa maneira:

``` js
const users = [{
        id: 1,
        nome: 'Fulano',
        sobrenome: 'de Tal',
        email: 'fulano@detal.com',
        senha: 'Senha123',
        id_funcao: 2
    },
    {
        id: 2,
        nome: 'Ciclano',
        sobrenome: 'Tal Qual',
        email: 'ciclano@talqual.com',
        senha: 'Senha123',
        id_funcao: 1
    }
]

const controller = {
    list: (req, res, next) => {
        res.render('users', {
            title: 'Página de Usuários',
            subtitle: 'Confira a seguir os usuários cadastrados em nosso banco de dados',
            users
        })
    }
}

module.exports = controller
```

Verá que esse _controller_ é muito semelhante ao `index` . As únicas diferenças são:

* Dessa vez o nome do método que criamos é `list`

* Ao invés de renderizarmos a _view_ `index`, vamos renderizar a _view_ `users` (que ainda precisamos criar)

* Além de `title` e `subtitle`, estamos passando uma terceira propriedade, chamada `users`. Essa propriedade tem como valor um _array_ de objetos, sendo cada um dos objetos uma representação dos usuários (com Nome, Sobrenome, Email, Senha e ID da Função - `nome`, `sobrenome`, `email`,  `senha` e `id_funcao`).

Esses usuários passados por código (_hard coded_) serão substituídos pelos usuários do banco, em breve. Antes precisamos criar a nossa nova _view_ `users` .

#### View users

Podemos duplicar o arquivo `./backend/views/index.ejs` e renomeá-lo como `users.ejs` .

Vamos apagar os parágrafos dentro da `main-section` e criar uma nova `section` com a classe `users` (que só aparecerá caso haja usuários enviados, senão deveremos mostrar uma mensagem dizendo que não há usuários cadastrados - usaremos uma condicional para criarmos essa condição).

Dentro dessa `section` , teremos uma `table` e, dentro dela, uma `tr` (_table row_) para cada usuário - mas faremos isso usando um _loop_, de forma que a _view_ mostre quantos usuários receber. Nossa _view_ ficará assim (por enquanto):

``` ejs
<%- include('partials/head') %>
<%- include('partials/header') %>
<main>
  <section class="main-section">
    <h2 class="main-section__title"><%= title %></h2>
    <h3 class="main-section__subtitle"><%= subtitle %></h3>
  </section>
  <% if(users && users.length > 0) { %>
    <section class="users">
      <table class="users__table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Email</th>
            <th>Senha</th>
            <th>Função</th>
            <th>Ver</th>
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          <% for(let user of users) { %>
          <tr id="user<%= user.id %>" class="user">
            <td class="user__id" data-title="ID"><%=user.id%></td>
            <td class="user__name" data-title="Nome"><%= user.nome %></td>
            <td class="user__lastname" data-title="Sobrenome"><%= user.sobrenome %></td>
            <td class="user__email" data-title="Email"><%= user.email %></td>
            <td class="user__pass" data-title="Senha"><%= user.senha %></td>
            <td class="user__function" data-title="Função"><%= user.id_funcao === 1 ? 'Admin' : 'Usuário Final' %></td>
            <td class="user__see">
              <form action="/users/<%= user.id %>" method="GET">
                <button class="user__see--btn">Ver</button>
              </form>
            </td>
            <td class="user__edit">
              <form action="/users/<%= user.id %>" method="GET">
                <input type="hidden" name="edit" value="edit">
                <button class="user__edit--btn">Editar</button>
              </form>
            </td>
            <td class="user__delete">
              <form action="/users/<%= user.id %>/delete" method="POST">
                <button class="user__delete--btn">Excluir</button>
              </form>
            </td>
          </tr>
          <% } %>
        </tbody>
      </table>
    </section>
  <% } else { %>
    <section>
      <h3>Ops... não encontramos registros em nosso banco de dados</h3>
    </section>
  <% } %>
</main>
<%- include('partials/footer') %>
```

Ok. Mas... agora nossa _view_ está poluída novamente! Então vamos criar um _template_ parcial apenas para a listagem de usuários.

Tudo o que precisamos fazer é mover o trecho referente à listagem de usuários para um arquivo `./backend/views/partials/users/list.ejs` e incluirmos o template parcial na _view_ de usuários. Teremos os arquivos assim:

**./backend/views/users.ejs**

``` ejs
<%- include('partials/head') %>
<%- include('partials/header') %>
<main>
  <section class="main-section">
    <h2 class="main-section__title"><%= title %></h2>
    <h3 class="main-section__subtitle"><%= subtitle %></h3>
  </section>
  <% if(users && users.length > 0) { %>
  <%- include('partials/users/list') %>
  <% } else { %>
  <section>
    <h3>Ops... não encontramos registros em nosso banco de dados</h3>
  </section>
  <% } %>
</main>
<%- include('partials/footer') %>
```

**./backend/views/partials/users/list.ejs**

``` ejs
<section class="users">
  <table class="users__table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Sobrenome</th>
        <th>Email</th>
        <th>Senha</th>
        <th>Função</th>
        <th>Ver</th>
        <th>Editar</th>
        <th>Excluir</th>
      </tr>
    </thead>
    <tbody>
      <% for(let user of users) { %>
      <tr id="user<%= user.id %>" class="user">
        <td class="user__id" data-title="ID"><%=user.id%></td>
        <td class="user__name" data-title="Nome"><%= user.nome %></td>
        <td class="user__lastname" data-title="Sobrenome"><%= user.sobrenome %></td>
        <td class="user__email" data-title="Email"><%= user.email %></td>
        <td class="user__pass" data-title="Senha"><%= user.senha %></td>
        <td class="user__function" data-title="Função"><%= user.id_funcao === 1 ? 'Admin' : 'Usuário Final' %></td>
        <td class="user__see">
          <form action="/users/<%= user.id %>" method="GET">
            <button class="user__see--btn">Ver</button>
          </form>
        </td>
        <td class="user__edit">
          <form action="/users/<%= user.id %>" method="GET">
            <input type="hidden" name="edit" value="edit">
            <button class="user__edit--btn">Editar</button>
          </form>
        </td>
        <td class="user__delete">
          <form action="/users/<%= user.id %>/delete" method="POST">
            <button class="user__delete--btn">Excluir</button>
          </form>
        </td>
      </tr>
      <% } %>
    </tbody>
  </table>
</section>
```

#### Estilo Listagem users

E precisamos estilizar essa nossa tabela, concorda? Podemos acrescentar o seguinte estilo ao nosso `./backend/public/stylesheets/style.css` :

``` css
.users__table {
    font-weight: bold;
    margin: 24px auto;
}

.users__table th,
.users__table td {
    padding: 6px 12px;
}

.users__table td {
    display: block;
}

.users__table td:not(:nth-child(n+7))::before {
    content: attr(data-title) ": ";
    font-weight: bolder;
}

.users__table thead {
    background-color: var(--azul);
    color: var(--branco);
}

.users__table thead tr th:first-child {
    color: transparent;
    font-size: 0;
}

.users__table thead tr th:first-child::before {
    color: var(--branco);
    content: 'Usuários';
    font-size: 16px;
}

.users__table thead tr th:not(:first-child) {
    display: none;
}

.users__table tbody tr td:last-child {
    border-bottom: 1px solid var(--cinza);
    margin-bottom: 16px;
    padding-bottom: 16px;
}

.users__table [class*="--btn"] {
    border: none;
    display: inline-block;
    font-weight: bolder;
    text-align: center;
    margin: auto;
    padding: 6px 12px;
}

.users__table [class*="--btn"]:hover {
    cursor: pointer;
}

.users__table .user__see--btn {
    background-color: var(--azul);
    color: var(--branco);
}

.users__table .user__see--btn:hover {
    background-color: var(--chumbo);
    color: var(--azul);
}

.users__table .user__edit--btn {
    background-color: var(--amarelo);
    color: var(--chumbo);
}

.users__table .user__edit--btn:hover {
    background-color: var(--chumbo);
    color: var(--amarelo);
}

.users__table .user__delete--btn {
    background-color: var(--vermelho);
    color: var(--branco);
}

.users__table .user__delete--btn:hover {
    background-color: var(--chumbo);
    color: var(--vermelho);
}

@media screen and (min-width: 984px) {

    .users__table td {
        display: table-cell;
    }

    .users__table td:not(:nth-child(n+7))::before {
        content: none;
    }

    .users__table thead tr th:first-child {
        color: var(--branco);
        font-size: initial;
    }

    .users__table thead tr th:first-child::before {
        content: none;
    }

    .users__table thead tr th:not(:first-child) {
        display: table-cell;
    }

    .users__table tbody tr td:last-child {
        border-bottom: none;
        margin-bottom: auto;
        padding-bottom: 6px;
    }
}
```

### Usuário

**Branch:** [feature/project-base](https://github.com/Marcelo-Diament/sequelize-aula-01/tree/feature/project-base)

Vamos criar o contexto de leitura de um usuário único, incluindo uma rota específica que recebe seu ID e um método no _controller_ de usuários.

**./backend/controllers/users.js**

``` js
index: (req, res, next) => {
    const {
        id
    } = req.params
    res.render('users', {
        title: 'Página de Usuário',
        subtitle: `Confira a seguir o usuário de id ${id}`,
        users: [users[id - 1]]
    })
}
```

_No caso estamos forçando a entrega do usuário único como um array para podermos reaproveitar a view users._

**./backend/routes/users.js**

``` js
router.get('/:id', controller.index)
```

### Cadastro de Usuário

**Branch:** [feature/project-base](https://github.com/Marcelo-Diament/sequelize-aula-01/tree/feature/project-base)

Vamos criar uma _partial view_, um _controller_ e uma rota para a adição de usuário.

**./backend/controllers/users.js**

``` js
addUser: async (req, res, next) => {
    res.render('addUser', {
        title: 'Página de Registro de Usuário',
        subtitle: 'Preencha o formulário e cadastre-o clicando em \'Adicionar Usuário\''
    })
}
```

**./backend/routes/users.js**

``` js
router.get('/add', controller.addUser)
```

**./backend/views/addUser.ejs**

``` ejs
<%- include('partials/head') %>
<%- include('partials/header') %>
<main>
  <section class="main-section">
    <h2 class="main-section__title"><%= title %></h2>
    <h3 class="main-section__subtitle"><%= subtitle %></h3>
  </section>
  <%- include('partials/users/register') %>
</main>
<%- include('partials/footer') %>
```

**./backend/views/partials/users/register.ejs**

``` ejs
<section id="addUserSection" class="register-user">
  <form action="/users" method="POST" class="form">
    <div class="form__input-container">
      <label for="nome">Nome</label>
      <input type="text" name="nome" id="nome" required placeholder="Benedito">
    </div>
    <div class="form__input-container">
      <label for="sobrenome">Sobrenome</label>
      <input type="text" name="sobrenome" id="sobrenome" required placeholder="Calixto">
    </div>
    <div class="form__input-container">
      <label for="email">Email</label>
      <input type="email" name="email" id="email" required placeholder="bene@dito.com">
    </div>
    <div class="form__input-container">
      <label for="senha">Senha</label>
      <input type="password" name="senha" id="senha" required placeholder="Senha123">
    </div>
    <div class="form__btns">
      <button>Adicionar Usuário</button>
    </div>
  </form>
</section>
```

Para simularmos a adição do novo usuário, vamos incluir mais um método no _controller_ e mais uma rota:

**./backend/controllers/users.js**

``` js
register: async (req, res, next) => {
    const newUser = req.body
    newUser.id_funcao = 1
    newUser.id = users.length + 1
    res.render('users', {
        title: 'Usuário Cadastrado com Sucesso!',
        subtitle: 'Retorno fictício, ainda não adicionamos nenhum usuário',
        users: [...users, newUser]
    })
}
```

**./backend/routes/users.js**

``` js
router.post('/', controller.register)
```

E vamos atualizar o estilo também.

**./backend/public/stylesheets/style.css**

``` css
.register-user {
    display: block;
    margin: 16px auto;
}

.register-user__title {
    font-size: 24px;
}

.register-user__subtitle {
    color: var(--chumbo);
    font-size: 20px;
}

.register-user .form {
    margin: 24px auto;
    min-width: max-content;
    width: 25vw;
}

.register-user .form__input-container {
    display: block;
    margin: 16px auto;
}

.register-user .form__input-container label {
    color: var(--chumbo);
}

.register-user .form__input-container input {
    display: block;
    max-width: calc(100vw - 64px);
    padding: 4px 8px;
    width: -webkit-fill-available;
}

.form__btns {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
}

.form__btns button {
    background-color: var(--azul);
    border: none;
    color: var(--branco);
    display: inline-block;
    font-weight: bolder;
    text-align: center;
    margin: 8px 0;
    padding: 8px 16px;
}

.form__btns button:hover {
    background-color: var(--chumbo);
    color: var(--branco);
    cursor: pointer;
}
```

### Edição de Usuário

**Branch:** [feature/project-base](https://github.com/Marcelo-Diament/sequelize-aula-01/tree/feature/project-base)

Vamos criar uma _partial view_, um _controller_ e uma rota para a edição de usuário.

**./backend/views/editUser.ejs**

``` ejs
<%- include('partials/head') %>
<%- include('partials/header') %>
<main>
  <section class="main-section">
    <h2 class="main-section__title"><%= title %></h2>
    <h3 class="main-section__subtitle"><%= subtitle %></h3>
  </section>
  <%- include('partials/users/update') %>
</main>
<%- include('partials/footer') %>
```

**./backend/views/partials/users/update.ejs**

``` ejs
<section id="editUserSection" class="edit-user">
  <form action="" method="POST" class="form">
    <div class="form__input-container">
      <label for="nome">Nome</label>
      <input type="text" name="nome" id="nome" required placeholder="Benedito" value="<%= user.nome %>">
    </div>
    <div class="form__input-container">
      <label for="sobrenome">Sobrenome</label>
      <input type="text" name="sobrenome" id="sobrenome" required placeholder="Calixto" value="<%= user.sobrenome %>">
    </div>
    <div class="form__input-container">
      <label for="email">Email</label>
      <input type="email" name="email" id="email" required placeholder="bene@dito.com" value="<%= user.email %>">
    </div>
    <div class="form__input-container">
      <label for="senha">Senha</label>
      <input type="password" name="senha" id="senha" required placeholder="Senha123" value="<%= user.senha %>">
    </div>
    <div class="form__btns">
      <button>Editar Usuário</button>
    </div>
  </form>
</section>
```

**./backend/controllers/users.js - index**

``` js
index: (req, res, next) => {
    const {
        id
    } = req.params
    return req.query.edit === 'edit' ?
        res.render('editUser', {
            title: 'Página de Usuário',
            subtitle: `Confira a seguir o usuário de id ${id}`,
            user: users[id - 1]
        }) :
        res.render('users', {
            title: 'Página de Usuário',
            subtitle: `Confira a seguir o usuário de id ${id}`,
            users: [users[id - 1]]
        })
}
```

**./backend/controllers/users.js - update**

``` js
update: async (req, res, next) => {
    const {
        id
    } = req.params, {
        nome,
        sobrenome,
        email
    } = req.body
    users[id - 1].nome = nome
    users[id - 1].sobrenome = sobrenome
    users[id - 1].email = email
    res.render('users', {
        title: 'Usuário Cadastrado com Sucesso!',
        subtitle: 'Retorno fictício, não editamos nenhum usuário',
        users
    })
}
```

**./backend/routes/users.js**

``` js
router.post('/:id', controller.update)
```

**./public/stylesheets/style.css**

``` css
.register-user,
.edit-user {
    display: block;
    margin: 16px auto;
}

.register-user__title,
.edit-user__title {
    font-size: 24px;
}

.register-user__subtitle,
.edit-user__subtitle {
    color: var(--chumbo);
    font-size: 20px;
}

.register-user .form,
.edit-user .form {
    margin: 24px auto;
    min-width: max-content;
    width: 25vw;
}

.register-user .form__input-container,
.edit-user .form__input-container {
    display: block;
    margin: 16px auto;
}

.register-user .form__input-container label,
.edit-user .form__input-container label {
    color: var(--chumbo);
}

.register-user .form__input-container input,
.edit-user .form__input-container input {
    display: block;
    max-width: calc(100vw - 64px);
    padding: 4px 8px;
    width: -webkit-fill-available;
}
```

### Exclusão de Usuário

**Branch:** [feature/project-base](https://github.com/Marcelo-Diament/sequelize-aula-01/tree/feature/project-base)

Vamos criar um _controller_ e uma rota para a exclusão de usuário.

**./backend/controllers/users.js**

``` js
delete: async (req, res, next) => {
    const {
        id
    } = req.params
    res.render('users', {
        title: 'Usuário Excluído com Sucesso!',
        subtitle: 'Retorno fictício, não excluímos nenhum usuário',
        users: users.filter(user => user.id != id)
    })
}
```

**./backend/routes/users.js**

``` js
router.post('/:id/delete', controller.delete)
```

___

> Aqui começa de fato nossa prática! Então se preferir, baixe o zip da release 0.0.0 e comece a partir daqui

___

## v1.0.0 | Conexão com o Banco de Dados

**Branch:** [feature/db-connection](https://github.com/Marcelo-Diament/sequelize-aula-02/tree/feature/db-connection)

Em nosso _controller_ de usuários, basta adicionarmos o seguinte trecho (logo no início do arquivo):

``` js
const Sequelize = require('sequelize'),
    config = require('../config/database'),
    db = new Sequelize(config)
```

Claro, isso desde que já tenha concluído as seguintes etapas:

* Criar o arquivo `./backend\config\database.js`:

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

* Criar o arquivo `./backend/.sequelizerc`:

``` js
const path = require('path')

module.exports = {
    'config': path.resolve('config', 'database.js')
}
```

## v1.1.0 | Criação do Model Usuário

**Branch:** [feature/db-connection](https://github.com/Marcelo-Diament/sequelize-aula-02/tree/feature/db-connection)

O _model_ (**M** do **MVC**) representa a tabela que temos no nosso banco de dados - no caso, `ususarios` . Normalmente nomeamos nosso _model_ no singular e com a primeira letra maiúscula (conforme nomenclatura de classes, já que estamos trabalhando com um ORM - _Object Relational Mapping_).

### Iniciando os models

Precisamos gerar a pasta `./backend/models` e um arquivo `index.js` que será criado dentro dela. Para isso usaremos o _npm_ (com o comando `npx` ) ou o _yarn_ (com o comando `yarn` ):

``` sh
npx sequelize init:models
```

### Caminho dos models

Então vamos incluir a informação acerca de _models_ (qual sua pasta) no `./backend/.sequelizerc` :

``` js
const path = require('path')

module.exports = {
    'config': path.resolve('config', 'database.js'),
    'models': path.resolve('models')
}
```

### Model Usuario

Agora chegou a hora de representarmos a tabela `usuarios` através do nosso _model_ `Usuario` . Dentro da pasta `./backend/models` vamos criar o arquivo `Usuario.js` (no singular e com a primeira letra maiúscula). Nesse arquivo mapearemos os atributos de nossa tabela e as _constraints_ de cada atributo.

``` js
module.exports = (sequelize, DataType) => {
    const Usuario = sequelize.define('Usuario', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataType.STRING,
            allowNull: false
        },
        sobrenome: {
            type: DataType.STRING,
            allowNull: false
        },
        email: {
            type: DataType.STRING,
            allowNull: false
        },
        senha: {
            type: DataType.STRING,
            allowNull: false
        },
        id_funcao: {
            type: DataType.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'usuarios',
        timestamps: false
    })

    return Usuario
}
```

Por padrão, o Sequelize interpreta o nome da tabela (no Banco de Dados) como o nome do _model_ no plural (acrescentando um `s` ). No entanto estamos declarando essa propriedade apenas para sabermos que podemos configurar isso.

O mesmo ocorre com o campo ID - não precisaríamos declará-lo, pois por padrão o Sequelize já considera uma _primary key_ com o atributo ID.

Outro ponto importante é que o Sequelize cria os campos de _timestamp_ (_createdAt_ e _updatedAt_). Como não temos esses campos em nossa tabela, manteremos a propriedade como `false` .

Por fim, no arquivo `./backend/models/index.js` , precisamos atualizar a linha que faz referência ao arquivo de configuração:

``` js
const config = require('../config/database.js');
```

Está feito! Agora podemos partir para a manipulação dos registros! =)

## v1.2.0 | Listar Um Usuário (findOne)

**Branch:** [feature/list-single-user](https://github.com/Marcelo-Diament/sequelize-aula-02/tree/feature/list-single-user)

Vamos atualizar nosso _controller_ para lermos um registro único de nosso banco.

No _controller_ de usuários vamos chamar nosso _model_ `Usuario` e depois atualizar o método `index` da seguinte maneira:

``` js
const {
    Usuario
} = require('../models')
```

E nosso método `index` :

``` js
index: async (req, res, next) => {
    const {
        id
    } = req.params,
        user = await Usuario.findOne({
            where: {
                id
            }
        })
    if (user) {
        return req.query.edit === 'edit' ?
            res.render('editUser', {
                title: `Página de Edição do Usuário ${user.nome} ${user.sobrenome}`,
                subtitle: `Confira a seguir o usuário #${id} | ${user.nome} ${user.sobrenome}`,
                user
            }) :
            res.render('users', {
                title: `Página de Visualização do Usuário ${user.nome} ${user.sobrenome}`,
                subtitle: `Confira a seguir o usuário #${id} | ${user.nome} ${user.sobrenome}`,
                users: [user]
            })
    } else {
        res.status(500).send(`Ops... houve algum erro ao buscar pelo usuário de id ${id}`)
    }
}
```

## v1.3.0 | Listar Todos os Usuários (findAll)

**Branch:** [feature/list-all-users](https://github.com/Marcelo-Diament/sequelize-aula-02/tree/feature/list-all-users)

Agora iremos listar todos os usuários. Bem simples - vamos atualizar nosso método `list` no _controller_ de usuários:

``` js
list: async (req, res, next) => {
    const users = await Usuario.findAll()
    res.render('users', {
        title: 'Página de Usuários',
        subtitle: 'Confira a seguir os usuários cadastrados em nosso banco de dados',
        users
    })
}
```

Perceba que novamente estamos usando o `async/await` . Isso pois não sabemos quanto tempo demorará para recebermos o retorno de nossa _query_.

## v1.4.0 | Excluir um Usuário por seu ID (destroy)

**Branch:** [feature/delete-user](https://github.com/Marcelo-Diament/sequelize-aula-02/tree/feature/delete-user)

Para excluir um usuário, tudo o que precisamos fazer é usar o _model query_ `destroy` no método `delete` do _controller_ de usuários - passando seu ID (não queremos aplicar um `DELETE` sem `WHERE` hehehe).

``` js
delete: async (req, res, next) => {
    const {
        id
    } = req.params
    const user = await Usuario.destroy({
        where: {
            id
        }
    })
    if (user) {
        res.redirect('/users')
    } else {
        res.status(500).send('Ops... Algo de errado não deu certo!')
    }
}
```

## v1.5.0 | Adicionar um Usuário (create)

**Branch:** [feature/create-user](https://github.com/Marcelo-Diament/sequelize-aula-02/tree/feature/create-user)

Para adicionar um usuário, usaremos o _model query_ `create` no método `register` do _controller_ de usuários:

``` js
register: async (req, res, next) => {
    const {
        nome,
        sobrenome,
        email,
        senha
    } = req.body,
        id_funcao = email.indexOf('@diament.com.br') === -1 ? 2 : 1,
        user = await Usuario.create({
            nome,
            sobrenome,
            email,
            senha,
            id_funcao
        })
    if (user) {
        res.redirect('/users')
    } else {
        res.status(500).send('Ops... Algo de errado não deu certo!')
    }
}
```

Vale ressaltar dois pontos:

1. Não estamos fazendo nenhum tipo de tratamento na senha (como um _hash_ com o `BCrypt`, por exemplo - faremos isso mais adiante). Jamais faça isso num site real, em um ambiente de produção.

2. Estamos validando se o usuário é administrador ou não a partir do domínio do email (se possui `@diament.com.br`), mas há outras maneiras mais sofisticadas de realizarmos tal validação (por exemplo, no momento de um cadastro feito por um administrador).

## v1.6.0 | Editar um Usuário (update)

**Branch:** [feature/edit-user](https://github.com/Marcelo-Diament/sequelize-aula-02/tree/feature/edit-user)

Para editar um usuário, vamos utilizar o _model query_ `update` no método de mesmo nome do _controller_ de usuários:

``` js
update: async (req, res, next) => {
    const {
        id
    } = req.params, {
            nome,
            sobrenome,
            email,
            senha
        } = req.body,
        id_funcao = email.indexOf('@diament.com.br') === -1 ? 2 : 1,
        user = await Usuario.update({
            nome,
            sobrenome,
            email,
            senha,
            id_funcao
        }, {
            where: {
                id
            }
        })
    if (user) {
        res.redirect('/users')
    } else {
        res.status(500).send('Ops... Algo de errado não deu certo!')
    }
}
```

## v1.6.1 | Limpando o Controller Users

**Branch:** [feature/clean-controller](https://github.com/Marcelo-Diament/sequelize-aula-02/tree/feature/clean-controller)

Vamos remover o _array_ `users` e as _consts_ `db` , `config` e `Sequelize` do nosso _controller_. O _controller_ limpo ficará assim:

``` js
const {
    Usuario
} = require('../models')

const controller = {
    list: async (req, res, next) => {
        const users = await Usuario.findAll()
        res.render('users', {
            title: 'Página de Usuários',
            subtitle: 'Confira a seguir os usuários cadastrados em nosso banco de dados',
            users
        })
    },
    index: async (req, res, next) => {
        const {
            id
        } = req.params,
            user = await Usuario.findOne({
                where: {
                    id
                }
            })
        if (user) {
            return req.query.edit === 'edit' ?
                res.render('editUser', {
                    title: `Página de Edição do Usuário ${user.nome} ${user.sobrenome}`,
                    subtitle: `Confira a seguir o usuário #${id} | ${user.nome} ${user.sobrenome}`,
                    user
                }) :
                res.render('users', {
                    title: `Página de Visualização do Usuário ${user.nome} ${user.sobrenome}`,
                    subtitle: `Confira a seguir o usuário #${id} | ${user.nome} ${user.sobrenome}`,
                    users: [user]
                })
        } else {
            res.status(500).send(`Ops... houve algum erro ao buscar pelo usuário de id ${id}`)
        }
    },
    addUser: async (req, res, next) => {
        res.render('addUser', {
            title: 'Página de Registro de Usuário',
            subtitle: 'Preencha o formulário e cadastre-o clicando em \'Adicionar Usuário\''
        })
    },
    register: async (req, res, next) => {
        const {
            nome,
            sobrenome,
            email,
            senha
        } = req.body,
            id_funcao = email.indexOf('@diament.com.br') === -1 ? 2 : 1,
            user = await Usuario.create({
                nome,
                sobrenome,
                email,
                senha,
                id_funcao
            })
        if (user) {
            res.redirect('/users')
        } else {
            res.status(500).send('Ops... Algo de errado não deu certo!')
        }
    },
    update: async (req, res, next) => {
        const {
            id
        } = req.params, {
                nome,
                sobrenome,
                email,
                senha
            } = req.body,
            id_funcao = email.indexOf('@diament.com.br') === -1 ? 2 : 1,
            user = await Usuario.update({
                nome,
                sobrenome,
                email,
                senha,
                id_funcao
            }, {
                where: {
                    id
                }
            })
        if (user) {
            res.redirect('/users')
        } else {
            res.status(500).send('Ops... Algo de errado não deu certo!')
        }
    },
    delete: async (req, res, next) => {
        const {
            id
        } = req.params,
            user = await Usuario.destroy({
                where: {
                    id
                }
            })
        if (user) {
            res.redirect('/users')
        } else {
            res.status(500).send('Ops... Algo de errado não deu certo!')
        }
    }
}

module.exports = controller
```

## v1.7.0 | Busca de Usuários

**Branch:** [feature/user-search](https://github.com/Marcelo-Diament/sequelize-aula-02/tree/feature/user-search)

Bora deixar o projeto mais elegante? Que tal incluirmos uma busca?

### Rota de Busca

Vamos incluir uma rota para podermos chamar uma busca por nome, sobrenome ou função ( `id_funcao` ).

``` js
router.get('/search/:searchParam/:searchValue', controller.search)
```

### Controller

Precisamos importar o `sequelize` e uma _feature_ do Sequelize chamada `Op` - que nos permite usar operadores em nossas _queries_.

``` js
const Sequelize = require('sequelize'),
    {
        Usuario
    } = require('../models'),
    {
        Op
    } = Sequelize
```

E então criar o método `search` :

``` js
search: async (req, res, next) => {
    const {
        searchParam,
        searchValue
    } = req.params,
        whereClause = {}
    whereClause[searchParam] = {
        [Op.like]: `%${searchValue}%`
    }
    const users = await Usuario.findAll({
            where: whereClause
        })
        .catch(function(err) {
            res.status(400).send(`<main><h1>Ops... por favor, verifique sua busca.</h1><div><b>Erro 400 | Bad Request: </b><pre>${err}</pre></div></main>`)
        })
    if (users) {
        res.render('users', {
            title: 'Página de Usuários',
            subtitle: 'Confira a seguir os usuários cadastrados em nosso banco de dados',
            users
        })
    } else {
        res.status(500).send(`Ops... houve algum erro em nossa busca`)
    }
}
```

> Nota importante: estamos criando nosso operador `LIKE` de forma mais genérica (assim podemos enviar tanto o parâmetro quanto o valor via `req.params` sem criar condições para que tipo de parâmetro de busca será usado).

Como sabemos, o `%` é um símbolo coringa, ou seja, nossa busca retornará qualquer resultado que contenha a string enviada como parte de seu valor. Se quisermos resultados exatos, podemos remover esses símbolos do início e final do `searchValue` .

Perceba, ainda, que estamos usando um `catch` para tratarmos buscar 'mal feitas', como buscas por parâmetros inexistentes. =)

Ok - testamos e está tudo funcionando. Agora vamos melhorar essa busca - incluir um formulário no topo do site, controlar seu comportamento por JS puro e permitir uma busca mais fluída.

### Formulário (view)

Vamos criar um _partial view_ no novo arquivo `./backend/views/partials/users/search.ejs` .

``` ejs
<section id="searchUserSection" class="search-user">
  <form action="/users/search/" method="POST" class="form">
    <div class="form__input-container search-param">
      <label for="searchParam">Buscar por</label>
      <select name="searchParam" id="searchParam">
        <option value="" disabled selected>Selecione um parâmetro</option>
        <option value="id">ID</option>
        <option value="nome">Nome</option>
        <option value="sobrenome">Sobrenome</option>
        <option value="email">Email</option>
        <option value="id_funcao">Função</option>
      </select>
    </div>
    <div class="form__input-container search-value">
      <label for="searchValue">Valor buscado</label>
      <input type="text" name="searchValue" id="searchValue" required placeholder="Calixto">
      <select name="searchRole" id="searchRole" class="hidden">
        <option value="" disabled selected>Selecione um valor</option>
        <option value="1">Admin</option>
        <option value="2">Usuário Final</option>
      </select>
    </div>
    <div class="form__btns">
      <button>Buscar Usuário</button>
    </div>
  </form>
</section>
```

E vamos incluir esse formulário logo após o `header` :

``` ejs
<%- include('users/search') %>
```

Por fim, como vamos tratá-lo com JS puro, vamos incluir nosso _script_ (ainda não criado) no `footer` :

``` ejs
<script src="/javascripts/main.js"></script>
```

Também vamos criar um estilo para a classe `hidden` , para podermos partir para o _script_ JS:

``` css
.hidden {
    background-color: transparent;
    color: transparent;
    height: 0;
    line-height: 0;
    margin: 0;
    max-height: 0;
    max-width: 0;
    opacity: 0;
    padding: 0;
    visibility: hidden;
    width: 0;
}
```

### Main JS Script

Agora vamos criar nosso _script_. O primeiro passo é garantirmos que a `window` já foi carregada. Também criaremos uma fução `init` para controlarmos as demais funções.

Em seguida, nossos objetivos são:

1. Alterar o segundo campo (referente ao valor do parâmetro buscado) de acordo com o primeiro campo (parâmetro buscado). Ou seja, se o usuário quiser selecionar o parâmetro como `id_funcao`, precisamos dar a ele as possíveis opções. Vale pontuar que isso ainda está _hard coded_, ou seja, não estamos puxando as opções do banco de dados, mas incluindo pelo próprio _front end_.

2. Alterar a visibilidade do _input_ do valor buscado de acordo com a seleção do primeiroparâmetro. Se o parâmetro for `id_funcao`, vamos deixar esse _input_ com o `type` _hidden_ - assim poderemos continuar pegando o valor da mesma origem, mas sem exibi-lo na tela.

3. Daí nosso terceiro objetivo: popular o valor do _input_ (no cenário da busca por `id_funcao`) de acordo com a escolha no `select` de `id_funcao`.

4. Por fim, precisamos atualizar o atributo `action` do formulário conforme as escolhas feitas.

Mãos à obra!

``` js
window.onload = () => {
    const handleSearchForm = () => {
        const searchForm = document.querySelector('#searchUserSection form'),
            searchParamSelect = searchForm.querySelector('.search-param select'),
            searchValueInput = searchForm.querySelector('.search-value input'),
            searchRole = searchForm.querySelector('.search-value #searchRole')

        const showInputSearch = () => {
            searchValueInput.value = ''
            searchValueInput.setAttribute('type', 'text') !searchRole.classList.contains('hidden') && searchRole.classList.add('hidden')
        }

        const hideInputSearch = () => {
            searchValueInput.setAttribute('type', 'hidden')
            searchRole.classList.contains('hidden') && searchRole.classList.remove('hidden')
            searchRole.onchange = () => searchValueInput.value = searchRole.value
        }

        const toggleInputSearch = () => searchParamSelect.value === 'id_funcao' ? hideInputSearch() : showInputSearch()

        const updateSearchFormAction = () => searchForm.setAttribute('action', `/users/search/${searchParamSelect.value}/${searchValueInput.value}`)

        searchParamSelect.onchange = () => toggleInputSearch()

        searchForm.onsubmit = () => {
            event.preventDefault()
            updateSearchFormAction()
            searchForm.submit()
        }
    }

    const init = () => {
        handleSearchForm()
    }

    init()

}
```

### Atualizando a Rota

Vamos atualizar a rota da seguinte maneira:

``` js
router.post('/search/:searchParam/:searchValue', controller.search)
```

### Atualizando o Controller

Por fim, atualizaremos o _controller_! Simplesmente trocaremos a captura dos dados de `req.params` para `req.body` , já que trocamos o método do formulário para `POST` :

``` js
search: async (req, res, next) => {
    const {
        searchParam,
        searchValue
    } = await req.body,
        whereClause = {}
    whereClause[searchParam] = {
        [Op.like]: `%${searchValue}%`
    }
    const users = await Usuario.findAll({
            where: whereClause
        })
        .catch(function(err) {
            res.status(400).send(`<main><h1>Ops... por favor, verifique sua busca.</h1><div><b>Erro 400 | Bad Request: </b><pre>${err}</pre></div></main>`)
        })
    if (users) {
        res.render('users', {
            title: 'Página de Resultado de Usuários',
            subtitle: 'Confira a seguir os usuários encontrados em nosso banco de dados',
            users
        })
    } else {
        res.status(500).send(`Ops... houve algum erro em nossa busca`)
    }
}
```

### Estilo

Opa! Vamos deixar esse formulário bonito né!

``` css
#searchUserSection {
    background-color: var(--cinza);
    padding: 16px;
}

#searchUserSection form {
    align-items: stretch;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    min-height: 45px;
}

#searchUserSection form .form__input-container {
    display: flex;
    flex-flow: column nowrap;
    margin-bottom: 16px;
}

#searchUserSection form .form__input-container label {
    color: var(--chumbo);
}

#searchUserSection form .form__input-container input,
#searchUserSection form .form__input-container select:not(.hidden) {
    margin: 0;
    padding: 4px 8px;
}

#searchUserSection form .form__btns button {
    margin: 8px 0 0;
}

@media only screen and (min-width: 640px) {
    /* Além do header que já está nessa media query */

    #searchUserSection {
        max-height: 80px;
    }

    #searchUserSection form {
        align-items: center;
        flex-flow: row nowrap;
        justify-content: flex-end;
        min-height: 45px;
    }

    #searchUserSection form .form__input-container {
        margin-right: 16px;
        margin-bottom: 0;
    }

    #searchUserSection form .form__input-container input.search-param,
    #searchUserSection form .form__input-container input.search-value,
    #searchUserSection form .form__input-container select#searchRole {
        min-width: 196px;
        width: 196px;
    }
}
```

## v1.8.0 | Ordenação

**Branch:** [feature/order-by](https://github.com/Marcelo-Diament/sequelize-aula-02/tree/feature/order-by)

Que tal aprender como ordenar a listagem de usuários?

Bom, vamos considerar que receberemos um `req.query` indicando tanto o parâmetro de ordenação ( `id` , `nome` ...) quanto a ordenação em si ( `ASC` ou `DESC` ) - separados por um `_` . Exemplo: `...?orderBy=nome_DESC` .

Precisaremos então capturar esses valores e inclui-los como argumentos de uma opção que a _query_ `findAll()` nos dá (vamos deixar a ordenação por ID ascendente como _default_):

``` js
list: async (req, res, next) => {
    const {
        orderBy = 'id_ASC'
    } = req.query,
        orderParam = orderBy.split('_')[0],
        orderDirection = orderBy.split('_')[1]
    const users = await Usuario.findAll({
        order: [
            [orderParam, orderDirection]
        ]
    })
    res.render('users', {
        title: 'Página de Usuários',
        subtitle: 'Confira a seguir os usuários cadastrados em nosso banco de dados',
        users
    })
}
```

Como podemos utilizar esse mesmo esquema em outros métodos, vamos definir uma função que nos retorne o resultado esperado e simplesmente atrelar seu retorno à propriedade `order` (essa função deve ser declarada antes de declararmos o _controller_):

``` js
const orderResults = (orderByParam) => {
    const orderParam = orderByParam.split('_')[0],
        orderDirection = orderByParam.split('_')[1]
    return [
        [orderParam, orderDirection]
    ]
}
```

E agora vamos usar a função nos métodos `list` e `search` .

``` js
list: async (req, res, next) => {
    const {
        orderBy = 'id_ASC'
    } = req.query
    const users = await Usuario.findAll({
        order: orderResults(orderBy)
    })
    res.render('users', {
        title: 'Página de Usuários',
        subtitle: 'Confira a seguir os usuários cadastrados em nosso banco de dados',
        users
    })
}
```

Como antes `search` só era acessível via `POST` , teremos de fazer uma pré validação também e capturar via `req.params` e adicionar uma rota igual mas com o verbo `GET` .

### Rota

``` js
router.post('/search/:searchParam/:searchValue', controller.search)
router.get('/search/:searchParam/:searchValue', controller.search)
```

### Controller

``` js
search: async (req, res, next) => {
    let {
        searchParam,
        searchValue
    } = await req.body
    if (!searchParam || !searchValue) searchParam = await req.params.searchParam
    if (!searchValue) searchValue = await req.params.searchValue

    let whereClause = {}
    whereClause[searchParam] = {
        [Op.like]: `%${searchValue}%`
    }

    const {
        orderBy
    } = await req.query

    const users = await Usuario.findAll({
            where: whereClause,
            order: orderResults(orderBy)
        })
        .catch(function(err) {
            res.status(400).send(`<main><h1>Ops... por favor, verifique sua busca.</h1><div><b>Erro 400 | Bad Request: </b><pre>${err}</pre></div></main>`)
        })
    if (users) {
        res.render('users', {
            title: 'Página de Resultado de Usuários',
            subtitle: 'Confira a seguir os usuários encontrados em nosso banco de dados',
            users
        })
    } else {
        res.status(500).send(`Ops... houve algum erro em nossa busca`)
    }
}
```

### Views

Vamos adicionar uma opção para a ordenação dos registros.

**header.ejs**

Trocamos a inclusão de `search` por `controls` :

``` ejs
<header class="header">
  <h1 class="header__title">Sequelize #02 | Models e Queries</h1>
  <nav class="header__nav">
    <a href="/" target="_self" rel="next" title="Acessar página iniciar">Início</a>
    <a href="/users/add" target="_self" rel="next" title="Cadastrar usuário">Cadastro</a>
    <a href="/users" target="_self" rel="next" title="Ver listagem de usuários">Usuários</a>
    <a href="https://github.com/Marcelo-Diament/sequelize-aula-02" target="_blank" rel="author" title="Ver repositório">Repositório</a>
  </nav>
</header>
<%- include('users/controls') %>
```

**controls.ejs**

Trazemos a _tag_ que estava em `search` para esse novo _template_:

``` ejs
<section id="searchUserSection" class="search-user">
  <%- include('order') %>
  <%- include('search') %>
</section>
```

**search.ejs**

Simplesmente tiramos a _tag_ container `section` da _tag_ `form` (que foi trazida para `controls` ):

``` ejs
<form action="/users/search/" method="POST" class="form">
  <div class="form__input-container search-param">
    <label for="searchParam">Buscar por</label>
    <select name="searchParam" id="searchParam">
      <option value="" disabled selected>Selecione um parâmetro</option>
      <option value="id">ID</option>
      <option value="nome">Nome</option>
      <option value="sobrenome">Sobrenome</option>
      <option value="email">Email</option>
      <option value="id_funcao">Função</option>
    </select>
  </div>
  <div class="form__input-container search-value">
    <label for="searchValue">Valor buscado</label>
    <input type="text" name="searchValue" id="searchValue" required placeholder="Calixto">
    <select name="searchRole" id="searchRole" class="hidden">
      <option value="" disabled selected>Selecione um valor</option>
      <option value="1">Admin</option>
      <option value="2">Usuário Final</option>
    </select>
  </div>
  <div class="form__btns">
    <button>Buscar Usuário</button>
  </div>
</form>
```

**order.ejs**

Criamos um seletor já com um evento na _tag_ `select` do tipo `change` :

``` ejs
<div class="form__input-container order-by">
  <label for="orderBy">Ordenar por</label>
  <select name="orderBy" id="orderBy" onchange="location.search === '' ? location.search = '?orderBy=' + this.value : location.search.includes('orderBy=') ? location.search = location.search.split('orderBy=')[0] + 'orderBy=' + this.value : location.search += '&orderBy=' + this.value">
    <option value="" disabled selected>Ordernar por...</option>
    <option value="id_ASC">Mais Antigos</option>
    <option value="id_DESC">Mais Recentes</option>
    <option value="nome_ASC">Nome A-Z</option>
    <option value="nome_DESC">Nome Z-A</option>
    <option value="sobrenome_ASC">Sobrenome A-Z</option>
    <option value="sobrenome_DESC">Sobrenome Z-A</option>
    <option value="email_ASC">Email A-Z</option>
    <option value="email_DESC">Email Z-A</option>
  </select>
</div>
```

### Estilo

E atualizamos nosso estilo:

``` css
#searchUserSection {
    background-color: var(--cinza);
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    padding: 16px;
}

#searchUserSection .order-by.form__input-container,
#searchUserSection form .form__input-container {
    display: flex;
    flex-flow: column nowrap;
    margin-bottom: 16px;
}

#searchUserSection .order-by.form__input-container label,
#searchUserSection form .form__input-container label {
    color: var(--chumbo);
}

#searchUserSection .order-by.form__input-container select,
#searchUserSection form .form__input-container input,
#searchUserSection form .form__input-container select:not(.hidden) {
    margin: 0;
    padding: 4px 8px;
}

@media only screen and (min-width: 640px) {
    .header {
        flex-flow: row wrap;
    }

    #searchUserSection {
        flex-flow: row nowrap;
        max-height: 80px;
    }

    #searchUserSection form {
        align-items: center;
        flex-flow: row nowrap;
        justify-content: flex-end;
        min-height: 45px;
    }

    #searchUserSection .order-by.form__input-container,
    #searchUserSection form .form__input-container {
        margin-right: 16px;
        margin-bottom: 0;
    }

    #searchUserSection .order-by.form__input-container select,
    #searchUserSection form .form__input-container input.search-param,
    #searchUserSection form .form__input-container input.search-value,
    #searchUserSection form .form__input-container select#searchRole {
        min-width: 196px;
        width: 196px;
    }
}
```

## v1.9.0 | Paginação

**Branch:** [feature/pagination](https://github.com/Marcelo-Diament/sequelize-aula-02/tree/feature/pagination)

Temos inúmeros usuários registrados em nosso banco. Para melhorar a experiência do usuário, vamos criar uma paginação.

Precisaremos fazer algumas alterações em nosso _controller_, mas vamos começar pela _view_.

### Views

Vamos criar um _template_ parcial para o controle de paginação.

**./backend/views/partials/users/pagination.ejs**

``` ejs
<div class="pagination">
  <p class="current-page">Página <b><%= page %> de <%= pages %></b> | Exibindo <b><%= users.length %> de <%= total %></b> usuários encontrados</p>
  <nav class="pages">
    <% for(var i = 1; i <= pages; i++ ) { %>
    <a href="?page=<%= i %>&orderBy=<%= orderParam %>_<%= orderDirection %>" class="<% if(i == page) { %>pages__btn--selected<% } else { %>pages__btn<% } %>"><%= i %></a>
    <% } %>
  </nav>
</div>
```

Veja que estamos lidando com o parâmetro `orderBy` e também identificando se a página em que estamos corresponde com o item da página (para aplicarmos a classe `pages__btn--selected` ).

Agora precisamos inluir essa paginação na tela de usuários. Faremos isso antes e depois da tabela de usuários, no _template_ parcial `controls` :

**.backend/views/partials/users/controls.ejs**

``` ejs
<section id="searchUserSection" class="search-user">
  <%- include('order') %>
  <%- include('search') %>
</section>
<section id="listPaginationSection">
  <% if(pages && pages > 0) { %>
    <%- include('pagination') %>
  <% } %>
</section>
```

Nesse momento ocorrerá um erro no _front_ - não se preocupe. Isso ocorre pois ainda não estamos enviando a propriedade `pages` para a _view_.

### Controller e o método `findAndCountAll()`

O método `findAndCountAll()` é bem semelhante ao `findAll()` . Mas ele nos traz mais algumas informações (o `count` - total de registros retornados - e `rows` - o número de registros trazidos). Mas... como assim? Qual a diferença entre `count` e `rows` ?

Nós temos mais dois atributos - `limit` e `offset` . O `limit` define quantos registros serão retornados em cada `row` . E o `offset` diz a partir de qual índice os registros serão retornados (ex.: `limit` = 10 e `offset` = 4 | receberemos do quinto ao décimo quarto registro, considerando que o primeiro índice é zero).

Então definiremos o `limit` no próprio código (poderia ser dinâmico também) e o `offset` será o valor do índice página atual menos 1 vezes o limit. Para ficar mais claro:

* Se estivermos na página 1 e o `limit` for igual a 10, o `offset` deverá ser 0 (mostraremos os usuários do índice 0 ao 9): `(1 - 1) * 10 = 0`.

* Se estivermos na página 2 e o `limit` for igual a 10, o `offset` deverá ser 10 (mostraremos os usuários do índice 10 ao 19): `(2 - 1) * 10 = 10`.

* Se estivermos na página 3 e o `limit` for igual a 10, o `offset` deverá ser 20 (mostraremos os usuários do índice 20 ao 29): `(3 - 1) * 10 = 20`.

E assim por diante. Portanto, o `count` (chamaremos de `total` ) é o número total de registros. E `rows` corresponde aos registros dentro do `limit` considerando o `offset` (ex.: usuários de índice 0 ao 9).

Outro ponto importante: para passarmos o número total de páginas, usaremos uma função bem simples: `Math.ceil(total / limit)` . Basicamente estamos dividindo o número total de registros pelo número de registros exibidos a cada 'página' (paginação). E o trecho `Math.ceil` serve para arredondarmos para cima o resultado dessa divisão. Ou seja, se tivermos 35 usuários com `limit` igual a 10, teremos 4 páginas ( `35/10 = 3.5` , com a função `Math.ceil()` teremos 4 como retorno - 4 páginas para exibirmos 35 usuários de 10 em 10).

Vamos ver isso na prática!

**./backend/controllers/users.js - método list**

``` js
list: async (req, res, next) => {
    const {
        page = 1, limit = 10, orderBy
    } = await req.query,
        order = orderResults(orderBy)
    const {
        count: total,
        rows: users
    } = await Usuario.findAndCountAll({
        order,
        limit,
        offset: (page - 1) * limit
    })
    res.render('users', {
        title: 'Página de Usuários',
        subtitle: 'Confira a seguir os usuários cadastrados em nosso banco de dados',
        users,
        total,
        page,
        pages: Math.ceil(total / limit),
        orderParam: order[0][0],
        orderDirection: order[0][1]
    })
}
```

**./backend/controllers/users.js - método search**

``` js
search: async (req, res, next) => {
    let {
        searchParam,
        searchValue
    } = await req.body
    if (!searchParam || !searchValue) searchParam = await req.params.searchParam
    if (!searchValue) searchValue = await req.params.searchValue

    let whereClause = {}
    whereClause[searchParam] = {
        [Op.like]: `%${searchValue}%`
    }

    const {
        page = 1, limit = 10, orderBy
    } = await req.query,
        order = orderResults(orderBy)

    const {
        count: total,
        rows: users
    } = await Usuario.findAndCountAll({
            where: whereClause,
            order,
            limit,
            offset: (page - 1) * limit
        })
        .catch(function(err) {
            res.status(400).send(`<main><h1>Ops... por favor, verifique sua busca.</h1><div><b>Erro 400 | Bad Request: </b><pre>${err}</pre></div></main>`)
        })
    if (users) {
        res.render('users', {
            title: 'Página de Resultado de Usuários',
            subtitle: 'Confira a seguir os usuários encontrados em nosso banco de dados',
            users,
            total,
            page,
            pages: Math.ceil(total / limit),
            orderParam: order[0][0],
            orderDirection: order[0][1]
        })
    } else {
        res.status(500).send(`Ops... houve algum erro em nossa busca`)
    }
}
```

### Estilo

E agora só precisamos ajustar nosso estilo!

``` css
#listPaginationSection {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    padding: 16px;
}

#listPaginationSection .current-page {
    margin: 8px auto 8px 0;
}

#listPaginationSection .pages {
    margin: 8px auto;
    display: flex;
    flex-flow: row nowrap;
}

#listPaginationSection .pages__btn {
    background-color: var(--branco);
    border: 1px solid var(--azul);
    color: var(--azul);
    margin-right: 4px;
    margin-top: 8px;
    padding: 4px 8px;
}

.pages__btn--selected {
    background-color: var(--azul);
    border: 1px solid var(--azul);
    color: var(--branco);
    margin-right: 4px;
    margin-top: 8px;
    padding: 4px 8px;
}
```

## v1.9.1 | Hotfix: obj _pages_ na index.ejs

Na _view_ da nossa página principal existe um _bug_: não recebemos a propriedade `pages` na _view_ `partials/users/controls.ejs` - isso gera uma quebra no nosso _teplate_ e retorna um erro.

Isso acontece pois no método `index` (_controller_ de usuários) da rota 'raiz' nós chamamos a _view_ `index` que, por sua vez, chama a _view_ `header` , que inclui a _view_ `controls` . Para corrigirmos isso, usaremos o `locals` , que nos dá acesso às propriedades recebidas. Portanto, faremos uma condição para checarmos a propriedade `pages` :

**./backend\views\partials\header.ejs**

``` ejs
<% if (locals.pages) { %>
<%- include('users/controls') %>
<%}%>
```
