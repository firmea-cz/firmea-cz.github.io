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

// BLOG SECTION: Load and render blog posts from blog.txt
fetch('blog.txt')
  .then(response => response.text())
  .then(text => {
    // Split blog posts by semicolon
    const posts = text.split(';').map(p => p.trim()).filter(p => p.length > 0);
    const blogEntries = document.getElementById('blog-entries');
    if (!blogEntries) return;

    blogEntries.innerHTML = posts.map(post => {
      // Extract fields
      const titleMatch = post.match(/"([^"]+)"/);
      const authorMatch = post.match(/@([^@]+)@/);
      const dateMatch = post.match(/\[([^\]]+)\]/);
      const timeMatch = post.match(/\{([^\}]+)\}/);
      const imageMatch = post.match(/<([^>]+)>/);
      // Remove meta lines from content
      let content = post
        .replace(/"[^"]+"/, '')
        .replace(/@[^@]+@/, '')
        .replace(/\[[^\]]+\]/, '')
        .replace(/\{[^\}]+\}/, '')
        .replace(/<[^>]+>/, '')
        .trim();

      let html = `<div class="blog-post">`;
      if (titleMatch) html += `<h3>${titleMatch[1]}</h3>`;
      html += `<div class="blog-meta">`;
      if (authorMatch) html += `<span class="blog-author">${authorMatch[1]}</span>`;
      if (dateMatch) html += `<span class="blog-date">${dateMatch[1]}</span>`;
      if (timeMatch) html += `<span class="blog-time">${timeMatch[1]}</span>`;
      html += `</div>`;
      if (imageMatch) html += `<img class="blog-image" src="assets/blog/${imageMatch[1]}" alt="">`;
      html += `<div class="blog-content">${content.replace(/\n/g, '<br>')}</div>`;
      html += `</div>`;
      return html;
    }).join('');
  });