const mongoose = require("mongoose")

let User = mongoose.model("user",{
    email: String,
    password: String,
    firstname: String,
    lastname: String
})

module.exports = {
    User
}