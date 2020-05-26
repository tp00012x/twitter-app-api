require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const apiRoute = require('./routes/api')

// Middleware
app.use(cors());
app.use(express.json());

// Routers
app.use('/api', apiRoute);

// DB
mongoose.connect(
    process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },
    () => {
        console.log('connected to DB')
    }
);

// Port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});