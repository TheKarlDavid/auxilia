const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

let Task = mongoose.model("tasks",{
    task_description: String,
    task_date: Date
})

module.exports = Task