// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

document.addEventListener("DOMContentLoaded", (event) => {
  const form = document.getElementById("todo-form");
  const todoList = document.getElementById("todo-list");
  const input = document.getElementById("todo-input");
  const errorMsg = document.getElementById("error-msg");
  const counter = document.getElementById("counter");
  const filters = document.getElementsByClassName("filters")[0];

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value.trim() === "") {
      errorMsg.classList.remove("hidden");
      return;
    } else {
      errorMsg.classList.add("hidden");
    }
    const li = document.createElement('li');
    const itemText = document.createElement('span');
    itemText.textContent = input.value;
    itemText.classList.add("item-text");
    input.value = '';
    li.appendChild(itemText);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "delete";
    deleteButton.classList.add("delete-btn");
    li.appendChild(deleteButton);

    todoList.appendChild(li);
    updateCounter();
  })

  todoList.addEventListener("click", (e) => {
    let target = e.target;
    if (target.classList.contains("delete-btn")) {
      target.parentElement.remove();
      updateCounter();
    } else if (target.tagName.toLowerCase() === "li") {
      target.classList.toggle("completed");
      updateCounter();
    } else if (target.classList.contains("item-text")) {
      target.parentElement.classList.toggle("completed");
      updateCounter();
    }
  });

  filters.addEventListener("click", e => {
    let target = e.target;
    if (target.id === "filter-active") {
      Array.from(todoList.children).forEach(item => {
        if (item.classList.contains("completed")) {
          item.style.display = "none";
        } else {
          item.style.display = "";
        }
      });
    } else if (target.id === "filter-done") {
      Array.from(todoList.children).forEach(item => {
        if (!item.classList.contains("completed")) {
          item.style.display = "none";
        } else {
          item.style.display = "";
        }
      });
    } else if (target.id === "filter-all") {
      Array.from(todoList.children).forEach(item => {
          item.style.display = "";
      });
    }
  });

  function updateCounter() {
    let itemCount = 0
    Array.from(todoList.children).forEach(e => {
      if (!e.classList.contains("completed")) {
        itemCount += 1;
      }
    });
    counter.textContent = `${itemCount} items left`;
  }

});
