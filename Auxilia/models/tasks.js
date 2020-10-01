const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

let Task = mongoose.model("tasks",{
    task_description: String
    // tasks:[{
    //     task_date: Number,
    //     task1: String,
    //     task2: String,
    //     task3: String,
    //     task4: String,
    //     task5: String
    // }]
})

module.exports = Task