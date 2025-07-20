function showSection(id, el) {
  // Skrýt všechny sekce
  document.querySelectorAll("section").forEach(section => {
    if (section.id) {
      section.style.display = section.id === id ? "block" : "none";
    }
  });

  // Zvýraznit aktivní menu odkaz
  document.querySelectorAll("nav a").forEach(link => link.classList.remove("active"));
  if (el) el.classList.add("active");
}

// Při načtení stránky zobrazit Úvod
document.addEventListener("DOMContentLoaded", () => {
  showSection('home', document.querySelector("nav a"));
});
