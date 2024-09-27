// Initialize tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render the tasks list
function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear the current list

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';

        li.innerHTML = `
            <div>
                <strong>${task.name}</strong> - ${task.date}
                <div class="category">${task.category}</div>
                <span class="priority ${task.priority.toLowerCase()}">${task.priority}</span>
            </div>
            <div>
                <button class="edit-btn" onclick="editTask(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

        li.addEventListener('click', () => toggleTaskCompletion(index));
        taskList.appendChild(li);
    });

    // Save updated tasks to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add a new task
function addTask() {
    const taskName = document.getElementById('task-name').value;
    const taskDate = document.getElementById('task-date').value;
    const taskCategory = document.getElementById('task-category').value;
    const taskPriority = document.getElementById('task-priority').value;

    if (taskName === '' || taskDate === '') {
        alert('Please fill in all fields!');
        return;
    }

    tasks.push({
        name: taskName,
        date: taskDate,
        category: taskCategory,
        priority: taskPriority,
        completed: false
    });

    // Clear the input fields
    document.getElementById('task-name').value = '';
    document.getElementById('task-date').value = '';

    renderTasks();
}

// Toggle task completion
function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Edit a task
function editTask(index) {
    const task = tasks[index];
    document.getElementById('task-name').value = task.name;
    document.getElementById('task-date').value = task.date;
    document.getElementById('task-category').value = task.category;
    document.getElementById('task-priority').value = task.priority;

    deleteTask(index); // Remove the task to re-add it as edited
}

// Initial render
renderTasks();
