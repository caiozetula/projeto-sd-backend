const db = require('../db.js')

const PostSchema = db.sequelize.define("Post",{
    userId: {
      type: db.Sequelize.STRING,
      required: true,
    },
    desc: {
      type: db.Sequelize.TEXT,
    },
    img: {
      type: db.Sequelize.STRING,
    },
    likes: {
      type: db.Sequelize.JSON,
    },
})

//Executar 1 vez
//PostSchema.sync({force: true})

module.exports = PostSchema