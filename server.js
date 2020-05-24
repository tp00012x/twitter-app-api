require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const TwitterService = require('./services/HomeStatusService');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routers
app.post('/home', async (req, res) => {
    console.log('Home hit')

    // Save data in DB
    const twitterService = new TwitterService(req.body);
    await twitterService.saveHomeStatuses()

    // Get HomeStatuses
    const homeStatuses = await twitterService.getHomeStatuses()
    return res.json(homeStatuses)
})


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
)

// Port
app.listen(3001, () => {
    console.log('app is running on port 3001');
})