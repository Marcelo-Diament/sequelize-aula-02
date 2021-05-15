const Sequelize = require('sequelize'),
  { Usuario } = require('../models'),
  { Op } = Sequelize

const orderResults = (orderByParam = 'id_ASC') => {
  const orderParam = orderByParam.split('_')[0],
    orderDirection = orderByParam.split('_')[1]
  return [[orderParam, orderDirection]]
}

const controller = {
  list: async (req, res, next) => {
    const { page = 1, limit = 10, orderBy } = await req.query,
      order = orderResults(orderBy)
    const { count: total, rows: users } = await Usuario.findAndCountAll({
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
    const {
      nome,
      sobrenome,
      email,
      senha
    } = req.body,
      id_funcao = email.indexOf('@diament.com.br') === -1 ? 2 : 1,
      user = await Usuario.create({ nome, sobrenome, email, senha, id_funcao })
    if (user) {
      res.redirect('/users')
    } else {
      res.status(500).send('Ops... Algo de errado não deu certo!')
    }
  },
  update: async (req, res, next) => {
    const { id } = req.params,
      {
        nome,
        sobrenome,
        email,
        senha
      } = req.body,
      id_funcao = email.indexOf('@diament.com.br') === -1 ? 2 : 1,
      user = await Usuario.update({ nome, sobrenome, email, senha, id_funcao }, { where: { id } })
    if (user) {
      res.redirect('/users')
    } else {
      res.status(500).send('Ops... Algo de errado não deu certo!')
    }
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
  },
  search: async (req, res, next) => {
    let { searchParam, searchValue } = await req.body
    if (!searchParam || !searchValue) searchParam = await req.params.searchParam
    if (!searchValue) searchValue = await req.params.searchValue

    let whereClause = {}
    whereClause[searchParam] = { [Op.like]: `%${searchValue}%` }

    const { page = 1, limit = 10, orderBy } = await req.query,
      order = orderResults(orderBy)

    const { count: total, rows: users } = await Usuario.findAndCountAll({
      where: whereClause,
      order,
      limit,
      offset: (page - 1) * limit
    })
      .catch(function (err) {
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
}

module.exports = controller