const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
    name:String,
    url:String
})

const Card=mongoose.model('cardsTable',cardSchema)
module.exports = Card;