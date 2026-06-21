(function() {
  'use strict';

    const portfolioImages = [
  {
    "src": "imagenes/foto1.jpeg",
    "webp": "imagenes/foto1.webp",
    "alt": "Tatuaje geométrico"
  },
  {
    "src": "imagenes/foto2.jpeg",
    "webp": "imagenes/foto2.webp",
    "alt": "Tatuaje estilo tradicional"
  },
  {
    "src": "imagenes/foto4.jpeg",
    "webp": "imagenes/foto4.webp",
    "alt": "Tatuaje de animales"
  },
  {
    "src": "imagenes/foto5.png",
    "webp": "imagenes/foto5.webp",
    "alt": "Tatuaje blackwork"
  },
  {
    "src": "imagenes/foto6.png",
    "webp": "imagenes/foto6.webp",
    "alt": "Tatuaje floral"
  },
  {
    "src": "imagenes/foto7.png",
    "webp": "imagenes/foto7.webp",
    "alt": "Tatuaje de retrato"
  },
  {
    "src": "imagenes/foto8.png",
    "webp": "imagenes/foto8.webp",
    "alt": "Tatuaje abstracto"
  },
  {
    "src": "imagenes/foto9.png",
    "webp": "imagenes/foto9.webp",
    "alt": "Tatuaje de símbolos"
  },
  {
    "src": "imagenes/foto10.png",
    "webp": "imagenes/foto10.webp",
    "alt": "Tatuaje de manga"
  },
  {
    "src": "imagenes/foto11.png",
    "webp": "imagenes/foto11.webp",
    "alt": "Tatuaje minimalista"
  },
  {
    "src": "imagenes/foto12.png",
    "webp": "imagenes/foto12.webp",
    "alt": "Tatuaje de letras"
  },
  {
    "src": "imagenes/foto13.png",
    "webp": "imagenes/foto13.webp",
    "alt": "Tatuaje personalizado"
  }
];

  let currentIndex = 0;
  const grid = document.getElementById('portfolioGrid');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxCounter = document.getElementById('lightboxCounter');

  // Render grid
  portfolioImages.forEach((img, index) => {
    const item = document.createElement('div');
    item.className = 'portfolio-item';
        item.innerHTML = `
      <picture>
        <source srcset="${img.webp}" type="image/webp">
        <img src="${img.src}" alt="${img.alt}" loading="lazy">
      </picture>
      <div class="overlay"><span>🔍</span></div>
    `;
    item.addEventListener('click', () => openLightbox(index));
    grid.appendChild(item);
  });

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    const img = portfolioImages[currentIndex];
    lightboxImg.src = img.webp;
    lightboxImg.alt = img.alt;
    lightboxCounter.textContent = `${currentIndex + 1} / ${portfolioImages.length}`;
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + portfolioImages.length) % portfolioImages.length;
    updateLightbox();
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % portfolioImages.length;
    updateLightbox();
  }

  // Event listeners
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', prevImage);
  lightboxNext.addEventListener('click', nextImage);

  // Click outside image to close
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  });
})();
