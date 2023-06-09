// import dependencies.
const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// import in-project dependencies.
const authRoutes = require('./routes/authRoutes');

// create port.
const PORT = process.env.PORT || process.env.API_PORT;

// create express app and set up middleware.
const app = express();
app.use(express.json());
app.use(cors());

// register routes
app.use('/api/auth', authRoutes);

// create server.
const server = http.createServer(app);

// Connect to database.
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        // launch server and listen.
        server.listen(PORT, () => {
            console.log(`Server is listening on ${PORT}`);
        });
    })
    .catch(err => {
        // If error, tell user and give error in console.
        console.log('Database connection failed. Server not started.');
        console.log(err);
    })
