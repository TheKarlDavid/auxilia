const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

let User = mongoose.model("user",{
    email: {type: String , required:true, index: true, unique:true},
    password: {type: String, required:true},
    firstname: {type: String, required:true},
    lastname: {type: String, required:true}
})

module.exports = {
    User
}