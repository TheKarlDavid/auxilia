//EDIT TASK MODAL
var edit_task = document.getElementById('edit-task-modal');
var form_task = document.getElementById('form-edit-task');
var submit_edit_task = document.getElementById('submit-edit-task');
var closeBtnEdit = document.getElementsByClassName('edit-task-closeBtn')[0];

//LISTENERS for open click, close click, outside click
closeBtnEdit.addEventListener('click', closeEditModal);
window.addEventListener('click', outsideClickEdit);

function editTask(){
  console.log("CLICK");

  edit_task.style.display='block';
  submit_edit_task.addEventListener('click', function(e){
  e.preventDefault();
  console.log("HERE");
    
    // if((form_task.inputEditTitle.value != null) && (form_task.inputEditTitle.value != "") && 
    //   (form_task.inputEditDesc.value != null) && (form_task.inputEditDesc.value != "") &&
    //   (form_task.inputEditLink.value != null) && (form_task.inputEditLink.value != "") ){ 
    //   console.log("new meditatioon video added");
    //   console.log(form_task.inputEditTitle.value);
    //   console.log(form_task.inputEditDesc.value);
    //   console.log(form_task.inputEditLink.value);

    //   edit_task.style.display='none';
    //   // closeEditModal();

    // }
  });

}

function closeEditModal(){
    edit_task.style.display='none';
}

function outsideClickEdit(e){
  if(e.target == edit_task){
    edit_task.style.display='none';
  }
}