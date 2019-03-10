const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {getUserId} = require('../../../src/utils');

const auth = {
  async refreshToken(parent, {token}, context, info) {
    const userId = getUserId(context, token);
    return jwt.sign({ userId }, process.env.APP_SECRET);
  },


  async signup(parent, args, context) {
    const password = await bcrypt.hash(args.password, 10)
    const user = await context.prisma.createUser({ ...args, password })

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    }
  },

  async login(parent, { email, password }, context) {
    const user = await context.prisma.user({ email })
      if (!user) {
        return {
          error: {
            field: 'email',
            msg: 'No user found',
          }
        }
    }
    const passwordValid = await bcrypt.compare(password, user.password)
    if (!passwordValid) {
      return {
        error: {
          field: 'password',
          msg: 'Invalid password',
        }
      }
    }
    return {
      payload: {
        token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
        user,
      }
    }
  },
}

module.exports = { auth }
