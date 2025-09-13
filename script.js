
const addBtn = document.querySelector(".add-btn");
const deleteBtn = document.querySelector(".delete-btn");
const deleteAll = document.querySelector(".delete-all")
const todoInput = document.querySelector(".add-input");
const search = document.querySelector(".search")
const todoUl = document.querySelector(".todo-ul")
const firstText = document.querySelector(".first-todo")
const pCompleted = document.querySelector(".p-completed");
const pTotal = document.querySelector(".p-total");
const searchIcon = document.querySelector(".search-icon")

let total = 0;
let completed = 0;

let todos = JSON.parse(localStorage.getItem("TODOS")) || [];

const updateCounts = () => {
    total = Number(todos.length);
    completed = Number(todos.filter(todo => todo.completed).length);
    pTotal.textContent = total;
    pCompleted.textContent = completed;
    localStorage.setItem("TOTAL", total);
    localStorage.setItem("COMPLETED", completed);
}

addBtn.addEventListener("click", () => {
    if (todoInput.value.trim() === "") {
        alert("Please enter a todo");
    } else {
        const newTodo = {
            id: new Date().getTime(),
            completed: false,
            text: todoInput.value,
        }

        createListElement(newTodo);
        firstText.style.display = "none";
        todos.push(newTodo);
        updateLocalStorage();
        updateCounts()
        todoInput.value = ""
    }

})
const createListElement = ((newTodo) => {
    const li = document.createElement("li");
    li.setAttribute("id", newTodo.id);
    li.classList.add("todo-li");
    todoUl.appendChild(li);

    const p = document.createElement("p");
    const pText = document.createTextNode(newTodo.text);
    p.classList.add("todo-p");
    if(newTodo.completed) {
        p.classList.add("completed")
    }
    li.appendChild(p);
    p.appendChild(pText);

    const divIcon = document.createElement("div");
    divIcon.classList.add("div-icon")
    li.appendChild(divIcon)
    console.log(li)


    const deleteIcon = document.createElement("i");
    deleteIcon.setAttribute("class", "fa-solid fa-trash");
    divIcon.appendChild(deleteIcon);

    const checkIcon = document.createElement("i");
    checkIcon.classList.add("fa-solid", "fa-check");
    if(newTodo.completed) {
        checkIcon.classList.add("icon-check");
    }
    divIcon.appendChild(checkIcon);

})


todoUl.addEventListener("click", (e) => {

    const id = Number(e.target.closest("li").getAttribute("id"))

    if (e.target.classList.contains("fa-trash")) {
        e.target.closest("li").remove()

        todos = todos.filter(e => e.id !== id)
        updateLocalStorage()
        updateCounts()
    }


    if (e.target.classList.contains("fa-check")) {
        const isCompleted = e.target.closest("li").querySelector("p").classList.toggle("completed");
        e.target.classList.toggle("icon-check");
        const todo = todos.find(t => t.id === id);
        if (todo) todo.completed = isCompleted;
        updateLocalStorage()
        updateCounts()
    }

    if(total === 0){
        firstText.style.display = "block";   
    }

})

deleteAll.addEventListener("click", () => {
    document.querySelectorAll(".todo-ul li").forEach(li => li.remove());
    todos = [];
    updateLocalStorage()
    updateCounts()
    firstText.style.display = "block";
  
})

searchIcon.addEventListener("click", () => {
    search.focus()
})


todoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addBtn.click()
    }
})


window.addEventListener("DOMContentLoaded", (e) => {
    todoInput.focus()
    todos.forEach(todo => {
        createListElement(todo);
    })

    updateCounts()

    if(todoUl.querySelectorAll("li").length === 0) {
        firstText.style.display = "block";
    }else{
       firstText.style.display = "none"; 
    }

})


const updateLocalStorage = () => {
    localStorage.setItem("TODOS", JSON.stringify(todos));
}

