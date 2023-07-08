const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
	const { username, name, password } = request.body

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)

	const user = new User({
		username,
		name,
		passwordHash,
	})

	try {
		const savedUser = await user.save()
		response.status(201).json(savedUser)
	} catch (error) {
		response.status(400).json({ error: error.message })
	}
})

usersRouter.get('/', async (request, response) => {
	const users = await User
		.find({}).populate('blogs', { content: 1, important: 1 })
	response.json(users)
})

module.exports = usersRouter