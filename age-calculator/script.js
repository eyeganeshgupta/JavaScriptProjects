let userInput = document.getElementById("date");
userInput.max = new Date().toISOString.split("T")[0];

document.querySelector("button").addEventListener("click", () => {
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

  if (currentMonth >= birthMonth) {
    differenceMonth = currentMonth - birthMonth;
  } else {
    differenceYear--;
    differenceMonth = 12 + currentMonth - birthMonth;
  }
});
