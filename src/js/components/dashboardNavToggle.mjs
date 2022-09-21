export const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function (event) {
  links.classList.toggle("show-links");
  event.target.classList.toggle("open-menu");
  event.target.classList.toggle("close-menu");
});
