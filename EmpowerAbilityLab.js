// toggle event of button "Meet the Empower Community"
const meetBtn = document.getElementById("meetBtn");
const lightBx = document.getElementById("lightbox");

meetBtn.addEventListener("click", () => {
  if (lightbox.classList.contains("invisible")) {
    lightbox.classList.remove("invisible");
    lightbox.classList.add("visible");
  } else {
    lightbox.classList.remove("visible");
    lightbox.classList.add("invisible");
  }
});
