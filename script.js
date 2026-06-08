let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateProgress() {

    const total = tasks.length;

    const completed =
        tasks.filter(task => task.completed).length;

    const pending = total - completed;

    const percentage =
        total === 0
            ? 0
            : Math.round((completed / total) * 100);

    document.getElementById("progressFill").style.width =
        percentage + "%";

    document.getElementById("progressPercent").textContent =
        percentage + "%";

    document.getElementById("totalTasks").textContent =
        total;

    document.getElementById("completedTasks").textContent =
        completed;

    document.getElementById("pendingTasks").textContent =
        pending;
}

function renderTasks() {

    const taskList =
        document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <div class="task-info ${task.completed ? "completed" : ""}">
                <strong>${task.text}</strong>
                <div class="task-date">
                    ${task.date || "No Date Selected"}
                </div>
            </div>

            <div class="actions">
                <i class="fas fa-check"
                onclick="toggleComplete(${index})"></i>

                <i class="fas fa-pen"
                onclick="editTask(${index})"></i>

                <i class="fas fa-trash"
                onclick="deleteTask(${index})"></i>
            </div>
        `;

        taskList.appendChild(li);
    });

    updateProgress();
}

function addTask() {

    const taskInput =
        document.getElementById("taskInput");

    const taskDate =
        document.getElementById("taskDate");

    if(taskInput.value.trim() === ""){
        alert("Please Enter Task");
        return;
    }

    tasks.push({
        text: taskInput.value,
        date: taskDate.value,
        completed:false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
    taskDate.value = "";
}

function toggleComplete(index){

    tasks[index].completed =
    !tasks[index].completed;

    saveTasks();
    renderTasks();
}

function editTask(index){

    const updatedTask =
    prompt("Edit Task", tasks[index].text);

    if(updatedTask &&
       updatedTask.trim() !== ""){

        tasks[index].text = updatedTask;

        saveTasks();
        renderTasks();
    }
}

function deleteTask(index){

    if(confirm("Delete this task?")){

        tasks.splice(index,1);

        saveTasks();
        renderTasks();
    }
}

renderTasks();