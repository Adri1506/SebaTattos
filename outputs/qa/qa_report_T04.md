# QA Report — T04: En Acción

**Fecha:** 2026-06-21  
**QA Agent:** Validación automatizada + revisión de código  

---

## Resumen

| Aspecto | Resultado |
|---------|-----------|
| **Criterios evaluados** | 8/8 |
| **Aprobados** | 8 |
| **Rechazados** | 0 |
| **Decisión final** | ✅ APROBADO |

---

## Detalle por Criterio

### AC1 — Sección `#proceso` con título "En Acción"
- **Archivo:** `index.html:87-88`
- `<section id="proceso" class="section" aria-label="Galería del tatuador trabajando">`
- `<h2 class="section__title">En Acción</h2>`
- ✅ **CUMPLE**

### AC2 — Grid de 8 fotos (tatuador6.png a tatuador13.jpeg)
- **Archivo:** `index.html:92-116`
- Imágenes: `tatuador7.png`, `tatuador8.png`, `tatuador9.png`, `tatuador10.png`, `tatuador11.png`, `tatuador12.png`, `tatuador13.jpeg`, `tatuador6.png`
- Total: 8 imágenes
- Todas existen físicamente en `imagenes/Tatuador/`
- ✅ **CUMPLE**

### AC3 — Grid 2col mobile, 3col tablet, 4col desktop
- **Archivo:** `css/layout.css:100-134`
- Mobile (default): `grid-template-columns: repeat(2, 1fr)`
- Tablet (≥768px): `grid-template-columns: repeat(3, 1fr)`
- Desktop (≥1024px): `grid-template-columns: repeat(4, 1fr)`
- ✅ **CUMPLE**

### AC4 — Sin overlays ni tags (imágenes limpias)
- No hay overlay divs, etiquetas, ni textos superpuestos
- Cada imagen va directamente dentro de `.proceso-item`
- ✅ **CUMPLE**

### AC5 — `object-fit: cover`, `border-radius` sutil
- **Archivo:** `css/layout.css:112-116`
- `.proceso-item img { object-fit: cover; }`
- `.proceso-item { border-radius: var(--radius-sm); }` = 4px
- ✅ **CUMPLE**

### AC6 — Lazy loading en todas
- Las 8 imágenes llevan `loading="lazy"`
- ✅ **CUMPLE**

### AC7 — Alt text descriptivo
- Cada imagen tiene `alt` único y descriptivo en español:
  - `tatuador7.png` → "SebaTatto — Tatuando en sesión"
  - `tatuador8.png` → "SebaTatto — Preparando el equipo"
  - `tatuador9.png` → "SebaTatto — Detalle del trabajo"
  - `tatuador10.png` → "SebaTatto — Momento creativo"
  - `tatuador11.png` → "SebaTatto — Tatuaje en progreso"
  - `tatuador12.png` → "SebaTatto — Resultado parcial"
  - `tatuador13.jpeg` → "SebaTatto — Cliente satisfecho"
  - `tatuador6.png` → "SebaTatto — Arte en acción"
- ✅ **CUMPLE**

### AC8 — Sin modificar otros archivos
- Archivos modificados: solo `index.html` y `css/layout.css`
- Sin cambios en `components.css`, `variables.css`, `reset.css`, ni `js/*`
- ✅ **CUMPLE**

---

## Hallazgos Adicionales

| ID | Tipo | Descripción | Severidad |
|----|------|-------------|-----------|
| — | — | Ningún hallazgo adicional | — |

---

## Veredicto

**APROBADO** — Todos los criterios de aceptación se cumplen satisfactoriamente.
