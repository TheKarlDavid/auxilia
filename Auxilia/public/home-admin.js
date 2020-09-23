//EDIT INTRO MODAL
var task_modal = document.getElementById('task-modal');
var modal_btn_task = document.getElementById('add-task-btn');
var input_task = document.getElementById('input-task');
var submit_task = document.getElementById('submit-task');
var closeBtnIntro = document.getElementsByClassName('task-closeBtn')[0];

//LISTENERS for open click, close click, outside click
modal_btn_task.addEventListener('click', openModalTask);
closeBtnIntro.addEventListener('click', closeModalTask);
window.addEventListener('click', outsideClickTask);

function openModalTask(){
    task_modal.style.display='block';
    submit_task.addEventListener('click', function(e){
    e.preventDefault();
    
    if((input_task.value != null) && (input_task.value != "")){ 
      console.log("new task added");
      task_modal.style.display='none';
    //   clearEditIntro();
    //   displayIntroData();
    }
  });
}

function closeModalTask(){
    task_modal.style.display='none';
}

function outsideClickTask(e){
  if(e.target == task_modal){
    task_modal.style.display='none';
  }
}