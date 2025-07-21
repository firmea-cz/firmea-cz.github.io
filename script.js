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
    // Ignore lines starting with #
    text = text
      .split('\n')
      .filter(line => !line.trim().startsWith('#'))
      .join('\n');

    // Split paragraphs by semicolon and trim
    const paragraphs = text
      .split(';')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    // Fill about paragraphs
    if (paragraphs[0]) document.getElementById('about-paragraph-1').innerHTML = paragraphs[0].replace(/\n/g, '<br>');
    if (paragraphs[1]) document.getElementById('about-paragraph-2').innerHTML = paragraphs[1].replace(/\n/g, '<br>');
    if (paragraphs[2]) document.getElementById('about-paragraph-3').innerHTML = paragraphs[2].replace(/\n/g, '<br>');
    if (paragraphs[3]) document.getElementById('about-paragraph-4').innerHTML = paragraphs[3].replace(/\n/g, '<br>');

    // Fill offers list
    const offersList = document.getElementById('offers-list');
    if (offersList) {
      // Offers start at paragraphs[4]
      for (let i = 4; i < paragraphs.length; i += 2) {
        if (paragraphs[i] && paragraphs[i + 1]) {
          // paragraphs[i] is the label, paragraphs[i+1] is the description
          const label = paragraphs[i].replace(':', '').trim();
          const desc = paragraphs[i + 1].trim();
          const li = document.createElement('li');
          li.innerHTML = `<strong>${label}:</strong> ${desc}`;
          offersList.appendChild(li);
        }
      }
    }
  });