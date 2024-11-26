const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database'); // MongoDB connection
const { initializeAgenda } = require('./config/agenda'); // Agenda initialization
const emailRoutes = require('./routes/emailRoute');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB and initialize Agenda
connectDB()
    .then(() => {
        console.log('MongoDB connected');
        return initializeAgenda(); // Initialize Agenda after MongoDB connection
    })
    .catch((error) => console.error(error));

// Routes
app.use('/api/emails', emailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
