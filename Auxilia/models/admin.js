const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

let Admin = mongoose.model("Admin",{
    email: {type: String , required:true, index: true, unique:true},
    password: {type: String, required:true},
    firstname: {type: String, required:true},
    lastname: {type: String, required:true},
})

module.exports = Admin