let TODO_ARRAY = [];
let TODOLIST_UL = document.querySelector("#todo");
const TODOLIST_LS = JSON.parse(localStorage.getItem("todo"));
const todoTarget = document.querySelector("#todo_text");
const resetTodo = document.querySelector("#reset_todo");

function setTodo(event) {
  const TODO_ITEM = this.value;
  const TODO_LENGTH = document.querySelectorAll("#todo > li").length;
  const TODO_JSON = {
    id: `todo_${TODO_LENGTH}`,
    title: TODO_ITEM
  };
  if (event.which == 13) {
    if (TODO_ITEM.length > 0) {
      const li = document.createElement("li");
      const button = document.createElement("button");
      li.setAttribute("id", `${TODO_JSON.id}`);
      li.innerText = TODO_JSON.title;
      button.innerText = "✂️";
      li.appendChild(button);
      TODOLIST_UL.appendChild(li);

      TODO_ARRAY.push(TODO_JSON);
      //console.log(TODO_ARRAY);
      saveTodo();
      //console.log(TODO_LENGTH)
      TODO_ARRAY.length > 0
        ? (resetTodo.style.display = "initial")
        : (resetTodo.style.display = "none");
      this.value = "";
      button.addEventListener("click", delTodo);
      document.querySelector("#reset_todo").style.display = "block";
    } else {
      alert("할 일을 입력해 주세요.");
    }
  }
}

function saveTodo() {
  localStorage.setItem("todo", JSON.stringify(TODO_ARRAY));
}

function getTodo() {
  const TODO_LENGTH = document.querySelectorAll("#todo > li").length;
  if (TODOLIST_LS != null) {
    /* 리스트를  담고 새로고침하면 기존 데이터를 다 날리고 새로 push하는 이슈방지(기존에 있던 리스트를 다시 배열에 집어넣는다)*/
    TODO_ARRAY = TODOLIST_LS;
    for (i = 0; i < TODOLIST_LS.length; i++) {
      const li = document.createElement("li");
      const button = document.createElement("button");
      li.setAttribute("id", `${TODOLIST_LS[i].id}`);
      li.innerText = TODOLIST_LS[i].title;
      button.innerText = "✂️";
      li.appendChild(button);
      TODOLIST_UL.appendChild(li);
      button.addEventListener("click", delTodo);
    }

    TODO_ARRAY.length > 0
      ? (resetTodo.style.display = "initial")
      : (resetTodo.style.display = "none");
  }
}

function delTodo(event) {
  const LIST_ARRAY = document.querySelectorAll("#todo > li");
  //console.log(typeof TODO_ARRAY);
  if (this.getAttribute("id") == "reset_todo") {
    allRemoveTodo();
  } else {
    const target = event.target;
    TODOLIST_UL.removeChild(target.parentNode);
    //console.log(TODO_ARRAY);
    const processTodo = TODO_ARRAY.filter(function(element, index) {
      //return target.parentNode[index];
      return TODO_ARRAY[index].id != target.parentNode.id;
    });
    //id를 없애면 id가 없는 항목은 아예 검사자체를 하지 않음...

    console.log(processTodo);
    TODO_ARRAY = processTodo;
    //console.log(TODO_ARRAY.length);
    if (TODO_ARRAY.length == 0) {
      allRemoveTodo();
    }
    saveTodo();
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
