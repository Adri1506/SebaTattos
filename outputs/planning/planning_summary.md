# Resumen Ejecutivo — Plan de Desarrollo SebaTatto

## Datos Clave

| Ítem | Valor |
|------|-------|
| **Total Execution Packages** | 11 (T01–T11) |
| **Orden** | Secuencial estricto |
| **Estrategia** | Construcción progresiva: base → navbar/hero → secciones → SEO → performance |
| **Stack** | HTML5 + CSS3 vanilla (variables nativas) + JS ES6+ vanilla |
| **Secciones** | 8 (Hero, About, En Acción, Portfolio, Servicios, Calculadora, Contacto, Footer) |
| **Archivos JS** | 4 (main.js, gallery.js, contact.js, calculator.js) |
| **Archivos CSS** | 5 (reset.css, variables.css, layout.css, components.css, responsive.css) |
| **Assets** | 25+ imágenes en `/imagenes/` |

## Orden de Ejecución

| # | Package | Archivos Clave | Dependencia |
|---|---------|---------------|-------------|
| T01 | Estructura Base + CSS Global | `index.html` (esqueleto), `reset.css`, `variables.css`, `layout.css` | — |
| T02 | Navbar + Hero | `#header`, `#hero`, `components.css` (navbar/hero), `main.js` | T01 |
| T03 | Sobre Mí | `#about`, collage 6 fotos, biografía, banner destacado | T02 |
| T04 | En Acción | `#proceso`, grid 8 fotos del tatuador trabajando | T03 |
| T05 | Portafolio + Lightbox | `#portfolio`, `gallery.js`, lightbox modal con anterior/siguiente | T04 |
| T06 | Servicios | `#services`, 6 tarjetas de servicios en grid responsivo | T05 |
| T07 | Calculadora de Precios | `#precios`, `calculator.js`, silueta + imagemap + slider + toggle + pricing | T06 |
| T08 | Contacto + Formulario | `#contact`, `contact.js`, formulario + WhatsApp + email | T07 |
| T09 | Footer + Refinements | `#footer`, `responsive.css` (ajustes finales) | T08 |
| T10 | SEO | Meta tags, Open Graph, JSON-LD, sitemap.xml, robots.txt | T09 |
| T11 | Optimización + Performance | WebP, lazy loading, preconnect, preload, compresión | T10 |

## Principios Rectores

- **Mobile-first:** estilos base = mobile; media queries para tablet/desktop
- **Sin frameworks:** solo HTML, CSS y JS vanilla
- **Sin backend:** formulario vía Formspree; toda la info es estática
- **Datos estructurados:** JSON-LD para SEO (LocalBusiness)
- **Tipografía:** Bebas Neue (títulos), Montserrat (cuerpo), Dancing Script (marca)
- **Paleta:** Negro #0D0D0D + Dorado #D4A017
- **Contacto:** WhatsApp +56971930350 y email adriaticosama@gmail.com (sin Instagram)

## Validación

Cada package debe ser validado por QA inmediatamente después de su ejecución antes de continuar con el siguiente.
