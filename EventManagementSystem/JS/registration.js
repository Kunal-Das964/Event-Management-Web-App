// Apply theme from Dashboard toggle
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let college = document.getElementById("college").value.trim();
    let eventSelect = document.getElementById("event").value;
    let password = document.getElementById("password").value;
    let date = document.getElementById("Date");

    const passwordInput = document.getElementById("password");
    if (passwordInput) {
      passwordInput.addEventListener("input", checkPasswordStrength);
    }

    errorMsg.innerHTML = "";

    // Prevent empty submission
    if (
      name === "" ||
      email === "" ||
      phone === "" ||
      college === "" ||
      eventSelect === ""
    ) {
      errorMsg.innerHTML = "All fields are required!";
      event.preventDefault();
      return;
    }

    // Email validation
    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!email.match(emailPattern)) {
      errorMsg.innerHTML = "Invalid email format!";
      event.preventDefault();
      return;
    }

    // Name validation
    let namePattern = /[^A-Za-z ]/g;

    if (!name.match(namePattern)) {
      errorMsg.innerHTML = "Invalid name format!";
      event.preventDefault();
      return;
    }

    // Phone validation (10 digits)
    let phonePattern = /^[0-9]{10}$/;

    if (!phone.match(phonePattern)) {
      errorMsg.innerHTML = "Phone number must be 10 digits!";
      event.preventDefault();
      return;
    }

    // Password strength validation
    function checkPasswordStrength() {
      const password = this.value;
      const strengthBar = document.getElementById("passwordStrength");
      if (!strengthBar) return;

      let strength = 0;
      if (password.length >= 6) strength++;
      if (password.length >= 10) strength++;
      if (/[A-Z]/.test(password)) strength++;
      if (/[0-9]/.test(password)) strength++;
      if (/[^A-Za-z0-9]/.test(password)) strength++;

      let className = "";
      let width = "0%";

      if (password.length === 0) {
        width = "0%";
      } else if (strength <= 2) {
        className = "weak";
        width = "33%";
      } else if (strength <= 4) {
        className = "medium";
        width = "66%";
      } else {
        className = "strong";
        width = "100%";
      }

      strengthBar.innerHTML = `<div class=\"password-strength-bar ${className}\" style=\"width: ${width}\"></div>`;
    }


 



    alert("Registration Successful!");
  });

  document.addEventListener("DOMContentLoaded", function () {

  const savedEvent = sessionStorage.getItem("selectedEvent");
  const savedDate = sessionStorage.getItem("selectedDate");

  if (savedEvent && savedDate) {
    eventSelect.value = savedEvent;
    dateInput.value = savedDate;

    // Lock the date
    dateInput.min = savedDate;
    dateInput.max = savedDate;

    // Optional (clear after use)
    sessionStorage.removeItem("selectedEvent");
    sessionStorage.removeItem("selectedDate");
  }

});
