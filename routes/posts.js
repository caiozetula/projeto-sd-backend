const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//create a post
router.post("/", async (req, res) => {
  Post.create(req.body).then(function(){
    res.status(200).json("Post criado com sucesso !");
  }).catch(function(err){
    res.status(500).json(err);
  })
});

//update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post.id === req.body.id) {
      await post.upsert({
        id: req.params.id, 
        ...req.body 
      });
      res.status(200).json("O post foi atualizado !");
    } else {
      res.status(403).json("Voce so pode alterar o seu post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post.id === req.body.id) {
      await post.destroy({where: {id: req.params.id}});
      res.status(200).json("O Post foi deletado !!");
    } else {
      res.status(403).json("Voce só pode deletar o seu post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//like/dislike a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get timeline posts
router.get("/timeline/all", async (req, res) => {
  try {
    const currentUser = await User.findByPk(req.body.id);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.json(userPosts.concat(...friendPosts))
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
