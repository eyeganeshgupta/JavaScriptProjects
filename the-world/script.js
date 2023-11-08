const conatiner = document.querySelector(".container");

document.querySelector(".open-navbar-icon").addEventListener("click", () => {
  conatiner.classList.add("change");
});

document.querySelector(".close-navbar-icon").addEventListener("click", () => {
  conatiner.classList.remove("change");
});



const colors = ["#6495ed", "#7fffd4", "#ffa07a", "#f08080", "#afeeee"];

let itr = 0;

Array.from(document.querySelectorAll(".nav-link")).forEach((item) => {
  item.style.cssText = `background-color: ${colors[itr]}`;
  itr = itr + 1;
});

Array.from(document.querySelectorAll(".navigation-button")).forEach((item) => {
  item.onclick = () => {
    item.parentElement.parentElement.classList.toggle("change");
  };
});
