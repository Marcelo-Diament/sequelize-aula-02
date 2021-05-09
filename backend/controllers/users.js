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
  list: (req, res, next) => {
    res.render('users', {
      title: 'Página de Usuários',
      subtitle: 'Confira a seguir os usuários cadastrados em nosso banco de dados',
      users
    })
  },
  index: (req, res, next) => {
    const { id } = req.params
    res.render('users', {
      title: 'Página de Usuário',
      subtitle: `Confira a seguir o usuário de id ${id}`,
      users: [users[id - 1]]
    })
  }
}

module.exports = controller