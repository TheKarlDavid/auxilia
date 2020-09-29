const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

let Meditation = mongoose.model("meditation",{
    title: String,
    description: String,
    link: String,
    date: Date
})

module.exports = Meditation


// let meditation = new Meditation({
//     title: "Isha Kriya: A Free Guided Meditation - Sadhguru",
//     description: "Isha Kriya is a simple, free guided meditation designed by Sadhguru. Watch this video for the guided instructions from Sadhguru and experience this powerful spiritual process in the comfort of your own home.",
//     link: "https://www.youtube.com/embed/EwQkfoKxRvo?autoplay=1&modestbranding=1&showinfo=0&rel=0&fs=0"
// })

// meditation.save().then((doc)=>{
//     console.log("Succesfully added: "+doc)
// }, (err)=>{
//     console.log("Error in adding : "+err)
// }) 