const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Register
router.post("/register", async (req, res) => {
  //generate new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //create new user
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  }).then(function(){
    console.log("Usuario criado com sucesso !")
    res.status(200).json("Usuario criado com sucesso !")
  }).catch(function(err){
    console.log("Erro ao criar usuario: " + err)
    res.status(500).json(err)
  })
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({where: { email: req.body.email },});
    (user === null) && res.status(404).json("Usuario nao encontrado");

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("Senha incorreta")

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
