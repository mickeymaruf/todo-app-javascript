const addTodo = () => {
    const taskField = document.getElementById("task-field");
    const taskText = taskField.value;
    if(!taskText){
        document.getElementById("warning").classList.remove("hidden");
        return;
    }
    taskField.value = "";
    storeTodo(taskText);
}


const storeTodo = (taskText) => {
    let todoList = [];
    if(localStorage.getItem("TODO_LIST")){
        todoList = JSON.parse(localStorage.getItem("TODO_LIST"));
    }
    todoList.push(taskText);
    localStorage.setItem("TODO_LIST", JSON.stringify(todoList));

    showTodo();
}

const showTodo = () => {
    let todoList = [];
    if(localStorage.getItem("TODO_LIST")){
        todoList = JSON.parse(localStorage.getItem("TODO_LIST"));
    }

    const todos = document.getElementById('todos');
    todos.textContent = '';
    todoList.forEach((todo, index) => {
        const li = document.createElement('li');
        li.classList.add('bg-indigo-500', 'text-white', 'fw-meduim', 'p-3', 'rounded');
        li.innerHTML = `
        <p class="flex justify-between items-center">
            ${todo}
            <svg onclick='removeTodo(${index})' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                </svg>                          
        </p>
        `;
        todos.appendChild(li);
    })
}

const removeTodo = (index) => {
    const todoList = JSON.parse(localStorage.getItem("TODO_LIST"));
    const todoCompleted = todoList.splice(index, 1);
    localStorage.setItem("TODO_LIST", JSON.stringify(todoList));
    
    completeTodo(todoCompleted[0]);

    showTodo();
}

const completeTodo = (todoCompleted) => {
    let taskCompleted = [];
    if(localStorage.getItem("TODO_COMPLETED")){
        taskCompleted = JSON.parse(localStorage.getItem("TODO_COMPLETED"));
    }
    taskCompleted.push(todoCompleted);
    localStorage.setItem("TODO_COMPLETED", JSON.stringify(taskCompleted));

    showCompleteTodos();
    showHideClearBtn();
}

const showCompleteTodos = () => {
    let completeTodos = [];
    if(localStorage.getItem("TODO_COMPLETED")){
        completeTodos = JSON.parse(localStorage.getItem("TODO_COMPLETED"));
    }

    const todosCompleted = document.getElementById("todos-completed");
    todosCompleted.textContent = '';
    completeTodos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.classList.add('bg-gray-700', 'text-white', 'fw-meduim', 'p-3', 'rounded');
        li.innerHTML = `
        <p class="flex justify-between items-center line-through">
            ${todo}                       
        </p>
        `;
        todosCompleted.appendChild(li);
    })
}

showCompleteTodos();
showTodo();

const clearCompletedTodos = () => {
    localStorage.removeItem("TODO_COMPLETED");
    showCompleteTodos();
    showHideClearBtn();
}

const showHideClearBtn = () => {
    const clearBtn = document.getElementById("clear-btn");
    if(localStorage.getItem("TODO_COMPLETED")){
        clearBtn.classList.remove("hidden");
    }else{
        clearBtn.classList.add("hidden");
    }
}

showHideClearBtn();

const xrossAlert = () => {
    document.getElementById("warning").classList.add("hidden");
}