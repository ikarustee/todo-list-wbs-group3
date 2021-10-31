const ul = document.querySelector("ul")
const delAllBtn= document.querySelector("#todo-delall")
const form = document.querySelector("#todo-uinput")
let elstatus;

 /*+++++++++++++ All events +++++++++++++++++ */

form.addEventListener('submit', e => {

    e.preventDefault();
    addTODO(document.getElementById('todo-text').value);
    updateScreen();
})

delAllBtn.addEventListener('click', e => { delTODO(""); }) 
// delBtn.addEventListener('click', e => { delTODO(e.target.id); }) 



            /*+++++++++++++ Start of Model +++++++++++++++++ */
 
 //sample data

todoArray = [
    { 
        id: 25262, 
        text: "Water the plants", 
        todoStatus: false 
    },

    { 
        id: 25522, 
        text: "Feed the cat", 
        todoStatus: true 
    },

    { 
        id: 255622, 
        text: "Learn javascript", 
        todoStatus: false 
    }
    ];

//     
let editMode = null


        /*   //  ++++++++Controller: will manipulate data given by user+++++++++ */


function addTODO(userInput){
    todoArray.push({ id: Math.floor(Math.random() * 10000), text: userInput, todoStatus: false });
    updateScreen();
}

// delete todo

function delTODO(todoID) {
    if(todoID=="") 
        todoArray=[];
    if (todoID !== "" && todoArray.filter(el => el.id == todoID).length === 0) {
        alert("Sorry item not found, Try again");//Should we be using a fucnction and call it?   
        updateScreen();
    }
    else {
        todoArray = todoArray.filter(el => el.id != todoID);
        updateScreen();
    }
}

// Edit function
/* <-- Causes Error on line 76 --> */      
function editTODO(todoID){
    // console.log('Edit button')
    if(todoID === editMode) {
        const newText = document.querySelector(".todo__text.edit").innerText
        const updatedTodo = todoArray[todoID]
        updatedTodo.text = newText
        todoArray.splice(todoID, 1, updatedTodo)
        editMode = null
    } else {
        editMode = todoID
    }
    updateScreen()
}

function statusTODO(todoID) {
        todoArray.forEach(el => {
            if (el.id == todoID) { 
                el.todoStatus = !el.todoStatus;
                updateScreen();
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
        <li class = "${el.todoStatus ? "todo--done" : "todo"}" id ="${el.id}">
        ${el.id === editMode ? `<span class="todo__text edit" contenteditable> ${el.text} </span><br>` : `<span class="todo__text"> ${el.text} </span><br>`}
            <span class = "todo-status" id = "${el.id}">${el.todoStatus?"Complete":"Pending"}</span>
            <button class="todo-del" id ="${el.id}" > X </button> <button class="todo-edit" id = ${el.id}> Edit </button>
        </li>
        `
    });
    const delBtn = document.querySelectorAll(".todo-del")
    for (let i = 0; i < delBtn.length; i++) {
        delBtn[i].addEventListener('click', e => {delTODO(e.target.id);})
    }
    /* <-- This function did not work because. DelBtn was not defined and it was not in a loop --> */
    // document.querySelector(".todo-del").addEventListener('click', e => {delTODO(e.target.id);})
    
    const editBtn = document.querySelectorAll('.todo-edit') 
    for (let j = 0; j < editBtn.length; j++) {
        editBtn[j].addEventListener('click', e => editTODO(e.target.id))
    } 
    document.querySelector(".todo-status").addEventListener('click', e => {statusTODO(e.target.id);})   
}

    updateScreen(); // for the first time loading of page