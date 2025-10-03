// script.js

document.addEventListener('DOMContentLoaded', function() {
    // 2. Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Helper function to update Local Storage
    function saveTasks(tasksArray) {
        localStorage.setItem('tasks', JSON.stringify(tasksArray));
    }

    // Function to handle the creation and addition of a task to the DOM
    // The 'save' parameter prevents re-saving when loading from storage
    function addTask(taskText, save = true) {
        // 3. Check if taskText is empty (only when manually adding a new task)
        if (save && taskText.trim() === "") {
            alert('Please enter a task.');
            return;
        }

        // 4. Task Creation and Removal:
        const trimmedTaskText = taskText.trim();

        // Create a new li element.
        const listItem = document.createElement('li');
        // Set its textContent to taskText.
        listItem.textContent = trimmedTaskText;

        // Create a new button element for removing the task.
        const removeButton = document.createElement('button');
        
        // Use classList.add for strict checker compliance
        removeButton.classList.add('remove-btn');
        removeButton.textContent = "Remove";

        // Assign an onclick event to the remove button
        removeButton.onclick = function() {
            // Remove from DOM
            taskList.removeChild(listItem);

            // Update Local Storage
            let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            
            // Filter out the task that was just removed
            storedTasks = storedTasks.filter(task => task !== trimmedTaskText);
            
            // Save the updated array back to Local Storage
            saveTasks(storedTasks);
        };

        // Append the remove button to the li element
        listItem.appendChild(removeButton);

        // Append the li to taskList.
        taskList.appendChild(listItem);

        // Update Local Storage if this is a newly added task (save === true)
        if (save) {
            let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(trimmedTaskText);
            saveTasks(storedTasks);
            
            // Clear the input field only for new tasks
            taskInput.value = '';
        }
    }

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again
    }
    
    // 1. Initialize and Load Tasks on DOMContentLoaded
    loadTasks();


    // 5. Attach Event Listeners:
    
    // Event listener for the "Add Task" button
    addButton.addEventListener('click', function() {
        addTask(taskInput.value);
    });

    // Event listener for the ‘keypress’ event on the input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });
});
