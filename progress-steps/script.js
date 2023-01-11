let progressBar = document.getElementById("progress");
let previousBtn = document.getElementById("prev");
let nextBtn = document.getElementById("next");
let circleList = document.querySelectorAll(".circle");

let currentActive = 1;

nextBtn.addEventListener("click", () => {
  currentActive++;
  if (currentActive > circleList.length) {
    currentActive = circleList.length;
  }
  update();
});

previousBtn.addEventListener("click", () => {
  currentActive--;
  if (currentActive < 0) {
    currentActive = 1;
  }
  update();
});

function update() {
  circleList.forEach((circle, idx) => {
    if (idx < currentActive) {
      circle.classList.add("active");
    } else {
      circle.classList.remove("active");
    }
  });

  let actives = document.querySelectorAll(".active");

  progressBar.style.width =
    ((actives.length - 1) / (circleList.length - 1)) * 100 + "%";

  if (currentActive === 1) {
    previousBtn.disabled = true;
  } else if (currentActive === circleList.length) {
    nextBtn.disabled = true;
  } else {
    previousBtn.disabled = false;
    nextBtn.disabled = false;
  }
}
