const jwt = require('jsonwebtoken')
require('dotenv').config()

function getUserId(ctx, jwtToken) {
  let token = '';
  if (jwtToken) {
    token = jwtToken;
    console.log(token)
  } else {
    const Authorization = ctx.request.get('Authorization')
    token = Authorization.replace('Bearer ', '')
    console.log(token)
  }
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET)
    console.log(token)
    return userId
  }
  throw new AuthError()
}


function createToken(userId) {
  jwt.sign({ userId }, process.env.APP_SECRET);
}

class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}

module.exports = {
  getUserId,
  AuthError,
  createToken,
}
