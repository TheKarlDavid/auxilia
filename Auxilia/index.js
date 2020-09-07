const express = require("express")
const session = require("express-session")
const bodyparser = require("body-parser")
const cookieparser = require("cookie-parser")
const hbs = require("hbs")
const mongoose = require("mongoose")
const {User} = require("./models/user.js")
const bcrypt = require("bcryptjs")
const { body, validationResult } = require('express-validator')
const { runInNewContext } = require("vm")
const app = express()

mongoose.connect("mongodb://127.0.0.1:27017/userdb",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
})

app.set("view engine", "hbs")

const urlencoder = bodyparser.urlencoded({
    extended:false
})

// let users = []

app.use(session({
    secret: "very secret",
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge: 1000 * 60 * 60
    }
}))

app.use(express.static(__dirname + "/public"))

app.get("/", (req, res)=>{

    if(req.session.email){
        //it means that has already signed in

        res.render("home.hbs",{
            email: req.session.email
        })
    }

    
    else{
        // the user has not registered or logged
        res.render("index.hbs")
    
    }
})

// registering a new user

app.post("/register", urlencoder, (req,res)=>{
    // email: em     password: pw

    // reading fields from hbs
    let email = req.body.em
    let password = req.body.pw
    let first_name = req.body.firstname
    let last_name = req.body.lastname

    //checking if valid
    body("email").notEmpty();
    body("email").isEmail();
    body("password").notEmpty();
    body("password").isLength({min:6});
    body("first_name").notEmpty();
    body("last_name").notEmpty();

    //check errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.render("index.hbs",{errors:errors});
    }
    else{

        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password,salt);
        password = hash;


        let user = new User({
             email: email,
             password: password,
             firstname: first_name,
             lastname: last_name
        })

        user.save().then((doc)=>{
            console.log("Succesfully added: "+ doc)

            req.session.email = doc.email
            res.render("index.hbs", {
            message:"Registration successful"
            })
        }, (err)=>{
            console.log("Error in adding " + err)
            res.render("index.hbs", {
                errors:"Error"
            })
        })

        // req.session.email = req.body.em
        // res.render("home.hbs",{
        //     email: req.session.email
        // })

        // console.log(JSON.stringify(user))

        // res.render("index.hbs", {
        //     message:"Registration successful"
        // })

        // res.redirect("/")
        
    }
        req.session.email = req.body.em
        // res.render("home.hbs",{
        //     email: req.session.email
        // })

        // res.render("index.hbs", {
        //     message:"Registration successful"
        // })
        
        // res.redirect("/")
    // }

    //SUCCESSFUL REGISTER save user to the db   users[]
    // req.session.email = req.body.em

    // res.sendFile(__dirname+"/public/home.html")

})

function isAvailable(email){
    for(let i=0; i <users.length; i++){
        if(users[i].email == email){
            return false
        }
    }
    return true
}

app.post("/login", urlencoder, (req,res)=>{
    // email: em     password: pw
    let email = req.body.email
    let password = req.body.password

        User.findOne({email: email}).then(result=>{
            if(result == null){
                res.render("index.hbs")
            }
            else{
                console.log(result)
                res.render("home.hbs")
            }
        
    }, (err)=>{
        res.send(err)

    })
    // if(!matches(req.body.em, req.body.pw)){
    //     res.render("index.hbs",{
    //         error:"Email and password does not match"
    //     })

    // }
    // else{
    //     res.render("home.hbs",{
    //         email:req.session.email
    //     })
    // }

    
})

// function matches(email, password){
//     for(let i=0; i<users.length; i++){
//         if(users[i].email == email && users[i].password == password){
//             return true
//         }
//     }
//     return false
// }

app.get("/signout", (req,res)=>{
    req.session.destroy()
    res.redirect("/")
})

app.listen(3000, function(){
    console.log("now listening to port 3000")
})


