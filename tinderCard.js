const mongoose = require('mongoose');

// const likeDislikeSchema = mongoose.Schema({
//     photoURL:String,
//     uid:String,
//     displayName:String,
//     location:String,
//     age:Number,
//     status : Number 
// })

const cardSchema = mongoose.Schema({
    photoURL:String,
    uid:String,
    displayName:String,
    email:String,
    location:String,
    age:Number,
    gender:String,
    showMe:String,
    UserList:Array
    // UserList:[
    //     {
    //         photoURL:String,
    //         uid:String,
    //         displayName:String,
    //         location:String,
    //         age:Number,
    //         status : Number  
    //         //  -1 disliked   1 liked & send request to update the other person userlist
    //         //   0 noaction   2 mutually liked & send request to update the other person userlist
    //     }
    // ]
})



const Card=mongoose.model('cardsTable',cardSchema)
module.exports = Card;