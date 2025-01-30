// theme switcher
const themeToggle = document.querySelector(".theme-toggle");
const htmlElement = document.documentElement;
const themeIcon = themeToggle.querySelector("i");

// check for system preference
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// check for saved theme preference or use system preference
const savedTheme =
  localStorage.getItem("theme") ||
  (prefersDarkScheme.matches ? "dark" : "light");

// apply theme immediately when page loads
document.documentElement.setAttribute("data-theme", savedTheme);
updateThemeIcon(savedTheme);

// listen for theme toggle clicks
themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
});

// listen for system theme changes
prefersDarkScheme.addEventListener("change", (e) => {
  if (!localStorage.getItem("theme")) {
    const newTheme = e.matches ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    updateThemeIcon(newTheme);
  }
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun";
}
