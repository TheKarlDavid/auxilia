//ADD MEDITATION MODAL
$(document).ready(function(){
  $(".add-meditation").click(function(){
    console.log("CLICK FORM ADD");

    $(".meditation-closeBtn").click(function(){
      $('#meditation-modal').hide();
    })

    $('#meditation-modal').show();

  })
})

//EDIT MEDITATION MODAL
function editMeditation(meditation_id, modal_id){
  $(document).ready(function(){
    console.log("CLICK FORM EDIT");
    
    $(".edit-meditation-closeBtn").click(function(){
      $('#'+modal_id).hide();
    })

    $('#'+modal_id).show();
  })

}

// DELETE MEDITATION 
$("svg#delete_svg").click(function(){
  let id = $(this).attr("data-id")
  console.log(id)
  $("input#delete_id").val(id)
  $("form#delete-form").submit()
})

