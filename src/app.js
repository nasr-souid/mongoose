const express = require("express");
const mongoose = require('mongoose')
const Person = require('./models/person');
const app = express()
const conectionToDB=async()=>{
    mongoose.connect(MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
    if (err){
        console.log(err)
    }else{
        console.log('connected to db successfully')
    }
})}
conectionToDB()
//Create and Save a Record of a Model
let joe = new Person({
    name: "Joe",
    age: 24,
    favoriteFoods: ['Apple', 'Banana']
});

joe.save(function(err, persons) {
    if(err){
console.log("Failed");
    } else {
    console.log("Saved Successful");
    console.log(persons);
    }
});
//Create Many Records with model.create()
let arrayOfPeople=[{
name: "Jhon",
age: 26,
favoriteFoods: ['Apple', 'Banana','hamburger'],
_id:1
},{
name: "Joe",
age: 24,
favoriteFoods: ['Apple','meat'],
_id:2
},{
name: "Oussema",
age: 18,
favoriteFoods: ['Kouskous', 'Banana'],
_id:3
},
{
name: "Amelie",
age: 4,
favoriteFoods: ['Orange', 'Banana','milk'],
_id:4
}]
arrayOfPeople.forEach((person)=>{
    person.save((err)=>{
        if (err){
    console.log("Failed")
}
})
})                                                 
Person.create(arrayOfPeople).save(function(err, persons) {
    if(err){
console.log("Failed");
    } else {
    console.log("Saved Successful");
    }
});
//Use model.find() to Search Your Database
const findPerson = Person.find({
    name: "Joe"
});
//Use model.findOne() to Return a Single Matching Document from Your Database
const findOnePerson = Person.findOne({
    favoriteFoods: {
        $in: ["Kouskous"]
    }
});
//Use model.findById() to Search Your Database By _id
const findById = Person.findById({
    _id:3
})
//Perform Classic Updates by Running Find, Edit, then Save
Person.findById({
    _id:3
}).update({}, {
    $set: {
        favoriteFoods: Array.push("hamburger")
    }
}).save(function(err, persons) {
    if(err){
console.log("Failed");
    } else {
    console.log("Saved Successful");
    console.log(persons);
    }
})
//Perform New Updates on a Document Using model.findOneAndUpdate()
Person.findOneAndUpdate({
    name: "Oussema"
}, {
    $set: {
        age: 20
    }
}, {
    new: true
}).save(function(err, persons) {
    if(err){
console.log("Failed");
    } else {
    console.log("Saved Successful");
    console.log(persons);
    }
})
//Delete One Document Using model.findByIdAndRemove
Person.findByIdAndRemove({
    _id: 4
})
// Delete Many Documents with model.remove()
Person.remove({
    name: "Mary"
})
//Chain Search Query Helpers to Narrow Search Results
Person.find({
    favoriteFoods: {
        $in: ["burritos"]
    }                        //find people who like burritos
}).sort({
    name: 1                  //sort them by name
}).limit(2).select({         //limit the results to two documents, 
    age: false               //hide their age
}).exec((err) => {
    if(err){
    console.log("Failed");
        } else {
        console.log("with Successful");
        console.log(persons);
        }
    })
