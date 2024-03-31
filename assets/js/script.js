const createTaskButton = $(".createTaskButton");

// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
  // Increment ID by one
  nextId++;
  return nextId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  //create object of task title, description, date
  //task.update?? task.append?? update task card
  //return task card -- might not need to return 

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  // use taskList -- might be similar to render employee list
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();

  const task = $("#task");
  const duedate = $("#due-date");
  const description = $("#task-description");

  const newTask = {
    id: generateTaskId(),
    task: task.val(),
    duedate: duedate.val(),
    description: description.val(),
    status: "todo",
  };

  if (newTask.task === "") {
    alert("Task cannot be blank.");
    return false;
  } else if (newTask.duedate === "") {
    alert("Due date cannot be blank.");
    return false;
  } else if (newTask.description === "") {
    alert("Description cannot be blank.");
    return false;
  } else {

  // if (newTask.task === "" || newTask.duedate === "" || newTask.description) {
  //   alert("Fill in all fields!")
  //   // return;
  // }

    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    existingTasks.unshift(newTask);

    localStorage.setItem("tasks", JSON.stringify(existingTasks));


    task.val("");
    duedate.val("");
    description.val("");
  }
}



// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  // event object passed in delete using task id taskList.remove
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  createTaskButton.on("click", handleAddTask);

});

const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})