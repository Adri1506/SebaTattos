# QA Summary — T05: Portafolio + Lightbox

| Criterio | Estado |
|----------|--------|
| AC01 — Grid 2col/3col/4col + 12 imágenes | ✅ |
| AC02 — Click abre lightbox | ✅ |
| AC03 — Overlay rgba(0,0,0,0.85) | ✅ |
| AC04 — Botones anterior/siguiente | ✅ |
| AC05 — Contador "X / 12" | ✅ |
| AC06 — Botón cerrar ✕ | ✅ |
| AC07 — Teclado ← → ESC | ✅ |
| AC08 — Click fuera cierra | ✅ |
| AC09 — Transición fade 300ms | ❌ |
| AC10 — Lazy loading | ✅ |
| AC11 — Alt text descriptivo | ✅ |
| AC12 — Hover scale + lupa | ✅ |
| AC13 — Sin errores JS | ✅ |

**Resultado: 12/13 aprobados → ❌ RECHAZADO**

**Motivo:** Lightbox carece de transición fade por usar `display: none/flex` sin propiedades animables (`opacity`/`transition`).
