const express = require("express")
const session = require("express-session")
const bodyparser = require("body-parser")
const cookieparser = require("cookie-parser")
const hbs = require("hbs")

const app = express()
app.use(express.static(__dirname + "/public"))

app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/public/index.html")
})

app.post("/login", (req,res)=>{

})

app.listen(3000, function(){
    console.log("listening to port 3000")
})

// const express = require("express")
// const session = require("express-session")
// const bodyparser = require("body-parser")
// const cookieparser = require("cookie-parser")
// const hbs = require("hbs")

// const app = express()

// app.set("view engine", "hbs")

// const urlencoder = bodyparser.urlencoded({
//     extended:false
// })

// app.use(session({
//     secret: "very secret",
//     resave: false,
//     saveUninitialized: true,
//     cookie:{
//         maxAge: 1000 * 60 * 60
//     }
// }))

// app.get("/", (req, res)=>{
//     if(req.session.username){

//         res.render("home.hbs",{
//             username: req.session.username
//         })
//     }

    
//     else{
//         res.render("index.hbs")
    
//     }
// })


// app.post("/register", urlencoder, (req,res)=>{
//     // username: un     password: pw

//     let username = req.body.un
//     let password = req.body.pw

//     if(username.trim() == "" || password.trim() == ""){
//         res.render("index.hbs", {
//             error:"Enter a username and password"
//         })
//     }

//     else if(!isAvailable(username)){
//         res.render("index.hbs", {
//             error:"Username not available"
//         })
//     }
    
//     else{
//         //save user to db users[]

//         users.push({
//             username: username,
//             password: password
//         })

//         req.session.username = req.body.un
//         res.redirect("/")
//     }

// })

// function isAvailable(username){
//     for(let i=0; i <users.length; i++){
//         if(users[i].username == username){
//             return false
//         }
//     }
//     return true
// }

// app.post("/login", urlencoder, (req,res)=>{
//     // username: un     password: pw

//     //check if user credentials     users[]
//     req.session.username = req.body.un
//     // res.sendFile(__dirname+"/public/home.html")

//     if(!matches(req.body.un, req.body.pw)){
//         res.render("index.hbs",{
//             error:"Username and password does not match"
//         })

//     }
//     else{
//         res.render("home.hbs",{
//             username:req.session.username
//         })
//     }
    
// })

// function matches(username, password){
//     for(let i=0; i<users.length; i++){
//         if(users[i].username == username && users[i].password == password){
//             return true
//         }
//     }
//     return false
// }

// app.get("/signout", (req,res)=>{
//     req.session.destroy()
//     res.redirect("/")
// })

// app.listen(3000, function(){
//     console.log("now listening to port 3000")
// })
