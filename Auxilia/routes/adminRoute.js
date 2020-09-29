const express = require('express')
const adminController = require('../controllers/adminController')
const routes = express();


routes.get("/", adminController.getIndex)
// routes.post("/register",userController.getRegister)
routes.post("/login", adminController.getLogin)
routes.get("/login-register",adminController.getLoginRegister)
routes.get("/home", adminController.getHome)
routes.post("/edit-task", adminController.getEditTask)
routes.get("/meditation", adminController.getMeditation)
routes.post("/add-meditation", adminController.getAddMeditation)
routes.post("/edit-meditation", adminController.getEditMeditation)
routes.post("/delete-meditation", adminController.getDeleteMeditation)
routes.get("/about", adminController.getAbout)
routes.get("/profile", adminController.getProfile)
routes.get("/signout", adminController.getSignout)
module.exports = routes