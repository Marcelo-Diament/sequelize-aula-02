const Sequelize = require('sequelize'),
  config = require('../config/database'),
  db = new Sequelize(config),
  { Usuario } = require('../models')

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
}]

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
    const { id } = req.params,
      user = await Usuario.findOne({ where: { id } })
    if (user) {
      return req.query.edit === 'edit'
        ? res.render('editUser', {
          title: `Página de Edição do Usuário ${user.nome} ${user.sobrenome}`,
          subtitle: `Confira a seguir o usuário #${id} | ${user.nome} ${user.sobrenome}`,
          user
        })
        : res.render('users', {
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
    const newUser = req.body
    newUser.id_funcao = 1
    newUser.id = users.length + 1
    res.render('users', {
      title: 'Usuário Cadastrado com Sucesso!',
      subtitle: 'Retorno fictício, ainda não adicionamos nenhum usuário',
      users: [...users, newUser]
    })
  },
  update: async (req, res, next) => {
    const { id } = req.params,
      { nome, sobrenome, email } = req.body
    users[id - 1].nome = nome
    users[id - 1].sobrenome = sobrenome
    users[id - 1].email = email
    res.render('users', {
      title: 'Usuário Cadastrado com Sucesso!',
      subtitle: 'Retorno fictício, não editamos nenhum usuário',
      users
    })
  },
  delete: async (req, res, next) => {
    const { id } = req.params,
      user = await Usuario.destroy({
      where: { id }
    })
    if (user) {
      res.redirect('/users')
    } else {
      res.status(500).send('Ops... Algo de errado não deu certo!')
    }
  }
}

module.exports = controller