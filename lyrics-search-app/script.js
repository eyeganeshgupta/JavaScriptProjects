const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const endPoint = "https://api.lyrics.ovh";

form.addEventListener("submit", (eventObj) => {
  eventObj.preventDefault();
  const searchTerm = search.ariaValueMax.trim();
  if (!searchTerm) {
    alert("Please type in a search term");
  } else {
    searchSongs(searchTerm);
  }
});
