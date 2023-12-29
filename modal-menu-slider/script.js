const toggle = document.getElementById("toggle");
const close = document.getElementById("close");
const open = document.getElementById("open");
const modal = document.getElementById("modal");

// TODO: Toggle nav
toggle.addEventListener("click", () =>
  document.body.classList.toggle("show-nav")
);

// TODO: Show modal
open.addEventListener("click", () => modal.classList.add("show-modal"));

// TODO: Hide modal
close.addEventListener("click", () => modal.classList.remove("show-modal"));

// TODO: Hide modal on outside click
window.addEventListener("click", (e) =>
  e.target == modal ? modal.classList.remove("show-modal") : false
);
