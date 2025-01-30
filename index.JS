const inputEl = document.getElementById("input");
const addButton = document.getElementById("add-Icon");
const ulEl = document.querySelector(".task-list");
const allSelectedEl = document.getElementById("tick");
const allButton = document.getElementById("all");
const completedButton = document.getElementById("completed");
const uncompleteButton = document.getElementById("uncomplete");
const clearEl = document.getElementById("clear");
const countEl = document.getElementById("count");

addButton.addEventListener("click", listCreation);
uncompleteButton.addEventListener("click", () => uncompleteTasks());
allButton.addEventListener("click", () => allTasks());

addButton.addEventListener("mouseover", () => {
  addButton.style.backgroundColor = "green";
  addButton.style.borderRadius = "50%";
  addButton.style.transform = "scale(1.1)";
});
addButton.addEventListener("mouseout", () => {
  addButton.style.backgroundColor = "white";
  addButton.style.transform = "scale(1)";
});

let tasksArray = [];
let completedTasksArray = [];

clearEl.style.cursor = "pointer";
clearEl.addEventListener("mouseover", () => {
  clearEl.style.transform = "scale(1.1)";
});
clearEl.addEventListener("mouseout", () => {
  clearEl.style.transform = "scale(1)";
});
clearEl.addEventListener("click", () => {
  // tasksArray = [];
  completedTasksArray = [];
  completedTasksArray.length = 0;
  if (countEl) {
    countEl.textContent = tasksArray.length;
  }
  ulEl.innerHTML = "";
});

inputEl.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    listCreation();
  }
});
inputEl.style.border = "none";
inputEl.style.outline = "none";

function listCreation() {
  // tasksArray.length = 0;
  const text = inputEl.value;
  if (text != "") {
    const task = {
      title: text,
      isCompleted: false,
    };
    inputEl.value = "";
    tasksArray.push(task);
    if (countEl) {
      countEl.textContent = tasksArray.length;
    }
    addingTask();
  }
}

function addingList(title, i) {
  const li = document.createElement("li");
  const circle = document.createElement("div");
  const paraEl = document.createElement("p");
  const listButton = document.createElement("button");
  const deleteBtnImage = document.createElement("img");

  circle.style.width = "2rem";
  circle.style.height = "2rem";
  circle.style.backgroundColor = "white";
  circle.style.borderRadius = "50%";
  circle.style.marginRight = ".5rem";
  circle.style.cursor = "pointer";
  circle.addEventListener("mouseover", () => {
    circle.style.backgroundColor = "green";
    circle.style.transform = "scale(1.2)";
  });
  circle.addEventListener("mouseout", () => {
    circle.style.backgroundColor = "white";
    circle.style.transform = "scale(1)";
  });

  paraEl.textContent = title;
  paraEl.style.width = "21rem";
  paraEl.style.fontWeight = "bolder";
  paraEl.style.fontSize = "1.2rem";

  deleteBtnImage.setAttribute("src", "delete.png");
  deleteBtnImage.style.width = "2rem";
  deleteBtnImage.style.height = "2rem";
  deleteBtnImage.style.marginLeft = ".5rem";
  deleteBtnImage.style.cursor = "pointer";
  deleteBtnImage.addEventListener("mouseover", () => {
    deleteBtnImage.style.transform = "scale(1.3)";
    deleteBtnImage.style.backgroundColor = "red";
    deleteBtnImage.style.borderRadius = "50%";
  });
  deleteBtnImage.addEventListener("mouseout", () => {
    deleteBtnImage.style.transform = "scale(1)";
  });

  listButton.style.disabled = true;
  listButton.style.paddingLeft = "3rem";
  listButton.appendChild(circle);
  listButton.appendChild(paraEl);
  listButton.appendChild(deleteBtnImage);
  listButton.style.display = "flex";
  listButton.style.alignItems = "center";
  listButton.style.width = "26rem";
  listButton.style.height = "auto";
  listButton.style.marginRight = "2.5rem";
  listButton.style.marginTop = ".5rem";
  listButton.style.paddingLeft = "1rem";
  listButton.style.borderRadius = ".5rem";
  listButton.style.border = "none";
  listButton.style.backgroundColor = "rgb(160, 155, 155)";

  listButton.addEventListener("mouseover", () => {
    listButton.style.backgroundColor = "rgb(245, 126, 15)";
  });
  listButton.addEventListener("mouseout", () => {
    listButton.style.backgroundColor = "rgb(160, 155, 155)";
  });

  li.style.listStyle = "none";
  li.appendChild(listButton);
  ulEl.appendChild(li);
  tick(circle);
  clickCompletedTask(circle, i);
  deleteTask(deleteBtnImage, i);
}

function addingTask() {
  ulEl.innerHTML = " ";
  tasksArray.forEach((task, i) => {
    addingList(task.title, i);
  });
}
allButton.style.cursor = "pointer";
allButton.addEventListener("mouseover", () => {
  allButton.style.transform = "scale(1.15)";
});
allButton.addEventListener("mouseout", () => {
  allButton.style.transform = "scale(1)";
});
completedButton.style.cursor = "pointer";
completedButton.addEventListener("mouseover", () => {
  completedButton.style.transform = "scale(1.15)";
});
completedButton.addEventListener("mouseout", () => {
  completedButton.style.transform = "scale(1)";
});
uncompleteButton.style.cursor = "pointer";
uncompleteButton.addEventListener("mouseover", () => {
  uncompleteButton.style.transform = "scale(1.15)";
});
uncompleteButton.addEventListener("mouseout", () => {
  uncompleteButton.style.transform = "scale(1)";
});
completedButton.addEventListener("click", () =>
  completedTasks(completedTasksArray)
);

function deleteTask(deleteBtnImage, i) {
  deleteBtnImage.addEventListener("click", () => {
    tasksArray.splice(i, 1);
    if (countEl) {
      countEl.textContent = tasksArray.length;
    }
    addingTask();
  });
}

function clickCompletedTask(circle, i) {
  circle.addEventListener("click", () => {
    const [spliced] = tasksArray.splice(i, 1);
    if (spliced) {
      completedTasksArray.push(spliced);
    }
    if (countEl) {
      countEl.textContent = tasksArray.length;
    }
    addingTask();
  });
}

function completedTasks(deleted) {
  ulEl.innerHTML = " ";
  if (countEl) {
    countEl.textContent = tasksArray.length;
  }
  deleted.forEach((task, i) => {
    addingList(task.title, i);
    console.log(task);
  });
}

function uncompleteTasks() {
  console.log(tasksArray.length);
  if (countEl) {
    countEl.textContent = tasksArray.length;
  }
  addingTask();
}
function allTasks() {
  const allArray = [...tasksArray, ...completedTasksArray];
  ulEl.innerHTML = "";
  allArray.forEach((task, index) => addingList(task.title, index));
}

function tick(cir) {
  allSelectedEl.addEventListener("click", () => {
    cir.style.cursor = "pointer";
    cir.style.backgroundColor = "lightgreen";
    cir.style.border = "4px solid black";
  });
}
