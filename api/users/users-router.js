const express = require('express');
const Users = require('./users-model')
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

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user)
});

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
    .then(user => res.status(201).json(user))
    .catch(error => next(error))
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  Users.update(req.user.id, req.body)
    .then(user => res.json(user))
    .catch(error => next(error))
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  Users.remove(req.user.id)
    .then(res.json(req.user))
    .catch(error => next(error))
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router

module.exports = router;
