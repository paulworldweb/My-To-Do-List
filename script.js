let tasks = [];

const inputTask = document.getElementById("inputTask");

const addBtn = document.getElementById("addBtn");

const taskList = document.getElementById("taskList");


function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const stored = localStorage.getItem("tasks");

    if (stored) {
        tasks = JSON.parse(stored);
    }
}



function renderTasks() {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        taskList.innerHTML = "<p>No tasks yet!</p>";
        return;
    }

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add("completed");
        }

        li.addEventListener("click", () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";


        deleteBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        })

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

function addTask() {
    const text = inputTask.value.trim();

    if (text !== "") {
        tasks.push({ text: text, completed: false});
        saveTasks();
        renderTasks();
        inputTask.value = "";
        inputTask.focus(); 

    }
}



addBtn.addEventListener("click", addTask);

inputTask.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
});

loadTasks();
renderTasks();