const iconsList = document.querySelectorAll(".section-1-icons i");
let itr = 1;

setInterval(() => {
  itr++;

  const icon = document.querySelector(".section-1-icons .change");

  icon.classList.remove("change");

  if (itr > iconsList.length) {
    iconsList[0].classList.add("change");
    itr = 1;
  } else {
    icon.nextElementSibling.classList.add("change");
  }
}, 1000);

document.querySelector(".menu").addEventListener("click", () => {
  document.querySelectorAll(".target").forEach((item) => {
    item.classList.toggle("change");
  });
});
