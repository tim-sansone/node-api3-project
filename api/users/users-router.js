const express = require('express');
const Users = require('./users-model')
const Posts = require('../posts/posts-model')
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res, next) => {
  Users.get()
    .then(users => {
      res.json(users)
    })
    .catch(error => next(error))
  
});

router.get('/:id', validateUserId, (req, res, next) => {
  res.json(req.user)
});

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
    .then(user => res.status(201).json(user))
    .catch(error => next(error))
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  Users.update(req.user.id, req.body)
    .then(user => res.json(user))
    .catch(error => next(error))
});

router.delete('/:id', validateUserId, (req, res, next) => {
  Users.remove(req.user.id)
    .then(res.json(req.user))
    .catch(error => next(error))
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  Users.getUserPosts(req.user.id)
    .then(posts => res.json(posts))
    .catch(error => next(error))
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  req.post.user_id = req.user.id

  Posts.insert(req.post)
    .then(post => res.status(201).json(post))
    .catch(error => next(error))
});

module.exports = router;
