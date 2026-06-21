# QA Report — T01: Estructura Base

**Package:** T01 — Estructura Base (HTML + CSS Global)
**Fecha:** 2026-06-21
**QA Agent:** validación automatizada

---

## Resumen

| Archivo | Estado |
|---|---|
| `index.html` | ✅ Existe |
| `css/reset.css` | ⚠️ Existe (ver issues) |
| `css/variables.css` | ✅ Existe |
| `css/layout.css` | ⚠️ Existe (ver issues) |
| `assets/favicon/` | ✅ Directorio vacío creado |

---

## Acceptance Criteria Checklist

| # | Criterio | Estado | Evidencia |
|---|---|---|---|
| 1 | `index.html` existe con estructura semántica completa (header, 8 sections, footer) | ⚠️ **LOW** — 7 `<section>` + 1 `<footer>` (no 8 `<section>` puras) | index.html:23-47 |
| 2 | Todas las secciones tienen id correcto: hero, about, proceso, portfolio, services, precios, contact, footer | ✅ **PASS** | IDs: hero(L26), about(L29), proceso(L32), portfolio(L35), services(L38), precios(L41), contact(L44), footer(L47) |
| 3 | CSS reset aplica box-sizing border-box, margin/padding reset, font-size 100% | ❌ **CRITICAL** — Faltan `font-size: 100%` en reset.css | reset.css:1-7 (no incluye font-size) |
| 4 | variables.css contiene todos los tokens de color (#0D0D0D, #D4A017, #F5F5F5, etc.) | ✅ **PASS** | variables.css:3-16 (16 colores definidos) |
| 5 | variables.css contiene tokens tipográficos (Bebas Neue, Montserrat, Dancing Script) | ✅ **PASS** | variables.css:19-21 |
| 6 | variables.css contiene spacing scale (xs a 4xl), radii, shadows, transitions, breakpoints | ❌ **HIGH** — Faltan variables de breakpoints. spacing, radii, shadows, transitions existen | variables.css:24-31, 34-37, 40-42, 45-47 |
| 7 | layout.css define clases .container, .section, .section__title, .grid-base | ❌ **HIGH** — Falta `.grid-base` | layout.css:3-41 |
| 8 | layout.css incluye estilos base para body (font-family Montserrat, bg #0D0D0D, color #F5F5F5) | ❌ **HIGH** — Los estilos body están en `reset.css` (L14-19), NO en `layout.css` | reset.css:14-19 vs layout.css |
| 9 | directorio assets/favicon/ creado | ✅ **PASS** | Directorio vacío confirmado |
| 10 | No hay errores ni archivos faltantes | ⚠️ **LOW** — Sin errores sintácticos; js/ no existe (esperado para T01) | — |
| 11 | Arquitectura de directorios respeta máximo 3 niveles de profundidad | ✅ **PASS** | css/, assets/favicon/ dentro de 3 niveles |
| 12 | Google Fonts cargadas con preconnect (3 familias) | ✅ **PASS** | preconnect L9-10, 3 fonts L13 |
| 13 | Script tags JS apuntan a 4 archivos con defer | ✅ **PASS** | main.js, gallery.js, contact.js, calculator.js (L50-53) |

---

## Issues Detected

### 🔴 CRITICAL

**ISS-001 — Falta `font-size: 100%` en reset.css**
- **Archivo:** `css/reset.css`
- **Línea:** N/A (ausente)
- **Descripción:** El reseteo debe incluir `font-size: 100%` para normalizar el tamaño base. La regla actual cubre margin, padding y box-sizing pero omite font-size.
- **Solución:** Agregar `font-size: 100%;` en el bloque universal (`*, *::before, *::after`) o en `html {}`.

### 🟠 HIGH

**ISS-002 — Faltan variables de breakpoints en variables.css**
- **Archivo:** `css/variables.css`
- **Línea:** N/A (ausentes)
- **Descripción:** El AC exige que `variables.css` contenga tokens de breakpoints. Actualmente los breakpoints están hardcodeados en layout.css (768px, 1024px, 1440px) sin declaración previa como variables CSS.
- **Solución:** Agregar `--breakpoint-sm: 480px; --breakpoint-md: 768px; --breakpoint-lg: 1024px; --breakpoint-xl: 1440px;` en `:root`.

**ISS-003 — Falta clase `.grid-base` en layout.css**
- **Archivo:** `css/layout.css`
- **Línea:** N/A (ausente)
- **Descripción:** El AC lista `.grid-base` como una clase que debe definirse en layout.css. No está presente.
- **Solución:** Implementar `.grid-base` con display grid apropiado.

**ISS-004 — Body styles en reset.css en vez de layout.css**
- **Archivo:** `css/layout.css` vs `css/reset.css`
- **Líneas:** reset.css:14-19
- **Descripción:** El AC especifica que `layout.css` debe incluir los estilos base del body (font-family Montserrat, background #0D0D0D, color #F5F5F5). Actualmente están en `reset.css`.
- **Solución:** Mover las reglas `body { ... }` de reset.css a layout.css, o al menos duplicarlas en layout.css según la intención del AC.

### 🟡 LOW

**ISS-005 — 7 `<section>` en lugar de 8**
- **Archivo:** `index.html`
- **Líneas:** 26-44
- **Descripción:** El spec indica "8 <section>" en el output, pero se implementaron 7 `<section>` y 1 `<footer>`. Funcionalmente cubre las 8 secciones semánticas requeridas, pero no cumple estrictamente con el conteo de etiquetas `<section>`.
- **Solución:** Opcional: convertir `<footer id="footer">` a `<section id="footer">` si se requiere estrictamente.

---

## Conclusión

**Veredicto: RECHAZADO**

Se detectaron 1 issue CRITICAL y 3 HIGH que incumplen los Acceptance Criteria del package T01.
