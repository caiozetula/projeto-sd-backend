const db = require('../db.js')

const UserSchema = db.sequelize.define("User",{
    username: {
      type: db.Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: db.Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: db.Sequelize.STRING,
      allowNull: false,
    },
    profilePicture: {
      type: db.Sequelize.STRING,
      defaultValue: "",
    },
    coverPicture: {
      type: db.Sequelize.STRING,
      defaultValue: "",
    },
    followers: {
      type: db.Sequelize.JSON,
      defaultValue: {},
    },
    followings: {
      type: db.Sequelize.JSON,
      defaultValue: {},
    },
    isAdmin: {
      type: db.Sequelize.BOOLEAN,
      defaultValue: false,
    },
    desc: {
      type: db.Sequelize.STRING,
    },
    city: {
      type: db.Sequelize.STRING,
    },
    from: {
      type: db.Sequelize.STRING,
    },
    relationship: {
      type: db.Sequelize.INTEGER,
    },
});

//Executar 1 vez
//UserSchema.sync({force: true})

module.exports = UserSchema
