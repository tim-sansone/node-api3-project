const express = require('express');

const server = express();
const usersRouter = require('./users/users-router')

const { logger } = require('./middleware/middleware')

// remember express by default cannot parse JSON in request bodies
server.use(express.json());
server.use(logger)

// global middlewares and the user's router need to be connected here
server.use('/api/users', usersRouter)


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use((error, req, res, next) => {
  res.status(error.status || 500).json({ message: error.message || "internal server error"})
})

module.exports = server;
