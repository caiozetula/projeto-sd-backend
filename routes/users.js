const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//update user
router.put("/:id", async (req, res) => {
  const search = await User.findByPk(req.params.id);
  if (search !== null) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      await User.upsert({
        id: req.params.id,
        ...req.body
      })
      res.status(200).json("Conta atualizada !!");
    } catch (err) {
      return res.status(500).json(err);
    }

  } else {
    return res.status(404).json("Usuario nao encontrado");
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  const search = await User.findByPk(req.params.id);
  if (search !== null) {
    try {
      await User.destroy({where: {id: req.params.id}});
      res.status(200).json("Conta deletada com sucesso !");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(404).json("Usuario nao encontrado");
  }
});

//get a user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    const { password, updatedAt, ...other } = user.dataValues;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//follow a user
//param segue o body
router.put("/:id/follow", async (req, res) => {
  const search = await User.findByPk(req.params.id);
  if (search !== null) {
    try {
      if(req.params.id === req.body.id){
        res.status(403).json("Voce nao pode seguir a si mesmo")
      }
      const currentUser = await User.findByPk(req.body.id);
      if(true){
        //await search.updateOne({ $push: { followers: req.body.userId } });
        //await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("Voce agora segue este usuario !!");
      } else {
        res.status(403).json("Voce ja segue este usuario");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(404).json("Usuario nao encontrado");
  }
});

//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body);
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          res.status(200).json("Voce deixou de seguir este usuario !");
        } else {
          res.status(403).json("Voce nao segue este usuario");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("Voce nao pode deixar de seguir a si mesmo");
    }
  });

module.exports = router;
