const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

let User = mongoose.model("User",{
    email: {type: String , required:true, index: true, unique:true},
    password: {type: String, required:true},
    firstname: {type: String, required:true},
    lastname: {type: String, required:true},

    accomplishments:[{
        date_accomplished: Date,
        completed: Boolean
    }],
    tasks:[{
        task_description: String,
        task_date: Date,
        accomplished: Boolean,
        logged_date: Date
    }]
})

module.exports = User