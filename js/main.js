// Debounce function for better performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Reveal animations with IntersectionObserver for better performance
const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target); // Stop observing once revealed
      }
    });
  },
  {
    threshold: 0.15,
  }
);

reveals.forEach((element) => revealObserver.observe(element));

// Theme switcher with localStorage
const themeSwitch = document.querySelector(".theme-switch");
const root = document.documentElement;
const savedTheme = localStorage.getItem("theme") || "light";
root.setAttribute("data-theme", savedTheme);

themeSwitch.addEventListener("click", () => {
  const currentTheme = root.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  requestAnimationFrame(() => {
    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    // Use requestAnimationFrame for smooth transition
    document.body.style.transition =
      "background-color 0.3s ease, color 0.3s ease";
    requestAnimationFrame(() => {
      setTimeout(() => {
        document.body.style.transition = "";
      }, 300);
    });
  });
});


// Contact Form Handler
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

if (contactForm && submitBtn) {
  submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    // Validate form
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    // Show loading state
    submitBtn.classList.add("loading");
    formStatus.textContent = "";
    formStatus.classList.remove("success", "error");

    try {
      const formData = new FormData(contactForm);
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        // Success
        formStatus.textContent = "message sent successfully!";
        formStatus.classList.add("success");
        contactForm.reset();
      } else {
        // Error from server
        const result = await response.json();
        throw new Error(
          result.error || "something went wrong. please try again."
        );
      }
    } catch (error) {
      // Handle error
      formStatus.textContent = error.message;
      formStatus.classList.add("error");
    } finally {
      // Remove loading state
      submitBtn.classList.remove("loading");
    }
  });
}
