//EDIT TASK MODAL
function editTask(){
  $(document).ready(function(){
    console.log("CLICK FORM EDIT TASK");
    console.log($("input#date").val())
    $(".edit-task-closeBtn").click(function(){
      $('.addModalTask').hide();
    })

    $('.addModalTask').show();
  })

}