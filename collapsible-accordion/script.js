document
  .querySelectorAll(".accordion-item-header")
  .forEach((accordionHeader) => {
    accordionHeader.addEventListener("click", () => {
      accordionHeader.classList.toggle("active");
      const accordionBody = accordionHeader.nextElementSibling;
      console.log(accordionBody.scrollHeight);
      accordionHeader.classList.contains("active")
        ? (accordionBody.style.maxHeight = accordionBody.scrollHeight + "px")
        : (accordionBody.style.maxHeight = 0);
    });
  });
