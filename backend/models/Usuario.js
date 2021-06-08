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
    },
    avatar: {
      type: DataType.STRING,
      allowNull: true
    }
  }, {
    tableName: 'usuarios',
    timestamps: false
  })

  return Usuario
}