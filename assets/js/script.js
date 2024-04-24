const title = $("#task");
const description = $("#task-description");
const dueDate = $("#due-date");
const createTaskButton = $(".submitTaskButton");


// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 0;

// Todo: create a function to generate a unique task id
function generateTaskId() {
  // Increment ID by one
  nextId++;
  localStorage.setItem("nextId", JSON.stringify(nextId));
  return nextId;
}

// Pick a due date for task
$(function () {
  $("#due-date").datepicker();
});


//create object of task title, description, date
//task.update?? task.append?? update task card
//return task card -- might not need to return 
// Todo: create a function to create a task card
function createTaskCard(task) {


  const taskCard =
    `
  <div class="card-body">
    <h5 class="card-title">${task.task}</h5>
    <p class="card-text">${task.description}</p>
    <p class="card-text">Due Date: ${task.duedate}</p>
    <button type="button" class="btn btn-danger delete-task">Delete</button>
  </div>
  `
  return taskCard;
}


// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  // use taskList -- might be similar to render employee list
  $("#todo-cards").empty();
  $("#in-progress-cards").empty();
  $("#done-cards").empty();

  taskList.forEach((task) => {
    const taskCard = createTaskCard(task);
    if (task.status === "todo") {
      $("#todo-cards").append(taskCard);
    } else if (task.status === "in-progress") {
      $("#in-progress-cards").append(taskCard);
    } else if (task.status === "done") {
      $("#done-cards").append(taskCard);
    }
  });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();

    // Selecting ID from html
    const newTitle = title.val();
    const newDueDate = dueDate.val();
    const newDescription = description.val();
  
    // Object creation with values, new task ID, and todo status
    const newTask = {
      id: generateTaskId(),
      task: newTitle,
      duedate: newDueDate,
      description: newDescription,
      status: "todo",
    };


  if (!newTask.task || !newTask.duedate || !newTask.description) {
    alert("All fields required!");
    return;
  }

  // const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  taskList.unshift(newTask);

  localStorage.setItem("tasks", JSON.stringify(taskList));
  taskList = JSON.parse(localStorage.getItem("tasks")) || [];

  $("#formModal").modal("hide");

  title.val("");
  dueDate.val("");
  description.val("");

  renderTaskList();
};



// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  const deleteBtn = $(event.target);
  deleteBtn.closest('.card-body').remove();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  $('.card-body').draggable({
    snap: true,
    snap: '.snap-target'
  });
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();
  handleDrop();
  $("#myModal").on("submit", handleAddTask);
  $('.delete-task').on('click', handleDeleteTask);
});

