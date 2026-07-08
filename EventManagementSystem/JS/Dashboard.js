document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // REGISTRATION PAGE LOGIC
  // =========================
  const form = document.getElementById("registrationForm");

  if (form) {

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      let name = document.getElementById("name").value.trim();
      let email = document.getElementById("email").value.trim();
      let phone = document.getElementById("phone").value.trim();
      let college = document.getElementById("college").value.trim();
      let eventSelect = document.getElementById("event").value;
      let password = document.getElementById("password").value;
      let date = document.getElementById("date").value;
      let gender = document.querySelector('input[name="gender"]:checked')?.value;

      let registration = {
        name, email, phone, college,
        eventSelect, password, gender, date
      };

      let registrations = JSON.parse(localStorage.getItem("registrations")) || [];
      registrations.push(registration);
      localStorage.setItem("registrations", JSON.stringify(registrations));

      alert("Registration Successful!");
      // form.reset();
    });
  }


  // =========================
  // DASHBOARD LOGIC
  // =========================
  const container = document.getElementById("eventContainer");
  const upcomingDiv = document.getElementById("upcomingEvent");

  if (!container) return; // stop if not dashboard page

  let registrations =
    JSON.parse(localStorage.getItem("registrations")) || [];

  // total count
  const totalCountEl = document.getElementById("totalCount");
  if (totalCountEl) {
    totalCountEl.textContent = registrations.length;
  }

  // welcome message
  const userGreeting = document.getElementById("userGreeting");
  if (userGreeting && registrations.length > 0) {
    userGreeting.textContent = `Welcome, ${registrations[registrations.length - 1].name}!`;
  }

  // =========================
  // COUNTDOWN (DATE ONLY)
  // =========================
  function getCountdown(dateStr) {
    let eventDate = new Date(dateStr);
    eventDate.setHours(0, 0, 0, 0);

    let now = new Date();
    now.setHours(0, 0, 0, 0);

    let diff = eventDate - now;

    if (diff <= 0) return "Event Started!";

    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((diff / (1000 * 60)) % 60);
    let seconds = Math.floor((diff / 1000) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  // =========================
  // UPCOMING EVENT
  // =========================
  function updateUpcoming() {
    if (!upcomingDiv) return;

    let now = new Date();

    let upcoming = registrations
      .map(r => ({
        ...r,
        eventDate: new Date(r.date)
      }))
      .filter(r => r.eventDate >= now)
      .sort((a, b) => a.eventDate - b.eventDate)[0];

    if (!upcoming) {
      upcomingDiv.innerHTML = `<p>No upcoming events</p>`;
      return;
    }

    let diff = upcoming.eventDate - now;

    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((diff / (1000 * 60)) % 60);
    let seconds = Math.floor((diff / 1000) % 60);

    upcomingDiv.innerHTML = `
      <div>
        <h3>${upcoming.eventSelect}</h3>
        <p>${upcoming.date}</p>
        <h4>Starts in: ${days}d ${hours}h ${minutes}m ${seconds}s</h4>
      </div>
    `;
  }

  updateUpcoming();
  setInterval(updateUpcoming, 1000);


  // =========================
  // EVENT CARDS
  // =========================
  container.innerHTML = "";

  registrations.forEach((reg, index) => {

    let card = document.createElement("div");

    card.innerHTML = `
      <h3>${reg.eventSelect}</h3>
      <p>Name: ${reg.name}</p>
      <p>Date: ${reg.date}</p>
      <h4 class="countdown"></h4>
    `;

    let countdownElement = card.querySelector(".countdown");

    function updateCountdown() {
      countdownElement.textContent = getCountdown(reg.date);
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // remove button
    let removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";

    removeBtn.addEventListener("click", function () {
      registrations.splice(index, 1);
      localStorage.setItem("registrations", JSON.stringify(registrations));
      location.reload();
    });

    card.appendChild(removeBtn);
    container.appendChild(card);
  });


  // =========================
  // THEME TOGGLE (SAFE)
  // =========================
  const toggleBtn = document.getElementById("themeToggle");

  if (toggleBtn) {
    // Restore saved theme on load
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark");
      toggleBtn.textContent = "☀️";
    }

    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      toggleBtn.textContent = isDark ? "☀️" : "🌙";
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

});



document.addEventListener("DOMContentLoaded", function () {
  const savedEvent = sessionStorage.getItem("selectedEvent");
  const savedDate = sessionStorage.getItem("selectedDate");

  const eventSelect = document.getElementById("event");
  const dateInput = document.getElementById("date");

  if (savedEvent && savedDate) {
    eventSelect.value = savedEvent;
    dateInput.value = savedDate;

    // Lock date
    dateInput.min = savedDate;
    dateInput.max = savedDate;

    // Optional: clear after use
    sessionStorage.removeItem("selectedEvent");
    sessionStorage.removeItem("selectedDate");
  }
});
