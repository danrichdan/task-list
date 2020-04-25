document.querySelector(".task-button").addEventListener("click", function () {
  addToStorage();
  createAndDisplayList();
});

function addToStorage() {
  const taskField = document.getElementById("task");
  const task = taskField.value;
  taskField.value = "";
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createList() {
  const list = document.createElement("ul");
  list.className = "list-group";
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach((task) => {
    let listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.textContent = task;
    console.log(task);
    list.appendChild(listItem);
  });
  console.log(list);
  return list;
}

function addListToDom(list) {
  const listDiv = document.getElementById("list-div");
  listDiv.innerHTML = "";
  listDiv.appendChild(list);
}

function createAndDisplayList() {
  const list = createList();
  addListToDom(list);
}
