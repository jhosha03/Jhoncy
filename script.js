const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", function () {
  // Check if input is empty
  if (taskInput.value.trim() === "") {
    alert("Please enter a task!");
    return;
  }

  // Create a new list item
  const li = document.createElement("li");
  li.textContent = taskInput.value;

  // Mark task as completed
  li.addEventListener("click", function () {
    li.classList.toggle("completed");
  });

  // Create Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  // Delete task
  deleteBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    li.remove();
  });

  // Add Delete button to the task
  li.appendChild(deleteBtn);

  // Add task to the list
  taskList.appendChild(li);

  // Clear the input box
  taskInput.value = "";
});