(function() {
  'use strict';

  // Pricing data
  const TIERS = [
    { id: 'mini', max: 5, base: 35000 },
    { id: 'pequeno', min: 6, max: 10, base: 70000 },
    { id: 'mediano', min: 11, max: 15, base: 120000 },
    { id: 'grande', min: 16, max: 25, base: 200000 },
    { id: 'mega', min: 26, base: null }
  ];

  const ZONE_FACTORS = {
    'cabeza': 1.5, 'cuello': 1.3, 'pecho': 1.8, 'vientre': 1.6,
    'brazo-izq': 1.0, 'brazo-der': 1.0,
    'mano-izq': 0.8, 'mano-der': 0.8,
    'pierna-izq': 1.4, 'pierna-der': 1.4,
    'pie-izq': 1.0, 'pie-der': 1.0
  };

  const ZONE_LABELS = {
    'cabeza': 'Cabeza / Rostro', 'cuello': 'Cuello',
    'pecho': 'Pecho', 'vientre': 'Vientre / Abdomen',
    'brazo-izq': 'Brazo izquierdo', 'brazo-der': 'Brazo derecho',
    'mano-izq': 'Mano izquierda', 'mano-der': 'Mano derecha',
    'pierna-izq': 'Pierna izquierda', 'pierna-der': 'Pierna derecha',
    'pie-izq': 'Pie izquierdo', 'pie-der': 'Pie derecho'
  };

  const COLOR_MULTIPLIER = 1.3;

  // DOM refs
  const areas = document.querySelectorAll('area[data-zone]');
  const zoneLabel = document.getElementById('zoneLabel');
  const selectedDisplay = document.getElementById('selectedZoneDisplay');
  const sizeSlider = document.getElementById('sizeSlider');
  const sizeDisplay = document.getElementById('sizeDisplay');
  const colorToggle = document.getElementById('colorToggle');
  const bynLabel = document.getElementById('bynLabel');
  const colorLabel = document.getElementById('colorLabel');
  const priceAmount = document.getElementById('priceAmount');
  const priceDisplay = document.getElementById('priceDisplay');

  let selectedZone = null;

  // Format price
  function formatPrice(amount) {
    return '$' + Math.round(amount).toLocaleString('es-CL');
  }

  // Calculate price
  function calculatePrice() {
    if (!selectedZone) {
      priceAmount.textContent = '$ —';
      priceDisplay.classList.remove('has-zone');
      return;
    }

    const size = parseInt(sizeSlider.value);
    const isColor = colorToggle.checked;
    const factor = ZONE_FACTORS[selectedZone];

    // Find tier
    let tier = TIERS.find(t => size <= t.max);
    if (!tier) tier = TIERS.find(t => t.id === 'mega');

    if (!tier.base) {
      priceAmount.textContent = 'A cotizar';
      priceDisplay.classList.add('has-zone');
      return;
    }

    let price = tier.base * factor;
    if (isColor) price *= COLOR_MULTIPLIER;

    priceAmount.textContent = formatPrice(price);
    priceDisplay.classList.add('has-zone');
    priceAmount.classList.remove('pulse');
    void priceAmount.offsetWidth; // trigger reflow
    priceAmount.classList.add('pulse');
  }

  // Zone selection
  areas.forEach(area => {
    area.addEventListener('click', function(e) {
      e.preventDefault();
      selectedZone = this.dataset.zone;
      const label = ZONE_LABELS[selectedZone] || this.dataset.label;

      // Update UI
      zoneLabel.innerHTML = 'Zona seleccionada: <strong>' + label + '</strong>';
      selectedDisplay.textContent = label;

      // Visual feedback on silhouette
      areas.forEach(a => a.style.outline = '');
      this.style.outline = '2px solid var(--color-accent-primary)';

      calculatePrice();
    });
  });

  // Slider
  sizeSlider.addEventListener('input', function() {
    sizeDisplay.textContent = this.value + ' cm';
    calculatePrice();
  });

  // Color toggle
  colorToggle.addEventListener('change', function() {
    const isColor = this.checked;
    bynLabel.classList.toggle('active', !isColor);
    colorLabel.classList.toggle('active', isColor);
    calculatePrice();
  });

  // Init
  calculatePrice();
})();
