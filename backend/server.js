const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/userSchema');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const SECRET_KEY = 'secretkey';

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

const eventSchema = new mongoose.Schema({
  itemName: String,
  itemDescription: String,
  itemTag: String,
  selectedDate: Date,
});
const Event = mongoose.model('Event', eventSchema);

app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/events', async (req, res) => {
  const { itemName, itemDescription, itemTag, selectedDate } = req.body;
  const newEvent = new Event({
    itemName,
    itemDescription,
    itemTag,
    selectedDate,
  });
  try {
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error saving event:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/events/:id', async (req, res) => {
  const eventId = req.params.id;

  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully', deletedEvent });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



