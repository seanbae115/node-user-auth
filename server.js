const express = require('express');
const mongoose = require('mongoose');
const { db_connect } = require('./config');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const PORT = process.env.PORT || 9000;

const app = express();

mongoose.connect(db_connect).then( () => {
    console.log('Connected to Mongo DB');
}).catch (err => {
    console.log(err.message)
});

app.use(cors());
app.use(express.json());

authRoutes(app);

app.get('/', (req, res) => {
    res.send('<h1>App working!</h1>')
});

app.listen(PORT, () => {
    console.log('Server\'s Running!');
});