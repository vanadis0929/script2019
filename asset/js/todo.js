let TODO_ARRAY = [];
let TODOLIST_UL = document.querySelector("#todo");
let TODOLIST_LIST_ITEMS = document.querySelectorAll("#todo > li");
const TODOLIST_LS = JSON.parse(localStorage.getItem("todo"));
const todoTarget = document.querySelector("#todo_text");
const resetTodo = document.querySelector("#reset_todo");

function setTodo(event) {
  const TODO_ITEM = this.value;
  const TODO_LENGTH = TODOLIST_LIST_ITEMS.length;
  const TODO_JSON = {
    id: `todo_${TODO_LENGTH}`,
    title: TODO_ITEM
  };
  if (event.which === 13) {
    if (TODO_ITEM != null) {
      const node = document.createElement("li");
      node.innerHTML = `<li id="${TODO_JSON.id}">${
        TODO_JSON.title
      } <button type="button">✂️</button></li>`;
      TODOLIST_UL.appendChild(node);
      TODO_ARRAY.push(TODO_JSON);
      //console.log(TODO_ARRAY);
      saveTodo();
      TODO_ARRAY.length > 0
        ? (resetTodo.style.display = "initial")
        : (resetTodo.style.display = "none");
      this.value = "";
    } else {
      alert("할 일을 입력해 주세요.");
    }
  }
}

function saveTodo() {
  localStorage.setItem("todo", JSON.stringify(TODO_ARRAY));
}

function getTodo() {
  if (TODOLIST_LS != null) {
    /* 리스트를  담고 새로고침하면 기존 데이터를 다 날리고 새로 push하는 이슈방지(기존에 있던 리스트를 다시 배열에 집어넣는다)*/
    TODO_ARRAY = TODOLIST_LS;
    for (i = 0; i < TODOLIST_LS.length; i++) {
      //console.log(TODOLIST_LS);

      TODOLIST_UL.innerHTML = `<li id="${TODOLIST_LS[i].id}">${
        TODOLIST_LS[i].title
      } <button type="button">✂️</button></li>`;
      TODOLIST_UL.appendChild(TODOLIST_UL);
    }
    TODOLIST_LIST_ITEMS.length > 0
      ? (resetTodo.style.display = "initial")
      : (resetTodo.style.display = "none");
  }
}

function delTodo() {
  const LIST_ARRAY = document.querySelectorAll("#todo > li");
  console.log("ggg");
  if (this.getAttribute("id") == "reset_todo") {
    allRemoveTodo();
  } else {
    this.parentNode.removeAttribute("id");
    this.parentNode.style.display = "none";

    const processTodo = TODOLIST_LS.filter((i, result) => {
      return LIST_ARRAY[i].getAttribute("id") !== TODOLIST_LS[i].id;
    });

    TODO_ARRAY = processTodo;
    console.log(TODO_ARRAY.length);
    if (TODO_ARRAY.length == 0) {
      allRemoveTodo();
    }
    saveTodo();
    checkReset();
  }
}

function allRemoveTodo() {
  TODOLIST_UL.innerHTML = "";
  resetTodo.style.display = "none";
  localStorage.removeItem("todo");
}

todoTarget.addEventListener("keydown", setTodo);
if (TODOLIST_LS != null) {
  getTodo();
}

const delTodoTarget = document.querySelectorAll("#todo > li button");
for (i = 0; i < delTodoTarget.length; i++) {
  delTodoTarget[i].addEventListener("click", delTodo);
}
