//EDIT TASK MODAL
function editTask(modal_id){
  $(document).ready(function(){
    console.log("CLICK FORM EDIT TASK");
    
    $(".edit-task-closeBtn").click(function(){
      $('#'+modal_id).hide();
    })

    $('#'+modal_id).show();
  })

}