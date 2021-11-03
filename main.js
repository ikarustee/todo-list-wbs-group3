const ul = document.querySelector("ul")
const delAllBtn= document.querySelector("#todo-delall")
const form = document.querySelector("#todo-uinput")
let elstatus;

 /*+++++++++++++ All events +++++++++++++++++ */

form.addEventListener('submit', e => {
    e.preventDefault();
    addTODO(document.getElementById('todo-text').value);
    addToLocalStorage(todoArray)
})

delAllBtn.addEventListener('click', e => { delTODO(""); }) 



/*+++++++++++++ Start of Model +++++++++++++++++ */
 
 //sample data

let todoArray = [
    { 
        id: 25262, 
        text: "Water the plants", 
        todoStatus: false 
    },

    { 
        id: 25522, 
        text: "Feed the cat", 
        todoStatus: false 
    },

    { 
        id: 255622, 
        text: "Learn javascript", 
        todoStatus: false 
    }
    ];

// needed to switch between edit and static mode
let editMode = null

// +++++ Local storage function +++++ //
function addToLocalStorage(todoArray) {
    localStorage.setItem('todoArray', JSON.stringify(todoArray))
    updateScreen()
}

function getLocalStorage() {
    const localTodos = localStorage.getItem('todoArray')
    if(localTodos) {
        todoArray = JSON.parse(localTodos)
        updateScreen()
    }
}
getLocalStorage()

/*   //  ++++++++Controller: will manipulate data given by user+++++++++ */
function addTODO(userInput){
    todoArray.push({ id: Math.floor(Math.random() * 10000), text: userInput, todoStatus: false });
    // updateScreen();
    addToLocalStorage(todoArray)
}

// delete todo

function delTODO(todoID) {
    if(todoID=="") 
        todoArray=[];
    if (todoID !== "" && todoArray.filter(el => el.id == todoID).length === 0) {
        alert("Sorry item not found, Try again");//Should we be using a fucnction and call it?   
        // updateScreen();
        addToLocalStorage(todoArray)
    }
    else {
        todoArray = todoArray.filter(el => el.id != todoID);
        // updateScreen();
        addToLocalStorage(todoArray)
    }
}

// Edit function
function editTODO(todoID){
    // console.log('Edit button')
    if(todoID == editMode) {
        // console.log('no edit mode')
        const indexID = todoArray.findIndex(el => el.id == todoID)     
        const newText = document.querySelector('.todotext.edit').innerText;
        let updatedTodo = todoArray[indexID]
        // console.log("updatesARRAY" + updatedTodo)
        // console.log("TODO ARRAY" + updatedTodo.text)
        updatedTodo.text = newText
        todoArray.splice(indexID, 1, updatedTodo)
        // console.log("Hi am " + updatedTodo.text)
        editMode = null
    } else {
        editMode = todoID
    }
    // updateScreen() replaced with localstorage function
    addToLocalStorage(todoArray)
}
// Toggle status todo
function statusTODO(todoID) {
    todoArray.forEach(el => {
        if(el.id == todoID) {
            el.todoStatus = !el.todoStatus
            addToLocalStorage(todoArray)
        }
    })
}

/*+++++++++++++ Start of view part++++++++++++++++++ */

//update page
function updateScreen() {
    document.querySelector("#todo-text").value = "";
    ul.innerHTML="";
    todoArray.forEach(el => {
        ul.innerHTML+= `
        <li class="todo id="${el.id}">
        <span id="${el.id}" class="check ${el.todoStatus ? "complete" : ""}"></span>
        ${el.id == editMode ? `<span id="${el.id}" class="todotext edit" contenteditable> ${el.text} </span>` : `<span id="${el.id}" class="todotext ${el.todoStatus ? "todo--done" : ""}"> ${el.text} </span>`}
            ${el.id == editMode ? `<button class="todo-edit" id="${el.id}"> Save </button>` : `<button class="todo-edit" id ="${el.id}"> Edit </button>`}
            <button class="todo-del" id="${el.id}" > X </button> 
        </li>
        `
    });
    const delBtn = document.querySelectorAll(".todo-del")
    for (let i = 0; i < delBtn.length; i++) {
        delBtn[i].addEventListener('click', e => {delTODO(e.target.id);})
    }
    const editBtn = document.querySelectorAll('.todo-edit') 
    for (let i = 0; i < editBtn.length; i++) {
        editBtn[i].addEventListener('click', e => editTODO(e.target.id))
    }
    const checkBtn = document.querySelectorAll(".check")
    for (let i = 0; i < checkBtn.length; i++) {
        checkBtn[i].addEventListener('click', e => statusTODO(e.target.id))   
    }
}

updateScreen(); // for the first time loading of page

// <button class="check ${el.todoStatus ? "complete" : ""}" id="${el.id}">${el.todoStatus?"Complete":"Pending"}</button>

