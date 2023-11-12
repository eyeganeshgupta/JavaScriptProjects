const draggableList = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
  "Mukesh Ambani",
  "Gautam Adani",
  "Shiv Nadar",
  "Savitri Jindal",
  "Radhakishan Damani",
  "Cyrus Poonawalla",
  "Hinduja Family",
  "Dilip Shanghvi",
  "Kumar Birla",
  "Shapoor Mistry",
];

// store listItems
const listItems = [];

let dragStartIndex;

createList();

// ! Insert list items into DOM
function createList() {
  [...richestPeople].forEach((person, index) => {
    const listItem = document.createElement("li");

    listItem.setAttribute("data-index", index);

    listItem.innerHTML = `
    <span class="number">${index + 1}</span>
    <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fas fa-grip-lines"></i>
    </div>
    `;

    listItems.push(listItem);

    draggableList.append(listItem);
  });
}
