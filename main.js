// ON PAGE LOAD
if (localStorage.getItem("tasks") != null) {
  createAndDisplayList();
}

// 'ADD' BUTTON FUNTIONALITY
document.querySelector(".task-button").addEventListener("click", function () {
  const taskField = document.getElementById("task");
  if (taskField.value == "") {
    validationMsg();
  } else {
    addToStorage(taskField);
    createAndDisplayList();
  }
});

// Validation Message if Field is empty
function validationMsg() {
  const alertParentDiv = document.querySelector(".validation");
  const alertDiv = document.createElement("div");
  alertDiv.classList.add(
    "alert",
    "alert-danger",
    "alert-dismissible",
    "fade",
    "show"
  );
  alertDiv.setAttribute("role", "alert");
  alertDiv.innerHTML = `
  <strong>Please add a Task</strong>
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
  `;
  alertParentDiv.appendChild(alertDiv);
  setTimeout(function () {
    alertDiv.remove();
  }, 3000);
}

// Add tasks to local storage
function addToStorage(taskField) {
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

/****************
 * DOM --- LIST ITEMS
 *****************/

// Create the list and Call Add List to DOM
function createAndDisplayList() {
  const list = createList();
  addListToDom(list);
}

// Add the List to the DOM
function addListToDom(list) {
  const listDiv = document.getElementById("list-div");
  listDiv.innerHTML = "";
  listDiv.appendChild(list);
}

// Create the list to add to DOM
function createList() {
  const list = document.createElement("ul");
  list.className = "list-group";
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach(function (task, index) {
    let listItem = createListItems(task, index);
    list.appendChild(listItem);
  });

  return list;
}

// Create Individual List Items
function createListItems(task, index) {
  let listItem = document.createElement("li");
  listItem.className = "list-group-item";
  listItem.setAttribute("data-key", index);
  listItem.textContent = task;
  let deleteBtn = createDeleteBtn();
  listItem.appendChild(deleteBtn);
  return listItem;
}

/****************
 * DOM --- DELETE BUTTON
 *****************/

// Create the Delete Button and the Delete Function
function createDeleteBtn() {
  let deleteBtn = delBtn();
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
  return deleteBtn;
}

// Create the Delete Button DOM Elements
function delBtn() {
  let deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("type", "button");
  deleteBtn.className = "close";
  deleteBtn.innerHTML = `<span aria-hidden="true">&times;</span>`;
  return deleteBtn;
}
