const Sequelize = require('sequelize')

const sequelize = new Sequelize('projeto','root','123456789',{
  host:'localhost',
  dialect:'mysql'
})

sequelize.authenticate().then(function(){
  console.log("Conectado com sucesso !!")
}).catch(function(err){
  console.log("Falha ao se conectar: " + err)
})

module.exports = {
  Sequelize: Sequelize, 
  sequelize: sequelize
}

