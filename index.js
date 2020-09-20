const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Card = require('./tinderCard')

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://admin:V5zau8EkOWP66clj@cluster0.vqzcn.mongodb.net/tinderDB?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

app.get('/', (req, res) => {
    res.status(200).send("HELLO YOGESH");
})

app.get('/tinder/users', (req, res) => {
    Card.find((err, data) => {
        if (err) {
            console.log("ERR",err);
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
})

app.post('/tinder/users', (req, res) => {
    const dbCard = req.body;
    Card.create(dbCard, (err, data) => {
        if (err) {
            console.log("ERR",err);
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
})

app.listen(port, () => console.log(`Listening to port ${port}`))