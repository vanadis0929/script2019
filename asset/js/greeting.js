const greetingText = document.querySelector("#greeting_text");

function setGreeting(event) {
  if (event.which === 13 && this.value.length > 0) {
    saveGreeting(this.value);
  }
  getGreeting();
}

function saveGreeting(value) {
  localStorage.setItem("name", value);
}

function getGreeting() {
  const greetingName = localStorage.getItem("name");
  const messageContainer = document.querySelector("#greeting");
  const messageTarget = document.querySelector("#greeting_message");
  const messageTargetChild = messageTarget.childNodes;

  if (greetingName != null) {
    //console.log("dd");
    messageTargetChild[1].innerText = greetingName;
    greetingText.style.display = "none";
    messageContainer.setAttribute("class", "apply");
    document.querySelector("#reset_name").style.display = "block";
  } else {
    //console.log("d111");
    greetingText.style.display = "block";
    messageContainer.removeAttribute("class", "apply");
  }
}

window.addEventListener("load", getGreeting);
greetingText.addEventListener("keydown", setGreeting);
