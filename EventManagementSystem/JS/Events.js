document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // EVENT DATA (Built-in events)
  // =========================
  const eventsData = [
    {
      id: 1,
      name: "Technical Workshop",
      category: "Technical",
      date: "2026-06-15",
      time: "10:00 AM",
      venue: "CS Lab 101",
      description: "Hands-on workshop covering latest web technologies including React, Node.js, and cloud deployment.",
      icon: "💻",
      tags: ["Web Dev", "Hands-on", "Certificate"]
    },
    {
      id: 2,
      name: "Coding Contest",
      category: "Technical",
      date: "2026-06-20",
      time: "02:00 PM",
      venue: "Main Auditorium",
      description: "Competitive programming contest with cash prizes. Individual and team participation allowed.",
      icon: "🏆",
      tags: ["Competition", "Prizes", "Algorithm"]
    },
    {
      id: 3,
      name: "Paper Presentation",
      category: "Technical",
      date: "2026-06-25",
      time: "11:00 AM",
      venue: "Seminar Hall A",
      description: "Present your research papers on emerging technologies. Best papers get publication support.",
      icon: "📄",
      tags: ["Research", "Presentation", "Publication"]
    },
    {
      id: 4,
      name: "Cultural Event",
      category: "Cultural",
      date: "2026-07-01",
      time: "06:00 PM",
      venue: "Open Air Theatre",
      description: "Annual cultural fest with dance, music, drama performances and celebrity appearances.",
      icon: "🎭",
      tags: ["Dance", "Music", "Drama"]
    },
    {
      id: 5,
      name: "Hackathon 2026",
      category: "Technical",
      date: "2026-07-05",
      time: "09:00 AM",
      venue: "Innovation Hub",
      description: "24-hour hackathon on AI/ML solutions. Mentorship from industry experts and internship opportunities.",
      icon: "🚀",
      tags: ["AI/ML", "24hr", "Internship"]
    },
    {
      id: 6,
      name: "Sports Meet",
      category: "Sports",
      date: "2026-07-10",
      time: "08:00 AM",
      venue: "College Ground",
      description: "Inter-college sports tournament including cricket, football, basketball, and athletics events.",
      icon: "⚽",
      tags: ["Cricket", "Football", "Athletics"]
    },
    {
      id: 7,
      name: "Design Workshop",
      category: "Workshop",
      date: "2026-07-15",
      time: "01:00 PM",
      venue: "Design Studio",
      description: "UI/UX design workshop using Figma. Learn prototyping, wireframing, and design systems.",
      icon: "🎨",
      tags: ["UI/UX", "Figma", "Design"]
    },
    {
      id: 8,
      name: "Music Festival",
      category: "Cultural",
      date: "2026-07-20",
      time: "05:00 PM",
      venue: "College Amphitheatre",
      description: "Live performances by college bands and professional artists. Food stalls and fun activities.",
      icon: "🎵",
      tags: ["Live", "Bands", "Food"]
    },
    {
      id: 9,
      name: "Cyber Security Seminar",
      category: "Technical",
      date: "2026-07-25",
      time: "10:30 AM",
      venue: "Conference Room B",
      description: "Learn about ethical hacking, network security, and latest cybersecurity threats and defenses.",
      icon: "🔒",
      tags: ["Security", "Ethical Hacking", "Network"]
    },
    {
      id: 10,
      name: "Robotics Competition",
      category: "Technical",
      date: "2026-08-01",
      time: "11:00 AM",
      venue: "Robotics Lab",
      description: "Build and race robots. Categories: line follower, maze solver, and battle bots.",
      icon: "🤖",
      tags: ["Robotics", "Competition", "Hardware"]
    },
    {
      id: 11,
      name: "Photography Workshop",
      category: "Workshop",
      date: "2026-08-05",
      time: "03:00 PM",
      venue: "Media Room",
      description: "Master DSLR photography and photo editing. Outdoor shoot session included.",
      icon: "📷",
      tags: ["Photography", "DSLR", "Editing"]
    },
    {
      id: 12,
      name: "Entrepreneurship Summit",
      category: "Workshop",
      date: "2026-08-10",
      time: "09:30 AM",
      venue: "MBA Block",
      description: "Meet successful entrepreneurs, pitch your ideas to investors, and win seed funding.",
      icon: "💼",
      tags: ["Startup", "Funding", "Networking"]
    }
  ];

  // =========================
  // STATE
  // =========================
  let registrations = JSON.parse(localStorage.getItem("registrations")) || [];
  let currentFilter = "all";
  let currentSearch = "";

  // =========================
  // DOM ELEMENTS
  // =========================
  const container = document.getElementById("eventsContainer");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const noEventsDiv = document.getElementById("noEvents");
  const totalEventsEl = document.getElementById("totalEvents");
  const availableEventsEl = document.getElementById("availableEvents");
  const registeredCountEl = document.getElementById("registeredCount");
  const eventGreeting = document.getElementById("eventGreeting");

  // =========================
  // GREETING
  // =========================
  if (registrations.length > 0) {
    const lastUser = registrations[registrations.length - 1].name;
    eventGreeting.textContent = `Welcome back, ${lastUser}! Explore events and register.`;
  }

  // =========================
  // COUNTDOWN HELPER
  // =========================
  function getCountdown(dateStr) {
    let eventDate = new Date(dateStr + "T00:00:00");
    let now = new Date();
    let diff = eventDate - now;

    if (diff <= 0) return "Event Started!";

    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((diff / (1000 * 60)) % 60);

    return `${days}d ${hours}h ${minutes}m`;
  }

  // =========================
  // CHECK IF REGISTERED
  // =========================
  function isRegistered(eventName) {
    return registrations.some(r => r.eventSelect === eventName);
  }

  // =========================
  // UPDATE STATS
  // =========================
  function updateStats() {
    totalEventsEl.textContent = eventsData.length;
    availableEventsEl.textContent = eventsData.filter(e => !isRegistered(e.name)).length;
    registeredCountEl.textContent = registrations.length;
  }

  // =========================
  // RENDER EVENTS
  // =========================
  function renderEvents() {
    container.innerHTML = "";

    let filtered = eventsData.filter(event => {
      const matchesCategory = currentFilter === "all" || event.category === currentFilter;
      const matchesSearch = event.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
        event.description.toLowerCase().includes(currentSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      container.style.display = "none";
      noEventsDiv.style.display = "block";
      return;
    }

    container.style.display = "grid";
    noEventsDiv.style.display = "none";

    filtered.forEach(event => {
      const registered = isRegistered(event.name);
      const countdown = getCountdown(event.date);

      const card = document.createElement("div");
      card.className = `event-card ${registered ? "registered" : ""}`;

      card.innerHTML = `
        <div class="event-image">
          ${event.icon}
          <span class="event-category">${event.category}</span>
        </div>
        <div class="event-content">
          <h3>${event.name}</h3>
          <p class="event-description">${event.description}</p>
          <p>📅 ${event.date} | 🕐 ${event.time}</p>
          <p>📍 ${event.venue}</p>
          <div class="event-meta">
            ${event.tags.map(tag => `<span class="event-tag">${tag}</span>`).join("")}
          </div>
          <div class="event-countdown">${countdown}</div>
          <button class="register-btn ${registered ? "registered" : ""}" 
                  data-event="${event.name}" 
                  ${registered ? "disabled" : ""}>
            ${registered ? "✅ Registered" : "Register Now"}
          </button>
        </div>
      `;

      container.appendChild(card);
    });

    // Attach click handlers
    document.querySelectorAll(".register-btn:not(.registered)").forEach(btn => {
      btn.addEventListener("click", function () {
        const eventName = this.getAttribute("data-event");
        redirectToRegister(eventName);
      });
    });
  }

  // =========================
  // REDIRECT TO REGISTER
  // =========================
  function redirectToRegister(eventName) {
    // Store selected event in sessionStorage for pre-fill
    // sessionStorage.setItem("selectedEvent", eventName);
    // window.location.href = "Register.html";

    const selectedEvent = eventsData.find(e => e.name === eventName);

    if (selectedEvent) {
      sessionStorage.setItem("selectedEvent", selectedEvent.name);
      sessionStorage.setItem("selectedDate", selectedEvent.date);
    }

    window.location.href = "Register.html";

  }

  // =========================
  // SEARCH & FILTER HANDLERS
  // =========================
  searchInput.addEventListener("input", function () {
    currentSearch = this.value;
    renderEvents();
  });

  categoryFilter.addEventListener("change", function () {
    currentFilter = this.value;
    renderEvents();
  });

  // =========================
  // THEME APPLICATION (from Dashboard toggle)
  // =========================
  // Apply saved theme from Dashboard's localStorage
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }

  // =========================
  // LIVE COUNTDOWN UPDATE
  // =========================
  setInterval(() => {
    document.querySelectorAll(".event-countdown").forEach((el, index) => {
      // Find corresponding event
      const cards = document.querySelectorAll(".event-card");
      if (cards[index]) {
        const eventName = cards[index].querySelector("h3").textContent;
        const event = eventsData.find(e => e.name === eventName);
        if (event) {
          el.textContent = getCountdown(event.date);
        }
      }
    });
  }, 60000); // Update every minute

  // =========================
  // INITIAL RENDER
  // =========================
  updateStats();
  renderEvents();

});