const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Card = require('./tinderCard')

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

const connectionUrl = "mongodb+srv://admin:V5zau8EkOWP66clj@cluster0.vqzcn.mongodb.net/tinderDB?retryWrites=true&w=majority"

mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

app.get('/', (req, res) => {
    res.status(200).send("HELLO YOGESH");
})

app.post('/tinder/fetchUsers', (req, res) => {
    console.log("REQQQ", req.body)
    const query = { gender: req.body.showMe, displayName: { $ne: req.body.displayName } };
    if (!req.body.showMe) {
        delete query.gender
    }
    Card.find(query, (err, data) => {
        if (err) {
            console.log("ERR", err);
            res.status(500).send(err);
        } else {
            console.log("DATAA", data)
            res.status(200).send(data);
        }
    });
})

// app.post('/tinder/users', (req, res) => {
//     const dbCard = req.body;
//     Card.create(dbCard, (err, data) => {
//         if (err) {
//             console.log("ERR", err);
//             res.status(500).send(err);
//         } else {
//             res.status(200).send(data);
//         }
//     });
// })

app.put('/tinder/users', (req, res) => {
    const dbCard = req.body;
    var myquery = { uid: dbCard.uid };
    var newvalues = { $set: dbCard };
    Card.findOne({ uid: dbCard.uid }, (err, data) => {
        if (err) {
            console.log("ERR", err);
            res.status(500).send(err);
        } else {
            if (data) {
                Card.updateOne(myquery, newvalues, (err, data) => {
                    if (err) {
                        console.log("ERR", err);
                        res.status(500).send(err);
                    } else {
                        console.log("DATTTAAAAAA", data);
                        res.status(200).send(req.body);
                    }
                })
            } else {
                Card.create(dbCard, (err, data) => {
                    if (err) {
                        console.log("ERR", err);
                        res.status(500).send(err);
                    } else {
                        res.status(200).send(data);
                    }
                });
            }
        }
    })
})

app.listen(port, () => console.log(`Listening to port ${port}`))
