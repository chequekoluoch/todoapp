  //selectors
  const todoInput=document.querySelector('.todo-input')
  const todoButton=document.querySelector('.todo-button')
  const todoList=document.querySelector('.todo-list')
  const filterOption=document.querySelector(".filter-todo")
  
  // Event Listeners
  document.addEventListener('DOMContentLoaded',getTodos )
  todoButton.addEventListener('click', addTodo)
  todoList.addEventListener('click', deleteCheck) 
  filterOption.addEventListener("click", filterTodo) 


  //functions
  function addTodo(evt){
      evt.preventDefault()
           console.log("hey")
      
      //create div
const todoDiv = document.createElement("div")
todoDiv.classList.add("todo");

//create li
const newTodo = document.createElement("li")
newTodo.classList.add("todo-item");
newTodo.innerText=todoInput.value
todoDiv.appendChild(newTodo)


// add to do to local storage
saveLocalTodos(todoInput.value)
//check mark button
const completedButton = document.createElement("button")
completedButton.innerHTML=`<i class='fa fa-check'></i>`
completedButton.classList.add("complete-btn");
todoDiv.appendChild(completedButton)

//trash button
const trashButton = document.createElement("button")
trashButton.innerHTML=`<i class='fa fa-trash'></i>`
trashButton.classList.add("trash-btn");
todoDiv.appendChild(trashButton)
 
//todoList append
todoList.appendChild(todoDiv)
todoInput.value="";
  }

  function deleteCheck(e){
   // DELETE TODO
   const item=e.target;
   if(item.classList[0]==='trash-btn'){
       const todo = item.parentElement
       todo.classList.add('fall')
       removeLocalTodos(todo)
       todo.addEventListener("transitionend",function(){
           todo.remove()
       })
       
   }
   //CHECK MARK
   if(item.classList[0]==='complete-btn'){
    const todo = item.parentElement
    todo.classList.toggle("completed")
}
   
  }

  function filterTodo(e){
   const todos=todoList.childNodes;
   console.log(todos)
   todos.forEach(todo=>{
       switch(e.target.value){
           case "all":
               todo.style.display="flex";
               break;
           case "completed":
               if(todo.classList.contains('completed')){
                   todo.style.display='flex';
               }else{
                   todo.style.display = "none";
               }
               break;
           case "uncompleted":
            if(!todo.classList.contains('completed')){
                todo.style.display='flex';
            }else{
                todo.style.display = "none";
            } 
            break;
       }

   })
  }

  function saveLocalTodos(todo){
      let todos;
      todos.push(todo);
      localStorage.setItem('todos', JSON.stringify(todos));
              if(localStorage.getItem("todos") === null){
                  todos=[];
              }else{
                  todos=JSON.parse(localStorage.getItem("todos"))
              }
  }

  function getTodos(){
      //let todos;
      if(localStorage.getItem("todos") === null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(todo=>{
        const todoDiv = document.createElement("div")
todoDiv.classList.add("todo");

//create li
const newTodo = document.createElement("li")
newTodo.classList.add("todo-item");
newTodo.innerText=todo
todoDiv.appendChild(newTodo)

//check mark button
const completedButton = document.createElement("button")
completedButton.innerHTML=`<i class='fa fa-check'></i>`
completedButton.classList.add("complete-btn");
todoDiv.appendChild(completedButton)

//trash button
const trashButton = document.createElement("button")
trashButton.innerHTML=`<i class='fa fa-trash'></i>`
trashButton.classList.add("trash-btn");
todoDiv.appendChild(trashButton)
 
//todoList append
todoList.appendChild(todoDiv)
    })
  }
  
  function removeLocalTodos(todo){
       let todos;
       if(localStorage.getItem("todos") === null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"))
    }
    const todoIndex=todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1)
    localStorage.setItem('todos', JSON.stringify(todos));
  }