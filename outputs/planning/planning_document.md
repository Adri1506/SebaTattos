# Plan de Desarrollo — SebaTatto

**Versión:** 1.0  
**Fecha:** 2026-06-21  
**Agente:** Planner Agent  
**Basado en:** `architecture_document.md` v1.1, `design_document.md` v1.0  
**Estado:** Listo para Developer Agent

---

## 1. Resumen del Plan

- **Total execution_packages:** 11 (T01–T11)
- **Orden:** Secuencial estricto (cada package depende del anterior)
- **Estrategia:** Construcción progresiva del sitio, sección por sección, comenzando por la estructura base y CSS global, luego añadiendo secciones individuales con su HTML, CSS y JS, finalizando con SEO y performance.
- **Validación QA:** Cada package debe ser validado individualmente después de su ejecución.
- **Estimación:** ~11 ciclos de desarrollo independientes.

---

## 2. Lista de Execution Packages

| Task ID | Título | Depende de | Módulo | Archivos a generar |
|---------|--------|-----------|--------|---------------------|
| T01 | Estructura Base + CSS Global | — | Infraestructura | index.html (esqueleto), reset.css, variables.css, layout.css |
| T02 | Navbar + Hero | T01 | Navegación, Hero | index.html (#header, #hero), components.css (navbar, hero), main.js |
| T03 | Sobre Mí | T02 | About | index.html (#about), layout.css (about grid), components.css (collage) |
| T04 | En Acción | T03 | Proceso/Galería | index.html (#proceso), layout.css (proceso grid) |
| T05 | Portafolio + Lightbox | T04 | Portfolio | index.html (#portfolio), gallery.js, components.css (lightbox) |
| T06 | Servicios | T05 | Services | index.html (#services), components.css (service cards) |
| T07 | Calculadora de Precios | T06 | Calculadora | index.html (#precios), calculator.js, components.css (calculator) |
| T08 | Contacto + Formulario | T07 | Contacto | index.html (#contact), contact.js, components.css (form) |
| T09 | Footer + Refinements | T08 | Footer | index.html (#footer), responsive.css (refinements finales) |
| T10 | SEO | T09 | Meta/SEO | index.html (meta tags, Open Graph, JSON-LD) |
| T11 | Optimización + Performance | T10 | Performance | WebP conversion, lazy loading, preconnect, preload |

---

## 3. Dependencias entre Packages

```
T01 (Base HTML + CSS)
 └── T02 (Navbar + Hero)
      └── T03 (Sobre Mí)
           └── T04 (En Acción)
                └── T05 (Portafolio + Lightbox)
                     └── T06 (Servicios)
                          └── T07 (Calculadora)
                               └── T08 (Contacto)
                                    └── T09 (Footer + Responsive)
                                         └── T10 (SEO)
                                              └── T11 (Performance)
```

**Regla:** No se puede iniciar T(N) sin que T(N-1) esté completado y validado por QA.

---

## 4. Matriz de Arquitectura vs Packages

| Componente Arquitectónico | T01 | T02 | T03 | T04 | T05 | T06 | T07 | T08 | T09 | T10 | T11 |
|--------------------------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| reset.css | ✅ | | | | | | | | | | |
| variables.css | ✅ | | | | | | | | | | |
| layout.css | ✅ | | ✅ | ✅ | | | | | ✅ | | |
| components.css | | ✅ | ✅ | | ✅ | ✅ | ✅ | ✅ | | | |
| responsive.css | | | | | | | | | ✅ | | |
| main.js | | ✅ | | | | | | | | | |
| gallery.js | | | | | ✅ | | | | | | |
| calculator.js | | | | | | | ✅ | | | | |
| contact.js | | | | | | | | ✅ | | | |
| index.html | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | |
| SEO (meta/JSON-LD) | | | | | | | | | | ✅ | |
| Imágenes optimizadas | | | | | | | | | | | ✅ |

---

## 5. Criterios de Aceptación Globales

- ✅ Sitio 100% responsivo (mobile-first, 3 breakpoints)
- ✅ Sin frameworks ni librerías externas (solo Google Fonts y Formspree)
- ✅ Código HTML semántico y validado
- ✅ Contraste WCAG AA en todos los pares de color
- ✅ Navegación por teclado funcional
- ✅ Imágenes con lazy loading (excepto hero)
- ✅ Sin errores de consola JS
- ✅ Meta tags OG y JSON-LD presentes
- ✅ Todos los enlaces funcionan (WhatsApp, email, anchor links)

---

## 6. Notas para el Developer

1. Seguir estrictamente la estructura de directorios definida en arquitectura.
2. Usar siempre las variables CSS definidas en `variables.css`.
3. Mobile-first: escribir estilos base para mobile, después media queries.
4. No renombrar ni mover assets existentes en `/imagenes/`.
5. Cada package debe ser funcional y visualmente completo antes de pasar al siguiente.
6. Los archivos JS se cargan al final del `<body>` con `<script defer>`.
7. Las fuentes de Google Fonts se cargan con preconnect y preload para evitar FOIT.
8. El formulario de contacto apunta a Formspree como servicio externo.

---

## 7. Assets por Sección

| Sección | Assets Requeridos | Ubicación |
|---------|-------------------|-----------|
| Hero | `banner.png`, `Logo.png` | `imagenes/Tatuador/` |
| About | `tatuador.png`, `tatuador2.png`...`tatuador13.jpeg` (13 fotos, usar 6) | `imagenes/Tatuador/` |
| About (banner) | `banner.png` (reutilizado) | `imagenes/Tatuador/` |
| En Acción | `tatuador6.png`...`tatuador13.jpeg` (8 fotos) | `imagenes/Tatuador/` |
| Portfolio | `foto1.jpeg`...`foto13.png` (12 imágenes) | `imagenes/` |
| Calculadora | `silueta.png` (322×726) | `imagenes/` |

---

*Fin del Documento de Planificación — SebaTatto v1.0*
