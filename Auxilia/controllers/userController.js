const User = require('../models/user')
const Task = require('../models/tasks')
const Meditation = require('../models/meditation')
const { body, validationResult } = require('express-validator')
const bcrypt = require("bcryptjs")

//home page

exports.getIndex = (req, res)=>{

    if(req.session.email){
        //user already signed in
        req.session.tasks = []
        req.session.accomplished = 0
        User.find({}).then((docs)=>{
            for(let i=0; i<docs[0].tasks.length; i++){
                let task = {
                    task_description: docs[0].tasks[i].task_description, 
                    accomplished: docs[0].tasks[i].accomplished, 
                    logged_date: docs[0].tasks[i].logged_date
                }
                req.session.tasks.push(task)
            }

            User.findOne({email:req.session.email}).then(result=>{
                for(let i=0; i<result.tasks.length; i++){
                    if(result.tasks[i].accomplished){
                        req.session.accomplished++;
                    }
                    
                }
                
                res.render("home.hbs", {
                    firstname: req.session.firstname,
                    lastname: req.session.lastname,
                    tasks:req.session.tasks,
                    plant: req.session.accomplished
                })
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

        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password,salt);
        password = hash;

        let accomplishments = {accomplished_today: false, count_of_times: 0}

        let user = new User({
             email: email,
             password: password,
             firstname: first_name,
             lastname: last_name,
             accomplishments: accomplishments
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

exports.getLogin = async (req,res)=>{
    let email = req.body.email
    let password = req.body.password
    let remember_me = req.body.remember

    var user = await User.findOne({ email: email }).exec();
    if(!user) {
        res.render("login.hbs", {
            errors:"Invalid email/password" 
        })
    }
    if(!bcrypt.compareSync(password, user.password)) {
        res.render("login.hbs", {
            errors:"Invalid email/password" 
        })
    }
    else{
        req.session.email = req.body.email
        req.session.password = req.body.password
        req.session.firstname = user.firstname
        req.session.lastname = user.lastname

        if(remember_me){    
            req.session.cookie.maxAge = 1000 * 3600 * 24 * 30
        }

        // let today = new Date();
        let date_today = new Date();
        let date = ("0" + date_today.getDate()).slice(-2);
        let month = ("0" + (date_today.getMonth() + 1)).slice(-2);
        let year = date_today.getFullYear();
        req.session.today = (year + month  + date)

        req.session.tasks = []

        User.find({}).then((docs)=>{

            last_login = docs[0].tasks[0].logged_date

            if(last_login < req.session.today){
                Task.find({}).then((docs)=>{
                    for(let i=0; i<docs.length; i++){
                        let task = {task_description: docs[i].task_description, accomplished: false, logged_date: req.session.today}
                        req.session.tasks.push(task)
                    }
            
                    User.findOneAndUpdate({email:req.session.email}, 
                        {tasks:req.session.tasks}).then((doc)=>{

                            let count = doc.accomplishments.count_of_times
                            let accomplishments = {accomplished_today: false, count_of_times: count}

                            User.findOneAndUpdate({email:req.session.email}, 
                                {accomplishments: accomplishments}).then((doc)=>{
                                res.redirect("/")
                            })
                    })                       
                })
            }
            else{
                res.redirect("/")
            }
            
        })
    }
  
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

exports.getUpdateTask = (req, res)=>{

    if(req.session.email){
        User.findOne({email:req.session.email}).then(result=>{

            let task_id = result.tasks[req.body.dropCount]
            // console.log(task_id._id)

            User.findOneAndUpdate({
                _id:result._id,
                "tasks._id": task_id
                }, {
                    "$set": {
                    "tasks.$": {
                        task_description: task_id.task_description,
                        accomplished: true,
                        logged_date: req.session.today
                    }
                }
            }).then((doc)=>{
                console.log("UPDATED TASK")
                }, (err)=>{
                console.log("Error: " +err)
            })
        })

    }

    else{
        res.render("index.hbs")
    }
}

exports.getMeditation = (req, res)=>{

    if(req.session.email){
        Meditation.find({}).sort({date: 'desc'}).then((docs)=>{
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

        User.findOne({email:req.session.email}).then(result=>{

            req.session.accomplished = 0 
            for(let i=0; i<result.tasks.length; i++){

                if(result.tasks[i].accomplished){
                    req.session.accomplished++;
                }     
            }

            if(req.session.accomplished == 5){

                if(result.accomplishments.accomplished_today){

                    let plant = result.accomplishments.count_of_times
                    let plants =[]
                    for(let i=0; i<plant; i++){
                        plants.push({plant})
                    }

                    res.render("profile.hbs", {
                        firstname: req.session.firstname,
                        lastname: req.session.lastname,
                        plants: plants 
                    })
                }
                else{
                    let count = result.accomplishments.count_of_times + 1
                    User.findOneAndUpdate({email:req.session.email}, 
                        {accomplishments:  {accomplished_today: true, count_of_times: count}}).then((doc)=>{
                        let plant = count
                        let plants =[]

                        for(let i=0; i<plant; i++){
                            plants.push({plant})
                        }

                        res.render("profile.hbs", {
                            firstname: req.session.firstname,
                            lastname: req.session.lastname,
                            plants: plants 
                        })
                    })
                }
            }
            
            else{
                if(result.accomplishments.count_of_times){
                    let plant = result.accomplishments.count_of_times
                    let plants =[]
                    for(let i=0; i<plant; i++){
                        plants.push({plant})
                    }

                    res.render("profile.hbs", {
                        firstname: req.session.firstname,
                        lastname: req.session.lastname,
                        plants: plants 
                    })
                }
                else{
                    res.render("profile.hbs", {
                        firstname: req.session.firstname,
                        lastname: req.session.lastname,
                        plants: plants 
                    })
                }
            }
        })

        // res.render("profile.hbs",{
        //     firstname: req.session.firstname,
        //     lastname: req.session.lastname
        // })
    }

    else{
        res.render("login.hbs") 
    }
}

exports.getSignout = (req,res)=>{
    req.session.destroy()
    res.redirect("/")
}