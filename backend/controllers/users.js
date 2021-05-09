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
    return req.query.edit === 'edit'
      ? res.render('editUser', {
        title: 'Página de Usuário',
        subtitle: `Confira a seguir o usuário de id ${id}`,
        user: users[id - 1]
      })
      : res.render('users', {
        title: 'Página de Usuário',
        subtitle: `Confira a seguir o usuário de id ${id}`,
        users: [users[id - 1]]
      })
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
  }
}

module.exports = controller