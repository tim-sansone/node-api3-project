const { getById } = require('../users/users-model')

function logger(req, res, next) {
  console.log(`${new Date()} ${req.method} ${req.url}`);
  next();
}

async function validateUserId(req, res, next) {
  const { id } = req.params;
  const user = await getById(id)
  if(user == null){
    next({ status: 404, message: "user not found"})
  }
  req.user = user;
  next()
}

function validateUser(req, res, next) {
  if(typeof req.body.name !== "string" || req.body.name.trim() === ''){
    next({ status: 400, message: "missing required name field"})
  }
  next()
}

function validatePost(req, res, next) {
  if(typeof req.body.text !== 'string' || req.body.text.trim() === ''){
    next({ status: 400, message: "missing required text field"})
  }
  next()
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}
