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

// Fetch and display paragraphs from markdown.txt in the #about section
fetch('markdown.txt')
  .then(response => response.text())
  .then(text => {
    // Split paragraphs by double newlines
    const paragraphs = text.trim().split(/\n\s*\n/);
    const container = document.getElementById('about-paragraphs');
    container.innerHTML = paragraphs.map(p => `<p>${p.trim()}</p>`).join('');
  });