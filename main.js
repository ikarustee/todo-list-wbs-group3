const ul = document.querySelector("ul")
const delAllBtn= document.querySelector("#todo-delall")
 
const editBtn = document.querySelector('.todo-edit') 
const form = document.querySelector("#todo-uinput")
let elstatus;
 /*+++++++++++++ All events +++++++++++++++++ */

form.addEventListener('submit', e => {

    e.preventDefault();
    addTODO(document.getElementById('todo-text').value);
    updateScreen();
})

editBtn.addEventListener('click', e => { /*tanyas logic*/ })
delAllBtn.addEventListener('click', e => { delTODO(""); }) 
/* delBtn.addEventListener('click', e => { delTODO(e.target.id); }) 
 */


            /*+++++++++++++ Start of Model +++++++++++++++++ */
 
 //sample data

todoArray = [{ id: 25262, text: "blabla", todoStatus: true },
{ id: 25522, text: "blabla", todoStatus: false },
{ id: 255622, text: "blabla", todoStatus: true }];


        /*   //  ++++++++Controller: will manipulate data given by user+++++++++ */


function addTODO(userInput){
    todoArray.push({ id: Math.floor(Math.random() * 10000), text: userInput, todoStatus: false });
    updateScreen();
}

// delet todo

function delTODO(todoID) {
    if(todoID=="") todoArray=[];
        if (todoID !== "" && todoArray.filter(el => el.id == todoID).length === 0) {
            alert("Sorry item not found, Try again");//Should we be using a fucnction and call it?   
            updateScreen();
        }
        else {
            todoArray = todoArray.filter(el => el.id != todoID);
            updateScreen();
        }
    }


function statusTODO(todoID) {
        todoArray.forEach(el => {
            if (el.id == todoID) { 
                el.todoStatus = !el.todoStatus;
                updateScreen();
            }
    })
    }
    
    function editTODO(todoID){
        console.log("I ama there hahahah")
        //Tanya logic console.log("I ama there hahahah")
    }


                /*+++++++++++++ Start of view part++++++++++++++++++ */

//update page
function updateScreen()
    {
        document.querySelector("#todo-text").value = "";
        ul.innerHTML="";
        todoArray.forEach(el => {
        ul.innerHTML+= `<li class = "todo-items" id = ${el.id}> ${el.text} </li>
                        <span class = "todo-status" id = ${el.id}>${el.todoStatus?"Complete":"Pending"}</span>
                        <button class="todo-del" id = ${el.id} > X </button> <button class="todo-edit" id = ${el.id}> Edit </button>
                        `
    });
    
    document.querySelector(".todo-del").addEventListener('click', e => {delTODO(e.target.id);}) 
    document.querySelector(".todo-edit").addEventListener('click', e => {editTODO(e.target.id);}) 
    document.querySelector(".todo-status").addEventListener('click', e => {statusTODO(e.target.id);})   
}

    updateScreen(); // for the first time loading of page