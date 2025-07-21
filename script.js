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

    // --- HOME PAGE ---
    // Hero text
    if (paragraphs[0]) {
      const heroText = paragraphs[0].replace(/\n/g, '<br>');
      const heroP = document.querySelector('#home .hero-content p');
      if (heroP) heroP.innerHTML = heroText;
    }

    // Info boxes
    const infoBoxTitles = [
      document.querySelectorAll('#home .info-boxes .box h2')[0],
      document.querySelectorAll('#home .info-boxes .box h2')[1],
      document.querySelectorAll('#home .info-boxes .box h2')[2]
    ];
    const infoBoxTexts = [
      document.querySelectorAll('#home .info-boxes .box p')[0],
      document.querySelectorAll('#home .info-boxes .box p')[1],
      document.querySelectorAll('#home .info-boxes .box p')[2]
    ];
    // Účetnictví
    if (paragraphs[1] && infoBoxTitles[0] && infoBoxTexts[0]) {
      infoBoxTitles[0].textContent = paragraphs[1];
      infoBoxTexts[0].textContent = paragraphs[2] || '';
    }
    // Mzdy
    if (paragraphs[3] && infoBoxTitles[1] && infoBoxTexts[1]) {
      infoBoxTitles[1].textContent = paragraphs[3];
      infoBoxTexts[1].textContent = paragraphs[4] || '';
    }
    // Daňě
    if (paragraphs[5] && infoBoxTitles[2] && infoBoxTexts[2]) {
      infoBoxTitles[2].textContent = paragraphs[5];
      infoBoxTexts[2].textContent = paragraphs[6] || '';
    }

    // --- ABOUT PAGE ---
    if (paragraphs[7]) document.getElementById('about-paragraph-1').innerHTML = paragraphs[7].replace(/\n/g, '<br>');
    if (paragraphs[8]) document.getElementById('about-paragraph-2').innerHTML = paragraphs[8].replace(/\n/g, '<br>');
    if (paragraphs[9]) document.getElementById('about-paragraph-3').innerHTML = paragraphs[9].replace(/\n/g, '<br>');
    if (paragraphs[10]) document.getElementById('about-paragraph-4').innerHTML = paragraphs[10].replace(/\n/g, '<br>');

    // --- OFFERS ---
    const offersList = document.getElementById('offers-list');
    if (offersList) {
      for (let i = 11; i < paragraphs.length; i += 2) {
        if (paragraphs[i] && paragraphs[i + 1]) {
          const label = paragraphs[i].replace(':', '').trim();
          const desc = paragraphs[i + 1].trim();
          const li = document.createElement('li');
          li.innerHTML = `<strong>${label}:</strong> ${desc}`;
          offersList.appendChild(li);
        }
      }
    }
  });