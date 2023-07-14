const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordright = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordright)) {
    return response.status(401).json({
      error: 'invalid password or user name'
    })
  }
  const TokenUser = {
    username: user.username,
    id: user._id,
  }
  const token = jwt.sign(TokenUser, process.env.SECRET, { expiresIn: 60 * 60 })
  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter