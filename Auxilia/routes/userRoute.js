const express = require('express')
const userController = require('../controllers/userController')
const routes = express();


routes.get("/", userController.getIndex)
routes.post("/register",userController.getRegister)
routes.post("/login", userController.getLogin)
routes.get("/login-register",userController.getLoginRegister)
routes.get("/home", userController.getHome)
routes.get("/meditation", userController.getMeditation)
routes.get("/about", userController.getAbout)
routes.get("/profile", userController.getProfile)
routes.get("/signout", userController.getSignout)
module.exports = routes