let i =0;
$(document).ready(function(){
    $("#learn-more").click(function(){
        if(!i){
            console.log("CLICK");
            document.getElementById("desc").style.display="inline-block";
            document.getElementById("learn-more").innerHTML="Hide";
            document.getElementById("learn-more").style.margin="5px 0 0 94%";
            i=1;
        }
        else{
            console.log("CLICK");
            document.getElementById("desc").style.display="none";
            document.getElementById("learn-more").innerHTML="Learn more";
            document.getElementById("learn-more").style.margin="5px 0 0 88%";
            i=0
        }
      
    })
  })