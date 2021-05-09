const controller = {
  list: (req, res, next) => {
    res.render('users', {
      title: 'Página de Usuários',
      subtitle: 'Confira a seguir os usuários cadastrados em nosso banco de dados',
      users: [{
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
    })
  }
}

module.exports = controller