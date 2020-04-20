// Global Variables
const taskField = document.querySelector(".task-field");
const taskBtn = document.querySelector(".task-button");
const taskListSection = document.querySelector(".task-list-section .card-body");
const itemArray = [];

taskBtn.addEventListener("click", addTask);

function addTask() {
  let task = taskField.value;
  if (task == "") {
    alert("Please enter a value");
  } else {
    taskListSection.innerHTML = "";
    itemArray.push(task);
    taskField.value = "";
    addListToDom(itemArray);
  }
}

function createDeleteBtn() {
  let deleteBtn = document.createElement("button");
  deleteBtn.className = "close";
  deleteBtn.setAttribute("type", "button");
  deleteBtn.innerHTML = "<span aria-hidden='true'>&times;</span>";
  deleteItem(itemArray, deleteBtn);
  return deleteBtn;
}

function createListItem(itemArray, i) {
  let listItem = document.createElement("li");
  listItem.className = "list-group-item";
  listItem.id = i;
  listItem.textContent = itemArray[i];
  return listItem;
}

function createList(itemArray) {
  let ul = document.createElement("ul");
  ul.className = "list-group";

  for (let i = 0; i < itemArray.length; i++) {
    let listItem = createListItem(itemArray, i);
    let deleteBtn = createDeleteBtn();
    listItem.appendChild(deleteBtn);
    ul.appendChild(listItem);
  }
  return ul;
}

function addListToDom(itemArray) {
  let ul = createList(itemArray);
  taskListSection.appendChild(ul);
}

function deleteItem(itemArray, deleteBtn) {
  deleteBtn.addEventListener("click", function (e) {
    let self = e.target.parentElement.parentElement;
    itemArray.splice(self.id, 1);
    self.remove();
    taskListSection.innerHTML = "";
    addListToDom(itemArray);
  });
}
