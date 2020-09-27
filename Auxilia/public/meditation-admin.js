//ADD MEDITATION MODAL
var meditation_modal = document.getElementById('meditation-modal');
var modal_btn_meditation = document.getElementById('add-meditation-btn');
var form_meditation = document.getElementById('form-add-meditation');
var submit_meditation = document.getElementById('submit-meditation');
var closeBtnAdd = document.getElementsByClassName('meditation-closeBtn')[0];

//LISTENERS for open click, close click, outside click
modal_btn_meditation.addEventListener('click', openModalMeditation);
closeBtnAdd.addEventListener('click', closeModalMeditation);
window.addEventListener('click', outsideClickMeditation);

function openModalMeditation(){
  meditation_modal.style.display='block';
    submit_meditation.addEventListener('click', function(e){
    e.preventDefault();
    console.log("CLICK FORM ADD");
    
    if((form_meditation.inputTitle.value != null) && (form_meditation.inputTitle.value != "") && 
      (form_meditation.inputDesc.value != null) && (form_meditation.inputDesc.value != "") &&
      (form_meditation.inputLink.value != null) && (form_meditation.inputLink.value != "") ){ 
      console.log("new meditatioon video added");
      console.log(form_meditation.inputTitle.value);
      console.log(form_meditation.inputDesc.value);
      console.log(form_meditation.inputLink.value);

      meditation_modal.style.display='none';
      clearAddMeditation();

    }
  });
}

function closeModalMeditation(){
    meditation_modal.style.display='none';
}

function outsideClickMeditation(e){
  if(e.target == meditation_modal){
    meditation_modal.style.display='none';
  }
}

function clearAddMeditation(){
  $("form input#inputTitle").val("");
  $("form input#inputDesc").val("");
  $("form input#inputLink").val("");
}



//EDIT MEDITATION MODAL
var edit_meditation = document.getElementById('edit-meditation-modal');
var form_edit_meditation = document.getElementById('form-edit-meditation');
var submit_edit_meditation = document.getElementById('submit-edit-meditation');
var closeBtnEdit = document.getElementsByClassName('edit-meditation-closeBtn')[0];

//LISTENERS for open click, close click, outside click
closeBtnEdit.addEventListener('click', closeEditModalMeditation);
window.addEventListener('click', outsideClickEditMeditation);

function editMeditation(){
  console.log("CLICK");

  edit_meditation.style.display='block';
  submit_edit_meditation.addEventListener('click', function(e){
  e.preventDefault();
  console.log("HERE");
    
    if((form_edit_meditation.inputEditTitle.value != null) && (form_edit_meditation.inputEditTitle.value != "") && 
      (form_edit_meditation.inputEditDesc.value != null) && (form_edit_meditation.inputEditDesc.value != "") &&
      (form_edit_meditation.inputEditLink.value != null) && (form_edit_meditation.inputEditLink.value != "") ){ 
      console.log("new meditatioon video added");
      console.log(form_edit_meditation.inputEditTitle.value);
      console.log(form_edit_meditation.inputEditDesc.value);
      console.log(form_edit_meditation.inputEditLink.value);

      edit_meditation.style.display='none';
      // clearEditMeditation();

    }
  });

}

function closeEditModalMeditation(){
  edit_meditation.style.display='none';
}

function outsideClickEditMeditation(e){
  if(e.target == edit_meditation){
    edit_meditation.style.display='none';
  }
}

// function clearEditMeditation(){
//   $("form input#inputEditTitle").val("");
//   $("form input#inputEditDesc").val("");
//   $("form input#inputEditLink").val("");
// }