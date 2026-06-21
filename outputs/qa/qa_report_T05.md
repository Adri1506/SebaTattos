# QA Report — T05: Portafolio + Lightbox

**Fecha:** 2026-06-21  
**QA Agent:** Validación de código + revisión de criterios de aceptación  

---

## Resumen

| Aspecto | Resultado |
|---------|-----------|
| **Criterios evaluados** | 13 |
| **Aprobados** | 12 |
| **Rechazados** | 1 |
| **Decisión final** | ❌ RECHAZADO |

---

## Detalle por Criterio

### AC01 — Grid de 12 imágenes en 2col / 3col / 4col
- **Archivo:** `css/components.css:400-544`
- Mobile: `grid-template-columns: repeat(2, 1fr)` (line 402)
- Tablet (≥768px): `grid-template-columns: repeat(3, 1fr)` (line 535)
- Desktop (≥1024px): `grid-template-columns: repeat(4, 1fr)` (line 542)
- 12 imágenes definidas en `js/gallery.js:4-17`
- Las 12 imágenes existen físicamente en `imagenes/`
- ✅ **CUMPLE**

### AC02 — Click en imagen abre lightbox
- **Archivo:** `js/gallery.js:36-45`
- `item.addEventListener('click', () => openLightbox(index))` (line 36)
- `openLightbox()` agrega clase `.open` al lightbox (line 43)
- ✅ **CUMPLE**

### AC03 — Lightbox overlay rgba(0,0,0,0.85)
- **Archivo:** `css/variables.css:15`
- `--color-overlay: rgba(0, 0, 0, 0.85)`
- `.lightbox { background: var(--color-overlay); }` (components.css:450)
- ✅ **CUMPLE**

### AC04 — Botones anterior/siguiente funcionales
- **Archivo:** `js/gallery.js:59-72`
- `prevImage()` y `nextImage()` con navegación circular (lines 59-67)
- Listeners conectados en lines 71-72
- ✅ **CUMPLE**

### AC05 — Contador "X / 12"
- **Archivo:** `js/gallery.js:56`
- `lightboxCounter.textContent = \`${currentIndex + 1} / ${portfolioImages.length}\``
- ✅ **CUMPLE**

### AC06 — Botón cerrar ✕ funcional
- **Archivo:** `index.html:134`, `js/gallery.js:70`
- `<button class="lightbox-close" id="lightboxClose">✕</button>`
- `lightboxClose.addEventListener('click', closeLightbox)`
- ✅ **CUMPLE**

### AC07 — Teclado: ← → ESC funcionan
- **Archivo:** `js/gallery.js:80-85`
- `keydown` listener: `Escape` → close, `ArrowLeft` → prev, `ArrowRight` → next
- Solo responde cuando lightbox está abierto (line 81)
- ✅ **CUMPLE**

### AC08 — Click fuera cierra lightbox
- **Archivo:** `js/gallery.js:75-77`
- `if (e.target === lightbox) closeLightbox()`
- ✅ **CUMPLE**

### AC09 — Transición fade 300ms ❌
- **Archivo:** `css/components.css:446-459`
- `.lightbox` usa `display: none` → `display: flex` al abrir
- No hay propiedades `opacity`, `transition` ni `animation` en `.lightbox` ni `.lightbox.open`
- La variable `--transition-normal: 300ms ease` (definida en variables.css:46) **no se aplica** al lightbox
- CSS no puede animar `display`, por lo que no existe efecto fade alguno
- ❌ **NO CUMPLE**

### AC10 — Lazy loading en thumbnails
- **Archivo:** `js/gallery.js:33`
- `<img ... loading="lazy">`
- ✅ **CUMPLE**

### AC11 — Alt text descriptivo
- **Archivo:** `js/gallery.js:4-17`
- Cada imagen tiene `alt` único y descriptivo: "Tatuaje geométrico", "Tatuaje estilo tradicional", etc.
- ✅ **CUMPLE**

### AC12 — Hover: scale + overlay con icono lupa
- **Archivo:** `css/components.css:421-443`
- `portfolio-item:hover img { transform: scale(1.05); }` (line 421-423)
- `.overlay` con opacidad 0 → 1 en hover (lines 425-438)
- Icono 🔍 (lupa) en overlay (line 441)
- ✅ **CUMPLE**

### AC13 — Sin errores de sintaxis JS
- **Archivo:** `js/gallery.js`
- IIFE correctamente formada, paréntesis balanceados, statements con punto y coma
- Sin errores de sintaxis detectados
- ✅ **CUMPLE**

---

## Hallazgos Adicionales

| ID | Tipo | Descripción | Severidad |
|----|------|-------------|-----------|
| H01 | CSS faltante | El lightbox carece de transición fade. Se requiere agregar `opacity: 0` + `transition` en `.lightbox` y `opacity: 1` en `.lightbox.open`, reemplazando `display: none/flex` por `visibility` + `pointer-events` o similar para que la animación funcione. | HIGH |

---

## Veredicto

**RECHAZADO** — El criterio **AC09 (Transición fade 300ms)** no se cumple. El lightbox aparece/sin transición por usar `display: none/flex` sin propiedades animables. Se requiere corrección y re-evaluación.
