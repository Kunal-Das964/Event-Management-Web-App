document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // FAQ DATA
  // =========================
  const faqData = [
    {
      question: "How do I register for an event?",
      answer: "Navigate to the Events page, browse available events, and click 'Register Now' on any event card. You will be redirected to the registration form with the event pre-selected."
    },
    {
      question: "Can I register for multiple events?",
      answer: "Yes! You can register for as many events as you like. All your registrations will appear in your Dashboard with live countdown timers."
    },
    {
      question: "How do I cancel my registration?",
      answer: "Go to your Dashboard, find the registered event card, and click the 'Remove' button. The event will be removed from your registrations."
    },
    {
      question: "Is there a registration fee?",
      answer: "Most events are free for students. Some special workshops or competitions may have a nominal fee, which will be displayed on the event details."
    },
    {
      question: "How do I get event reminders?",
      answer: "Once registered, your Dashboard shows live countdown timers for all upcoming events. We recommend checking your Dashboard regularly."
    },
    {
      question: "Can I participate without a college ID?",
      answer: "Most events require a valid college ID. However, some open events welcome external participants. Check individual event details for eligibility."
    },
    {
      question: "What if I forget my password?",
      answer: "Currently, passwords are stored locally in your browser. If you forget your password, you will need to re-register. We are working on a password recovery feature."
    },
    {
      question: "How do I contact event organizers?",
      answer: "Use this contact form with subject 'Event Registration Help' or email us directly at eventaura@gmail.com. We typically respond within 24 hours."
    }
  ];

  // =========================
  // TEAM DATA
  // =========================
  const teamData = [
    {
      name: "Kunal & Awedhesh",
      role: "Founder & CEO",
      avatar: "👨‍💼"
    },
    {
      name: "Satwika",
      role: "Event Manager",
      avatar: "👩‍🎨"
    },
    {
      name: "Prattush",
      role: "Tech Lead",
      avatar: "👨‍💻"
    },
    {
      name: "Bhavana",
      role: "Community Head",
      avatar: "👩‍💼"
    }
  ];

  // =========================
  // DOM ELEMENTS
  // =========================
  const contactGreeting = document.getElementById("contactGreeting");
  const contactForm = document.getElementById("contactForm");
  const contactError = document.getElementById("contactError");
  const faqContainer = document.getElementById("faqContainer");
  const teamContainer = document.getElementById("teamContainer");

  // =========================
  // GREETING (PERSONALIZED)
  // =========================
  let registrations = JSON.parse(localStorage.getItem("registrations")) || [];
  if (registrations.length > 0) {
    const lastUser = registrations[registrations.length - 1].name;
    contactGreeting.textContent = `Hi ${lastUser}, how can we help you today?`;
  }

  // =========================
  // RENDER FAQ
  // =========================
  function renderFAQ() {
    faqContainer.innerHTML = "";
    faqData.forEach((item, index) => {
      const faqItem = document.createElement("div");
      faqItem.className = "faq-item";
      faqItem.innerHTML = `
        <div class="faq-question">${item.question}</div>
        <div class="faq-answer">${item.answer}</div>
      `;

      faqItem.querySelector(".faq-question").addEventListener("click", function () {
        // Close others
        document.querySelectorAll(".faq-item.active").forEach(el => {
          if (el !== faqItem) el.classList.remove("active");
        });
        // Toggle current
        faqItem.classList.toggle("active");
      });

      faqContainer.appendChild(faqItem);
    });
  }

  // =========================
  // RENDER TEAM
  // =========================
  function renderTeam() {
    teamContainer.innerHTML = "";
    teamData.forEach(member => {
      const card = document.createElement("div");
      card.className = "team-card";
      card.innerHTML = `
        <div class="team-avatar">${member.avatar}</div>
        <h3>${member.name}</h3>
        <p>${member.role}</p>
        <span class="team-role">${member.role}</span>
      `;
      teamContainer.appendChild(card);
    });
  }

  // =========================
  // FORM VALIDATION & SUBMIT
  // =========================
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    contactError.textContent = "";

    let name = document.getElementById("contactName").value.trim();
    let email = document.getElementById("contactEmail").value.trim();
    let phone = document.getElementById("contactPhone").value.trim();
    let subject = document.getElementById("contactSubject").value;
    let message = document.getElementById("contactMessage").value.trim();

    // Validation
    if (name === "" || email === "" || subject === "" || message === "") {
      contactError.textContent = "All fields except phone are required!";
      return;
    }

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
      contactError.textContent = "Invalid email format!";
      return;
    }

    if (phone && !phone.match(/^[0-9+\-\s]{10,15}$/)) {
      contactError.textContent = "Invalid phone number format!";
      return;
    }

    // Store message in localStorage (demo functionality)
    let messages = JSON.parse(localStorage.getItem("contactMessages")) || [];
    messages.push({
      name, email, phone, subject, message,
      date: new Date().toISOString()
    });
    localStorage.setItem("contactMessages", JSON.stringify(messages));

    // Show success
    contactForm.innerHTML = `
      <div class="success-message">
        ✅ Thank you, ${name}! Your message has been sent successfully.<br>
        We will get back to you within 24 hours.
      </div>
      <button type="button" class="submit-btn" onclick="location.reload()">Send Another Message</button>
    `;
  });

  // =========================
  // FEEDBACK STAR RATING
  // =========================
  const starContainer = document.getElementById("starRating");
  const ratingText = document.getElementById("ratingText");
  const feedbackMessage = document.getElementById("feedbackMessage");
  const feedbackSubmit = document.getElementById("feedbackSubmit");
  const feedbackSuccess = document.getElementById("feedbackSuccess");
  const feedbackForm = document.querySelector(".feedback-form");

  let selectedRating = 0;
  const ratingLabels = {
    1: "Poor - Needs improvement",
    2: "Fair - Could be better",
    3: "Good - It was okay",
    4: "Very Good - Liked it!",
    5: "Excellent - Loved it!"
  };

  if (starContainer) {
    const stars = starContainer.querySelectorAll(".star");

    stars.forEach(star => {
      // Hover effect
      star.addEventListener("mouseenter", function () {
        const value = parseInt(this.getAttribute("data-value"));
        stars.forEach(s => {
          const sVal = parseInt(s.getAttribute("data-value"));
          if (sVal <= value) {
            s.classList.add("hover");
          } else {
            s.classList.remove("hover");
          }
        });
        ratingText.textContent = ratingLabels[value];
      });

      // Click to select
      star.addEventListener("click", function () {
        selectedRating = parseInt(this.getAttribute("data-value"));
        stars.forEach(s => {
          const sVal = parseInt(s.getAttribute("data-value"));
          if (sVal <= selectedRating) {
            s.classList.add("active");
            s.classList.remove("hover");
          } else {
            s.classList.remove("active");
            s.classList.remove("hover");
          }
        });
        ratingText.textContent = ratingLabels[selectedRating];
        ratingText.style.color = "var(--warning)";
        ratingText.style.fontWeight = "600";
      });
    });

    // Mouse leave container
    starContainer.addEventListener("mouseleave", function () {
      stars.forEach(s => s.classList.remove("hover"));
      if (selectedRating > 0) {
        ratingText.textContent = ratingLabels[selectedRating];
      } else {
        ratingText.textContent = "Tap a star to rate";
        ratingText.style.color = "";
        ratingText.style.fontWeight = "";
      }
    });
  }

  // Feedback Submit
  if (feedbackSubmit) {
    feedbackSubmit.addEventListener("click", function () {
      if (selectedRating === 0) {
        ratingText.textContent = "Please select a star rating first!";
        ratingText.style.color = "var(--danger)";
        return;
      }

      let message = feedbackMessage.value.trim();
      let userName = "Anonymous";

      // Get user name if registered
      let regs = JSON.parse(localStorage.getItem("registrations")) || [];
      if (regs.length > 0) {
        userName = regs[regs.length - 1].name;
      }

      // Store feedback
      let feedbacks = JSON.parse(localStorage.getItem("eventAuraFeedback")) || [];
      feedbacks.push({
        name: userName,
        rating: selectedRating,
        message: message,
        date: new Date().toISOString()
      });
      localStorage.setItem("eventAuraFeedback", JSON.stringify(feedbacks));

      // Show success
      feedbackForm.style.display = "none";
      feedbackSuccess.style.display = "block";
    });
  }

  // =========================
  // THEME APPLICATION (from Dashboard toggle)
  // =========================
  // Apply saved theme from Dashboard's localStorage
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }

  // =========================
  // INITIAL RENDER
  // =========================
  renderFAQ();
  renderTeam();

});