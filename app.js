const input = document.querySelector('.input-btn input');
const lisTask = document.querySelector('.list-task-container ul');
const message = document.querySelector('.list-task-container');
const checkbox = document.querySelector('#completed');

let tasks = [];
let taskDone = [];

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

  if(task.trim() == ''){
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
    console.log(tasks)
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
      li.addEventListener('click', (e) => {
        e.target.classList.add('done');
      });
      li.addEventListener('click', renderOrderedTask);


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

  const task = input.value;
  if(lisTask.textContent == ''){
    showError('There is nothing to remove...');
    return;
  }else{
    tasks = [];
    createHTML();
  }
}

const order = () => {
  const done = [];
  const toDo = [];

  lisTask.childNodes.forEach(el => {
    el.classList.contains('done') ? done.push(el) : toDo.push(el)
  })

  return [...toDo, ...done];

}

const renderOrderedTask = () => {
  order().forEach(el => lisTask.appendChild(el))
}

function filterDoneTask(){
  const done = [];
  const toDo = [];

  lisTask.childNodes.forEach(el => {
    el.classList.contains('done') ? done.push(el) : toDo.push(el)
  })

 return [...done];
 console.log(taskDone);

 /* else{
    createHTML();
   } */



}

 const filterDone = () => {


  if(checkbox.checked){

    let h3 = document.createElement('h3');
    h3.innerHTML = '↑--------------------Completed Tasks--------------------↑';
  
    lisTask.prepend(h3);
  filterDoneTask().forEach(el => {

      const lis = document.createElement('li');


      lis.innerHTML = `${el.textContent} <span task-id="${el.id}">x</span>`;
      lis.classList.add('done');

      lisTask.prepend(lis);
      console.log(el);
    } )
/*     lisTask.childNodes.textContent = el) */
  }else {
    
    createHTML();
  }
 }


