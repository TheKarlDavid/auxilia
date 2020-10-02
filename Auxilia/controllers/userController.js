const User = require('../models/user')
const Admin = require('../models/admin')
const Task = require('../models/tasks')
const Meditation = require('../models/meditation')
const { body, validationResult } = require('express-validator')
const bcrypt = require("bcryptjs")

//home page

exports.getIndex = (req, res)=>{

    if(req.session.email){
        if(req.session.isAdmin){
            //admin already signed in
            let date_today = new Date()
            date_today.setUTCHours(0,0,0,0)
            
            Task.find({task_date:date_today.toISOString()}).then((docs)=>{
                req.session.admintasks = docs
                res.render("home-admin.hbs", {
                    firstname: req.session.firstname,
                    lastname: req.session.lastname,
                    tasks: docs 
                })
            }, (err)=>{
                res.render("home-admin.hbs",{
                    error: err
                })
            })
        }
        else{
            //user already signed in
            let date_today = new Date()
            date_today.setUTCHours(0,0,0,0)
            let tasks = []

            Task.find({task_date:date_today.toISOString()}).then((docs)=>{
                tasks= docs
             
                let completedTasks = []
                let completed = 0
                User.findOne({email:req.session.email}).then((result)=>{
                    for(let i=0; i<result.tasks.length; i++){
                        
                        if(result.tasks[i].task_date.toISOString() == date_today.toISOString()){
                            completedTasks.push(result.tasks[i])
                        }
                    }

                    res.render("home.hbs", {
                        firstname: req.session.firstname,
                        lastname: req.session.lastname,
                        tasks:tasks,
                        completedTasks: completedTasks
                    })
                })       
            })
            
        }
    }

    else{
        // the user has not registered or logged
        
        let date_today = new Date()
        date_today.setUTCHours(0,0,0,0)
        let tasks = []

        Task.find({task_date:date_today.toISOString()}).then((docs)=>{
            tasks= docs

            res.render("index.hbs", {
                tasks:tasks
            })   
        })

        
    
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

        let date_today = new Date();
        req.session.today = date_today

        let user = new User({
             email: email,
             password: password,
             firstname: first_name,
             lastname: last_name,
             accomplishments: [],
             tasks: []
        })

        user.save().then((doc)=>{
            console.log("Succesfully added: "+ doc)
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
    var admin = await Admin.findOne({ email: email }).exec();

    if(!user) {

        if(!admin) {
            res.render("login.hbs", {
                errors:"Invalid email/password" 
            })
        }
    
        else if(admin) {
            if(!bcrypt.compareSync(password, admin.password)) {
                res.render("login.hbs", {
                    errors:"Invalid email/password" 
                })
            }
            else{    
                req.session.email = req.body.email
                req.session.password = req.body.password
                req.session.firstname = admin.firstname
                req.session.lastname = admin.lastname
                req.session.isAdmin = true
    
                res.redirect("/")
            }
        }
    }

    else if(user) {
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
            req.session.isAdmin = false

            if(remember_me){    
                req.session.cookie.maxAge = 1000 * 3600 * 24 * 30
            }

            res.redirect("/")

        }
    }
  
}

exports.getLoginRegister = (req, res)=>{

    if(req.session.email){
        res.redirect("/")
        // res.render("home.hbs",{
        //     firstname: req.session.firstname,
        //     lastname: req.session.lastname
        // })
    }

    else{
        res.render("login.hbs")
    }
}

exports.getHome = (req, res)=>{

    res.redirect("/")
    // if(req.session.email){
    //     res.redirect("/")
    // }

    // else{
    //     res.render("index.hbs")
    // }
}

exports.getUpdateTask = (req, res)=>{

    if(req.session.email){
        let date_today = new Date()
        date_today.setUTCHours(0,0,0,0)

        Task.find({task_date:date_today.toISOString()}).then((result1)=>{

            User.findOne({email:req.session.email}).then(result=>{
                console.log(req.body.dropCount)
                let updated_task = result.tasks
                updated_task.push(result1[req.body.dropCount])
 
                console.log(result1)
                console.log(updated_task)
    
                User.findOneAndUpdate({
                    _id:result._id
                    }, {
                        tasks: updated_task
                },
                {
                    new:true
                }).then((doc)=>{
                    console.log("UPDATED TASK")
                    }, (err)=>{
                    console.log("Error: " +err)
                })
            })
        })
        

    }

    else{
        res.render("index.hbs")
    }
}

exports.getMeditation = (req, res)=>{

    if(req.session.email){
        if(req.session.isAdmin){
            Meditation.find({}).sort({date: 'desc'}).then((docs)=>{
                res.render("meditation-admin.hbs", {
                    meditations: docs
                })
            }, (err)=>{
                res.render("meditation-admin.hbs",{
                    error: err
                })
            })
        }
        else{
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
        if(req.session.isAdmin){
            res.render("profile-admin.hbs",{
                firstname: req.session.firstname,
                lastname: req.session.lastname
            })
        }
        else{
            
            let date_today = new Date()
            date_today.setUTCHours(0,0,0,0)
            let tasks = []
            
            Task.find({task_date:date_today.toISOString()}).then((docs)=>{
                tasks= docs
                let completedTasks = []
                let accomplished = 0
                User.findOne({email:req.session.email}).then((result)=>{
                    for(let i=0; i<result.tasks.length; i++){
                        
                        if(result.tasks[i].task_date.toISOString() == date_today.toISOString()){
                            completedTasks.push(result.tasks[i])
                        }
                    }

                    for (let i=0; i<completedTasks.length; i++){
                        for(let j=0; j<tasks.length; j++){

                            if(completedTasks[i]._id.equals(tasks[j]._id)){
                                accomplished++
                            }
                        }                        
                    }

                    let num_accomplishments = result.accomplishments.length
                    let date_accomplished = tasks[0].task_date
                    let same_date = false 

                    for(let i=0; i<num_accomplishments; i++){
                        let result_date = result.accomplishments[i].date_accomplished

                        if(result_date.toISOString() == date_today.toISOString()){
                            console.log("USER Same date")
                            same_date = true
                        }
                        
                    }

                    if(accomplished == 5 && !same_date){ //no accomplishment registered yet for today
                        
                        if(num_accomplishments){ //HAVE ACCOMPLISHMENTS FROM PAST
                            
                            let update_accomplishments = {date_accomplished: date_accomplished, completed:true}
                            let plants =result.accomplishments
                            
                            User.findOne({email:req.session.email}).then(result=>{
                                let accomplishments = result.accomplishments
                                accomplishments.push(update_accomplishments)

                                plants.push(update_accomplishments)
                                console.log(plants)

                                User.findOneAndUpdate({
                                    _id:result._id
                                    }, {
                                        accomplishments: accomplishments
                                },
                                {
                                    new:true
                                }).then((doc)=>{
                                    console.log("UPDATED TASK")
                                    console.log("1")
                                    res.render("profile.hbs", {
                                        firstname: req.session.firstname,
                                        lastname: req.session.lastname,
                                        plants: plants
                                    })
                                    }, (err)=>{
                                    console.log("Error: " +err)
                                })
                            })
                        }

                        else{ // NO ACCOMPLISHMENTS FORM PAST

                                let update_accomplishments 
                                update_accomplishments={date_accomplished: date_accomplished, completed:true}
                                let plants = []

                                plants.push(update_accomplishments)
                                console.log(plants)

                                User.findOneAndUpdate({
                                    _id:result._id
                                    }, {
                                        accomplishments: update_accomplishments
                                },
                                {
                                    new:true
                                }).then((doc)=>{
                                    console.log("UPDATED USER ACCOMPLISHEMNTS")
                                    res.render("profile.hbs", {
                                        firstname: req.session.firstname,
                                        lastname: req.session.lastname,
                                        plants: plants
                                    })
                                    }, (err)=>{
                                    console.log("Error: " +err)
                                })  
                        }
                        
                    }

                    else{ //get previous plant history: not yet accomplished or already accomplished for today
                        let plants=result.accomplishments

                        res.render("profile.hbs", {
                            firstname: req.session.firstname,
                            lastname: req.session.lastname,
                            plants: plants
                        })
                    }
                    
                })       
            })   
        }
    }

    else{
        res.render("login.hbs") 
    }
}

exports.getSignout = (req,res)=>{
    req.session.destroy()
    res.redirect("/")
}