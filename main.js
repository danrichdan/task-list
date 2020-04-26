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
  tasks.forEach(function (task, index) {
    let listItem = document.createElement("li");

    listItem.className = "list-group-item";
    listItem.setAttribute("data-key", index);
    listItem.textContent = task;
    let deleteBtn = document.createElement("button");

    deleteBtn.setAttribute("type", "button");
    deleteBtn.className = "close";
    deleteBtn.innerHTML = `<span aria-hidden="true">&times;</span>`;
    deleteBtn.addEventListener("click", function () {
      let elementToDelete = this.parentElement.getAttribute("data-key");
      console.log(elementToDelete);
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      for (let i = 0; i < tasks.length; i++) {
        if (elementToDelete == i) tasks.splice(i, 1);
      }
      localStorage.removeItem("tasks");
      localStorage.setItem("tasks", JSON.stringify(tasks));
      createAndDisplayList();
    });
    listItem.appendChild(deleteBtn);
    list.appendChild(listItem);
  });
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
