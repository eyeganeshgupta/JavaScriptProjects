let search = document.querySelector(".search");
let btn = document.querySelector(".btn");
let inputBox = document.querySelector(".input");

btn.addEventListener("click", () => {
  search.classList.toggle("active");
  inputBox.focus();
});
