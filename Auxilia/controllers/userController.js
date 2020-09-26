const User = require('../models/user')
const Task = require('../models/tasks')
const Meditation = require('../models/meditation')
const { body, validationResult } = require('express-validator')

//home page

exports.getIndex = (req, res)=>{

    if(req.session.email){
        //user already signed in
        Task.find({}).then((docs)=>{
            res.render("home.hbs", {
                firstname: req.session.firstname,
                lastname: req.session.lastname,
                tasks: docs 
            })
        }, (err)=>{
            res.render("home.hbs",{
                error: err
            })
        })
    }

    else{
        // the user has not registered or logged
        res.render("index.hbs")
    
    }

}

exports.getRegister = (req,res)=>{
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
        res.render("login.hbs",{errors:errors});
    }
    else{

        // var salt = bcrypt.genSaltSync(10);
        // var hash = bcrypt.hashSync(password,salt);
        // password = hash;


        let user = new User({
             email: email,
             password: password,
             firstname: first_name,
             lastname: last_name
        })

        user.save().then((doc)=>{
            console.log("Succesfully added: "+ doc)

            req.session.email = doc.email
            res.render("login.hbs", {
            message:"Registration successful"
            })
        }, (err)=>{
            console.log("Error in adding " + err)
            res.render("login.hbs", {
                errors:"Error in registering: email already in use"
            })
        })
        
    }
}

exports.getLogin = (req,res)=>{
    let email = req.body.email
    let password = req.body.password
    

        User.findOne({email: email, password: password}).then(result=>{
            if(result == null){     
                console.log(result)

                res.render("login.hbs", {
                    errors:"Invalid email/password" 
                })
            }
            else{
                req.session.email = req.body.email
                req.session.password = req.body.password

                req.session.firstname = result.firstname
                req.session.lastname = result.lastname
                // console.log("Name is " +result.firstname)

                res.redirect("/")
            }
        
    }, (err)=>{
        res.send(err)
    })

    
}

exports.getLoginRegister = (req, res)=>{

    if(req.session.email){
        res.render("home.hbs",{
            firstname: req.session.firstname,
            lastname: req.session.lastname
        })
    }

    else{
        res.render("login.hbs")
    }
}

exports.getHome = (req, res)=>{

    if(req.session.email){
        res.redirect("/")
    }

    else{
        res.render("index.hbs")
    }
}

exports.getMeditation = (req, res)=>{

    if(req.session.email){
        Meditation.find({}).then((docs)=>{
            res.render("meditation.hbs", {
                meditations: docs
            })
        }, (err)=>{
            res.render("meditation.hbs",{
                error: err
            })
        })
    }

    else{
        res.render("login.hbs") 
    }
}

exports.getAbout = (req, res)=>{

    if(req.session.email){
        res.render("about.hbs")
    }

    else{
        res.render("about-not.hbs") 
    }
}

exports.getProfile = (req, res)=>{

    if(req.session.email){
        res.render("profile.hbs",{
            firstname: req.session.firstname,
            lastname: req.session.lastname
        })
    }

    else{
        res.render("login.hbs") 
    }
}

exports.getSignout = (req,res)=>{
    req.session.destroy()
    res.redirect("/")
}