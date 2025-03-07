const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectToDatabase = require('./Database/db');
const userRoutes = require('./routes/user.routes');

connectToDatabase();

// Place body parsing middleware first
app.use(cors()); // to accept requests from any origin
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hanzlla Soomro');
});

app.use("/users", userRoutes);

module.exports = app;