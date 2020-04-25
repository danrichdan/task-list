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
    let deleteBtn = document.createElement("button");
    // let closeIcon = document.createElement("span");
    // closeIcon.setAttribute("aria-hidden", "true");
    // closeIcon.textContent = "&times;";
    // deleteBtn.className = "close";
    deleteBtn.setAttribute("type", "button");
    deleteBtn.setAttribute("aria-label", "Close");
    deleteBtn.innerHTML = `<span aria-hidden="true">&times;</span>`;
    // deleteBtn.appendChild(closeIcon);
    listItem.className = "list-group-item";
    listItem.textContent = task;
    listItem.appendChild(deleteBtn);
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
