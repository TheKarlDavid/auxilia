const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

let Admin = mongoose.model("Admin",{
    email: {type: String , required:true, index: true, unique:true},
    password: {type: String, required:true},
    firstname: {type: String, required:true},
    lastname: {type: String, required:true},

    // accomplishments:[{
    //     title: String,
    //     count_of_times: Number
    // }],
    // tasks:[{
    //     task_description: String,
    //     accomplished: Boolean
    // }]
})

module.exports = Admin