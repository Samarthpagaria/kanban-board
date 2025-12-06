const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");

const done = document.querySelector("#done");
console.log(todo, progress, done);

const task = document.querySelectorAll(".task");

task.forEach((task) =>
  task.addEventListener("drag", (e) => {
    // console.log("dragging");
  })
);

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
  });
}
addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);
