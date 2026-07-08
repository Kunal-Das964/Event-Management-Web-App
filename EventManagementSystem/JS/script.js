// Apply theme from Dashboard toggle
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

let slides = document.querySelectorAll(".slide");
let index = 0;

function showSlide() {
    slides.forEach(s => s.classList.remove("active"));

    slides[index].classList.add("active");

    index = (index + 1) % slides.length;
}

showSlide(); // ensure first slide shows
setInterval(showSlide, 3000);