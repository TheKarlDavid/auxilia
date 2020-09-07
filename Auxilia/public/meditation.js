$(document).ready(function(){
          
    $(".more").click(function(){
      console.log("CLICK");
      console.log(this);
      $(this).next().toggle();
    })
})