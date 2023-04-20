const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body
  try {
    const user = await User.login(email, password)
    console.log(user)
    // create a token
    const token = createToken(user._id)
    res.render('dashboard', {user});
    // res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password} = req.body
  console.log('body', req.body)
  console.log('inside user signup')
  try {
    const user = await User.signup(req.body)

    // create a token
    const token = createToken(user._id)
    res.render('loginForm');
    // res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser }