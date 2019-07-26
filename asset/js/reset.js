//const resetTarget = document.querySelector(".btn_reset");

/* 초기화 버튼*/
function checkReset(event) {
  //alert("dd");
  const isName = localStorage.getItem("name");
  const isTodo = localStorage.getItem("todo");
  const isWeather = localStorage.getItem("weather");
  const target = this;

  if (event !== undefined && event.type === "click") {
    //alert(`${target.childNodes[0].nodeValue}를 진행합니다.`);
    const delTarget = target.getAttribute("id").split("reset_");
    //console.log(delTarget[1])
    localStorage.removeItem(delTarget[1]);

    if (delTarget[1] == "name") {
      //localStorage.removeItem("name");
      document.querySelector("#greeting_text").style.display = "block";
      document.querySelector("#greeting").removeAttribute("class", "apply");
    } else if (delTarget[1] == "todo") {
      //localStorage.removeItem("todo");
      document.querySelector("#todo").style.display = "none";
    } else if (delTarget[1] == "weather") {
      //localStorage.removeItem("weather");
      document.querySelector("#weather").style.display = "none";
      document.querySelector("#reset_weather").style.display = "none";
    }
  }
}

//window.addEventListener("load", checkReset);
document.querySelector("#reset_weather").addEventListener("click", checkReset);
document.querySelector("#reset_todo").addEventListener("click", checkReset);
document.querySelector("#reset_name").addEventListener("click", checkReset);
