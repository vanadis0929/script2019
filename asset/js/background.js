const body = document.querySelector("body");
const bgTarget = document.querySelector("#bg");
const bgTargetChild = bgTarget.childNodes;

function changeBackground() {
  console.log(bgTarget);
  const imgCount = 7;
  const rdm = Math.floor(Math.random() * imgCount) + 1;
  bgTarget.innerHTML = `<img src="/asset/images/${rdm}.jpg" alt="" />`;
  setTimeout(() => {
    bgTargetChild[0].setAttribute("class", "complete");
  }, 200);
}

window.addEventListener("load", changeBackground);
