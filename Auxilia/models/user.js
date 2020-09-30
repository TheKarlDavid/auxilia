const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

let User = mongoose.model("User",{
    email: {type: String , required:true, index: true, unique:true},
    password: {type: String, required:true},
    firstname: {type: String, required:true},
    lastname: {type: String, required:true},

    accomplishments:{
        accomplished_today: Boolean,
        count_of_times: Number
    },
    tasks:[{
        task_description: String,
        accomplished: Boolean,
        logged_date: Number
    }]
})

module.exports = User