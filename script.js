// script.js

// 1. Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function() {
    // 2. Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // 3. Create the addTask Function
    function addTask() {
        // Retrieve and trim the value from the task input field.
        const taskText = taskInput.value.trim();

        // Check if taskText is not empty ("").
        if (taskText === "") {
            alert('Please enter a task.');
            return;
        }

        // 4. Task Creation and Removal:

        // Create a new li element.
        const listItem = document.createElement('li');
        // Set its textContent to taskText.
        listItem.textContent = taskText;

        // Create a new button element for removing the task.
        const removeButton = document.createElement('button');
        // Set its textContent to "Remove", and give it a class name of 'remove-btn'.
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Assign an onclick event to the remove button
        removeButton.onclick = function() {
            // Removes the li element from taskList.
            taskList.removeChild(listItem);
        };

        // Append the remove button to the li element,
        listItem.appendChild(removeButton);

        // then append the li to taskList.
        taskList.appendChild(listItem);

        // Clear the task input field
        taskInput.value = '';
    }

    // 5. Attach Event Listeners:
    
    // Add event listener to addButton that calls addTask when clicked.
    addButton.addEventListener('click', addTask);

    // Add event listener to taskInput for the 'keypress' event to allow tasks to be added by pressing the “Enter” key.
    taskInput.addEventListener('keypress', function(event) {
        // Check if event.key is equal to 'Enter' before calling addTask.
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
