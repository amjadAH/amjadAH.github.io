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
const savedTheme = localStorage.getItem("theme") || "dark";
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

// Scroll to top with throttling
const scrollTopBtn = document.getElementById("scroll-top");
let isScrolling = false;

window.addEventListener("scroll", () => {
  if (!isScrolling) {
    requestAnimationFrame(() => {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
      isScrolling = false;
    });
    isScrolling = true;
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Profile image tilt effect
const profileImage = document.querySelector(".profile-image");

profileImage.addEventListener("mousemove", (e) => {
  const rect = profileImage.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = (y - centerY) / 10;
  const rotateY = (centerX - x) / 10;

  profileImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
});

profileImage.addEventListener("mouseleave", () => {
  profileImage.style.transform =
    "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
});
