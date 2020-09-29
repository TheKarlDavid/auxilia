let loginForm = document.getElementById("login")
let registerForm = document.getElementById("register")
let btn = document.getElementById("btn")

function register(){
    loginForm.style.left="-400px";
    registerForm.style.left="50px";
    btn.style.left="110px";
}

function login(){
    loginForm.style.left="50px";
    registerForm.style.left="450px";
    btn.style.left="0px";
}

// FOR REMEMBER ME CHECKBOX
$(document).ready(function(){

    $("input#remember").click(function(){
      $("input#remember").val("1");
    })

})
