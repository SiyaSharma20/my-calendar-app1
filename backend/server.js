const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/userSchema');

const SECRET_KEY = 'secretkey';
//connect to express app
const app = express();

//connect to Mongodb
const dbURI =
  'mongodb+srv://admin:calendarapp123@cluster0.ypljewe.mongodb.net/UsersDB?retryWrites=true&w=majority';
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(4000, () => {
      console.log('Server is connected to port 4000 and connected to MongoDb');
    });
  })
  .catch((error) => {
    console.log('Unable to connect to Server and/or MongoDb');
  });

//middleware
app.use(bodyParser.json());
app.use(cors());

//Routes
//User Registration

app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error signing up' });
  }
});

//get request registered users
app.get('/register', async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Unable to get users' });
  }
});

//get login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: '1hr',
    });
    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});
