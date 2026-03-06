const User = require('../models/userModel.js')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" })
}
/// POST /api/users/signup
const signup = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.signup(
      email, password
    )
    const token = createToken(user._id)
    res.status(201).json({
      email,
      token
    })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}
/// POST /api/users/login
const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.login(
      email, password
    )
    const token = createToken(user._id)
    res.status(200).json({
      email,
      token
    })
  }
  catch (e) {
    res.status(400).json({ error: e.message })
  }
}

module.exports = { signup, login }
