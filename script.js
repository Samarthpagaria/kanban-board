const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const addNewTaskBtn = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const done = document.querySelector("#done");
const addTaskBtn = document.querySelector("#add-task-btn");

console.log(todo, progress, done);

let dragElement = null;
const task = document.querySelectorAll(".task");

task.forEach((task) =>
  task.addEventListener("drag", (e) => {
    // console.log("dragging");
    dragElement = task;
  })
);

addNewTaskBtn.addEventListener("click", () => {
  modal.classList.toggle("active");
});

addTaskBtn.addEventListener("click", () => {
  const taskTitle = document.querySelector("input").value;
  const taskDescription = document.querySelector("textarea").value;
  const task = document.createElement("div");
  task.classList.add("task");
  task.setAttribute("draggable", "true");
  const titleEl = document.createElement("h2");
  titleEl.textContent = taskTitle;
  const descriptionEl = document.createElement("p");
  descriptionEl.textContent = taskDescription;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("button");
  if (taskTitle.trim() === "" || taskDescription.trim() === "") {
    alert("Task title and description cannot be empty");
    modal.classList.remove("active");
    return;
  }
  task.appendChild(titleEl);
  task.appendChild(descriptionEl);
  task.appendChild(deleteBtn);
  todo.appendChild(task);
  task.addEventListener("drag", (e) => {
    dragElement = task;
  });
  modal.classList.remove("active");
  document.querySelector("input").value = "";
  document.querySelector("textarea").value = "";
});
function addDragEventsOnColumn(column) {
  column.addEventListener("dragenter", (e) => {
    e.preventDefault();
    column.classList.add("hover-over");
  });
  column.addEventListener("dragleave", (e) => {
    e.preventDefault();
    column.classList.remove("hover-over");
  });
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  column.addEventListener("drop", (e) => {
    e.preventDefault();
    column.appendChild(dragElement);
    dragElement = null;
    column.classList.remove("hover-over");
  });
}
addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("button")) {
    e.target.parentElement.remove();
  }
});
