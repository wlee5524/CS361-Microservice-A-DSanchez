const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const connectDB = require('./db');
connectDB();

// Mongoose Schema for Journal Entry
const journalSchema = new mongoose.Schema({
  wellbeing: { type: Number, required: true },
  emotions: { type: [String], required: true },
  sleep: { type: String, required: true },
  journal: { type: String, maxlength: 300 },
  _u_ID: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const JournalEntry = mongoose.model('JournalEntry', journalSchema);

// API endpoint to accept journal entries
app.post('/entry', async (req, res) => {
  const { wellbeing, emotions, sleep, journal, _u_ID } = req.body;

  console.log('Received data:', req.body);
  try {
    // Check if user already submitted an entry today
    const todayEntry = await JournalEntry.findOne({
      _u_ID,
      createdAt: { $gte: new Date().setHours(0, 0, 0, 0) }, // Today's date
    });

    /* if (todayEntry) {
      console.log(`User ${_u_ID} has already submitted an entry today.`);
      return res.status(400).json({ error: 'You can submit only one entry per day.' });
    } */

    const newEntry = new JournalEntry({
      wellbeing,
      emotions,
      sleep,
      journal,
      _u_ID,
    });

    console.log('Saving new entry:', newEntry);  // Log the entry being saved

    await newEntry.save();
    console.log('Entry successfully logged for user:', _u_ID);  
    res.status(200).json({ message: 'Entry successfully logged!' });
  } catch (err) {
    console.error('Error saving entry:', err);  
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});