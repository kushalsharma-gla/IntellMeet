require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./db')
const User = require('./models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authMiddleware = require('./authMiddleware')

const app = express()
connectDB()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('IntellMeet Backend is running') 
})
app.get('/api/test', (req, res) => {
  res.send('API is working')
})

app.get('/api/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)

    if (!user) {
      return res.status(404).send('User not found')
    }

    res.json({
      name: user.name,
      email: user.email
    })
  } catch (error) {
    console.log(error)
    res.status(500).send('Failed to load profile')
  }
})
app.post('/api/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res.status(401).send('Invalid email or password')
    }

    const isMatch = await bcrypt.compare(
      req.body.password,
      user.password
    )

    if (!isMatch) {
      return res.status(401).send('Invalid email or password')
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.json({
      message: 'Login successful',
      token: token
    })
  } catch (error) {
    console.log(error)
    res.status(500).send('Login failed')
  }
})
app.post('/api/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const user = new User({
  name: req.body.name,
  email: req.body.email,
  password: hashedPassword
})

    await user.save()

    res.send('User registered successfully')
  } catch (error) {
    console.log(error)
    res.status(500).send('Registration failed')
  }
})

app.listen(5000, () => {
  console.log('Server running on port 5000')
})