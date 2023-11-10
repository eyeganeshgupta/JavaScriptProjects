let userInput = document.getElementById("date");
// userInput.max = new Date().toISOString.split("T")[0];
let result = document.getElementById("result");

document.querySelector(".btn").addEventListener("click", () => {
  let birthDate = new Date(userInput.value);

  let birthDay = birthDate.getDate();
  let birthMonth = birthDate.getMonth() + 1;
  let birthYear = birthDate.getFullYear();

  let currentDate = new Date();

  let currentDay = currentDate.getDate();
  let currentMonth = currentDate.getMonth() + 1;
  let currentYear = currentDate.getFullYear();

  let differenceDay, differenceMonth;
  let differenceYear = currentYear - birthYear;

  // Calculate month
  if (currentMonth >= birthMonth) {
    differenceMonth = currentMonth - birthMonth;
  } else {
    differenceYear--;
    differenceMonth = 12 + currentMonth - birthMonth;
  }

  // Calculate day
  if (currentDay >= birthDay) {
    differenceDay = currentDay - birthDay;
  } else {
    differenceDay--;
    differenceDay =
      getDaysInMonth(birthYear, birthMonth) + currentDay - birthDay;
  }

  if (differenceMonth < 0) {
    differenceMonth = 11;
    differenceYear--;
  }

  result.innerHTML = `You are <span>${differenceYear}</span> years, <span>${differenceMonth}</span> months and <span>${differenceDay}</span> days old.`;
});

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}
