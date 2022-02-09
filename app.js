const input = document.querySelector('.input-btn input');
const lisTask = document.querySelector('.list-task-container ul');
const message = document.querySelector('.list-task-container');

let tasks = [];

loadLocalData();

function loadLocalData(){
  document.addEventListener('DOMContentLoaded', () => {
    tasks = JSON.parse(localStorage.getItem('tasks') || []);
    createHTML();
  });

  lisTask.addEventListener('click', deleteTask);
}

function addTask(){
  const task = input.value;
  if(task == ''){
    showError('The field is empty...');
    return;
  }

  const taskObj = {
    task,
    id: Date.now()
  }

  tasks = [...tasks, taskObj];

  createHTML();
  input.value = '';
  //console.log(task)
}

function deleteTask(e){
  if(e.target.tagName == 'SPAN'){
    const deleteId = parseInt(e.target.getAttribute('task-id'));
    tasks = tasks.filter(task => task.id !== deleteId)
    createHTML();
  }
}

//Funcion para mostrar el contenido
function createHTML(){

  clearHTML();
  if(tasks.length > 0){
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.innerHTML = `${task.task} <span task-id="${task.id}">x</span>`;

      lisTask.prepend(li);
    });
  }

  loadStorage();
}

function loadStorage(){
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Funcion para limpiar el input
function clearHTML(){
  lisTask.innerHTML = '';
}
//Funcion para mostrar error cuando el inpit este vacio
function showError(error){
  const meassageError = document.createElement('p');
  meassageError.textContent = error;
  meassageError.classList.add('error');

  message.prepend(meassageError);

  setTimeout(() => {
    meassageError.remove()
  }, 2000);
}

function deleteAll(){
  tasks = [];
  createHTML();
}