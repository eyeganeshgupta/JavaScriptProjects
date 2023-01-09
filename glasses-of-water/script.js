let smallCupsList = document.querySelectorAll(".cup-small");
let liters = document.querySelector("#liters");
let percentage = document.querySelector("#percentage");
let remained = document.getElementById("remained");

updateLargeCup();

function updateLargeCup() {
  const largeCups = document.querySelectorAll(".cup-small.full").length;
  const totalCups = smallCupsList.length;

  if (largeCups === 0) {
    percentage.style.visibility = "hidden";
    percentage.style.height = 0;
  } else {
    percentage.style.visibility = "visible";
    percentage.style.height = `${(largeCups / totalCups) * 330}px`;
    percentage.innerText = `${(largeCups / totalCups) * 100}%`;
  }

  if (largeCups === totalCups) {
    remained.style.visibility = "hidden";
    remained.style.height = 0;
  } else {
    remained.style.visibility = "visible";
    liters.innerText = `${2 - (250 * largeCups) / 1000}L`;
  }
}

smallCupsList.forEach((cup, idx) => {
  cup.addEventListener("click", () => {
    fillSmallCups(idx);
  });
});

let fillSmallCups = (idx) => {
  if (idx === 7 && smallCupsList[idx].classList.contains("full")) {
    idx--;
  } else if (
    smallCupsList[idx].classList.contains("full") &&
    !smallCupsList[idx].nextElementSibling.classList.contains("full")
  ) {
    idx--;
  }

  smallCupsList.forEach((cup, itr) => {
    if (itr <= idx) {
      cup.classList.add("full");
    } else {
      cup.classList.remove("full");
    }
  });

  updateLargeCup();
};
