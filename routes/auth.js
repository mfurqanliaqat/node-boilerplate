const bcrypt = require('bcrypt')
const { User } = require('../models/user')
const express = require('express')
const router = express.Router()

/* USER -- AUTHENTICATION */
router.post('/', async (req, res) => {
  let user = await User.findOne({ username: req.body.username })

  console.log(user)
  console.log(req.body)

  if (!user) user = await User.findOne({ email: req.body.username })
  if (!user) return res.status(400).send('Invalid username/email or password.')

  const validPassword = await bcrypt.compare(req.body.password, user.password)

  if (!validPassword) return res.status(400).send('Invalid email or password.')
  // if (!user.isAdmin) return res.status(401).send('Unauthorized Access.');

  const token = user.generateAuthToken()

  res.send({ auth: token, username: user.username })
})

module.exports = router
