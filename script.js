function myTimer() {
  const d = new Date();
  const month = d.toLocaleString('default', { month: 'long' });
  const minutes = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
  const hours = (d.getHours() < 10 ? '0' : '') + d.getHours();

  document.getElementById("date").innerHTML = daysOfWeek[d.getDay()] + " " + d.getDate() + " " + month;
  document.getElementById("time").innerHTML = hours + ":" + minutes;
}

let myVar = setInterval(myTimer, 1000);

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const searchBox = document.getElementById("i-search");

function search() {
  const query = searchBox.value;
  const searchURL = "https://www.google.com/search?q=" + query;
  console.log(searchURL);
  window.location.href = searchURL;
}

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    if (document.activeElement === inputBox) {
      addTask();
    } else if (document.activeElement === searchBox) {
      search();
    }
  }
}

function addTask() {
  const taskText = inputBox.value.trim();

  if (taskText === "") {
    alert("Please enter a task");
  } else {
    const taskCount = listContainer.children.length;
    if (taskCount >= 5) {
      alert("You can't add more than 5 tasks");
    } else {
      let li = document.createElement("li");
      li.textContent = taskText;

      // Remove existing event listeners for 'x' mark
      li.innerHTML = li.innerHTML + "<span>\u00D7</span>";

      listContainer.appendChild(li);

      let span = li.querySelector("span");

      span.addEventListener("click", function () {
        li.remove();
        saveData();
      });

      inputBox.value = "";
      saveData();
    }
  }
}

listContainer.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("checked");
    saveData();
  }
}, false);

function saveData() {
  const taskList = Array.from(listContainer.children).map(task => task.textContent.trim());
  localStorage.setItem("chrome_todo_list_data", JSON.stringify(taskList));
}

function loadData() {
  const savedData = localStorage.getItem("chrome_todo_list_data");
  if (savedData) {
    const taskList = JSON.parse(savedData);
    taskList.forEach(taskText => {
      let li = document.createElement("li");
      li.textContent = taskText;

      // Remove existing event listeners for 'x' mark
      li.innerHTML = li.innerHTML + "<span>\u00D7</span>";

      listContainer.appendChild(li);

      let span = li.querySelector("span");

      span.addEventListener("click", function () {
        li.remove();
        saveData();
      });
    });
  }
}

loadData();

inputBox.addEventListener("keypress", handleKeyPress);
searchBox.addEventListener("keypress", handleKeyPress);
