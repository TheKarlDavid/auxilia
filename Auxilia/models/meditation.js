const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

let Meditation = mongoose.model("meditation",{
    title: String,
    description: String,
    link: String
})

module.exports = {
    Meditation
}