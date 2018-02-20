const express = require('express');
const mongoose = require('mongoose');
const { db_connect } = require('./config');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const PORT = process.env.PORT || 9000;
const { resolve }  = require('path');

const app = express();

mongoose.connect(db_connect).then( () => {
    console.log('Connected to Mongo DB');
}).catch (err => {
    console.log(err.message)
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static(resolve(__dirname, 'client')));

authRoutes(app);

app.get('/test', (req, res) => {
    res.send('<h1>App working!</h1>')
});

app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, 'client', 'index.html'));
});

app.post('/signup', (req, res) => {
    const dataToSend = {
        message: 'Received data. Sending data back.', 
        received: req.body
    }
    res.send(dataToSend);
});

app.listen(PORT, () => {
    console.log('Server\'s Running!');
});