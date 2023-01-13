let button = document.querySelector(".ripple");

button.addEventListener("click", function (eventObj) {
  let xAxis = eventObj.clientX;
  let yAxis = eventObj.clientY;

  let buttonTop = eventObj.target.offsetTop;
  let buttonLeft = eventObj.target.offsetLeft;

  let xInside = xAxis - buttonLeft;
  let yInside = yAxis - buttonTop;

  let circle = document.createElement("span");
  circle.classList.add("circle");

  circle.style.top = yInside + "px";
  circle.style.left = xInside + "px";

  button.appendChild(circle);

  setTimeout(() => {
    circle.remove();
  }, 700);
});
