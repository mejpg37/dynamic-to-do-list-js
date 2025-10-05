// A global array to keep track of all tasks
let tasks = [];

// Function to save the current tasks array to Local Storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to create and add a task to the DOM
// The 'save' parameter determines if the task should be saved to Local Storage and added to the 'tasks' array.
function addTask(taskText, save = true) {
    // Check if taskText is empty (only when called from the button/enter key)
    if (taskText === undefined) {
        // Select the input element
        const taskInput = document.getElementById('task-input');
        taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task.");
            return; // Exit the function if input is empty
        }
    }

    // Select the task list element
    const taskList = document.getElementById('task-list');

    // 1. Create the new list item (li)
    const listItem = document.createElement('li');
    listItem.textContent = taskText;

    // 2. Create the remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = "Remove";
    removeButton.className = 'remove-btn';

    // 3. Assign an onclick event to the remove button
    removeButton.onclick = function() {
        // Get the parent li element
        const itemToRemove = this.parentElement;
        const textToRemove = itemToRemove.textContent.replace('Remove', '').trim(); // Get the task text

        // Remove the task from the global 'tasks' array
        tasks = tasks.filter(task => task !== textToRemove);

        // Update Local Storage
        saveTasks();

        // Remove the li element from the DOM
        taskList.removeChild(itemToRemove);
    };

    // 4. Append the remove button to the li element
    listItem.appendChild(removeButton);

    // 5. Append the li to the task list (ul)
    taskList.appendChild(listItem);

    // If the call came from user input (i.e., not loading from local storage)
    if (save) {
        // Add the new task to the global array
        tasks.push(taskText);
        
        // Save the updated array to Local Storage
        saveTasks();

        // Clear the input field
        const taskInput = document.getElementById('task-input');
        taskInput.value = "";
    }
}


// Function to load tasks from Local Storage when the page loads
function loadTasks() {
    // Get stored tasks or an empty array if none exist
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    
    // Set the global tasks array
    tasks = storedTasks;

    // Create task elements in the DOM for each stored task
    storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' prevents re-saving and clearing input
}


// Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', () => {
    // Load existing tasks from Local Storage
    loadTasks();
    
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');

    // Attach Event Listener to the Add Task button
    addButton.addEventListener('click', () => {
        addTask(); // Call addTask function
    });

    // Attach Event Listener to the input field for the 'Enter' key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(); // Call addTask function
        }
    });
});
