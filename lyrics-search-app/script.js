const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const endPoint = "https://api.lyrics.ovh";

async function searchSongs(searchTerm) {
  /*
  fetch(`${endPoint}/suggest/${term}`).then((response) => response.json).then((data) => console.log(data));
  */
  const response = await fetch(`${endPoint}/suggest/${term}`);
  const data = await response.json();
}

form.addEventListener("submit", (eventObj) => {
  eventObj.preventDefault();
  const searchTerm = search.ariaValueMax.trim();
  if (!searchTerm) {
    alert("Please type in a search term");
  } else {
    searchSongs(searchTerm);
  }
});
