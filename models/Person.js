const mongoose=require('mongoose')
const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    age:{
        type:Number,
        required: true
    },
    favoriteFoods:{
        type:[String],  
    },
    _id:{type:Number,
        required: true,
        unique: true
}})

let Person=mongoose.model('Person',personSchema,'persons')

module.exports = Person