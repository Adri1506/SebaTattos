# Documento de Arquitectura — SebaTatto

## Control de Versiones

| Versión | Fecha | Autor | Cambios |
|---------|-------|-------|---------|
| 1.0 | 2026-06-21 | Arquitecto | Versión inicial |
| 1.1 | 2026-06-21 | Arquitecto | Actualización post-diseño: nuevas secciones (En Acción, Calculadora), cambios en contacto, tipografía, y silueta |

---

## 1. Resumen del Proyecto (Project Overview)

- **Nombre del proyecto:** SebaTatto
- **Tipo:** Sitio web estático de página única (Single Page Application-like con scroll navegable)
- **Propósito:** Plataforma profesional para emprendimiento de tatuajes a domicilio
- **Audiencia objetivo:** Clientes potenciales que buscan servicios de tatuaje a domicilio
- **Dominio estimado:** Bajo (página informativa, sin operaciones transaccionales)
- **Equipo:** 1 desarrollador / diseñador
- **Ciclo de vida:** Largo (web corporativa de emprendimiento)

---

## 2. Análisis de Requisitos (Requirements Analysis)

### 2.1 Requisitos Funcionales

| ID | Requisito | Descripción | Prioridad |
|----|-----------|-------------|-----------|
| RF01 | Hero/Banner | Sección principal con banner.png y llamado a la acción | Alta |
| RF02 | Sobre mí | Sección con fotos del tatuador, biografía y banner destacado al final | Alta |
| RF03 | Portafolio/Galería | Cuadrícula de 12 trabajos de tatuajes con lightbox modal | Alta |
| RF04 | Servicios | Lista de servicios ofrecidos en tarjetas | Alta |
| RF05 | Contacto | Formulario de contacto + enlaces WhatsApp (+56971930350) y email (adriaticosama@gmail.com) | Alta |
| RF06 | Footer | Datos de contacto y copyright | Alta |
| RF07 | Navegación | Menú sticky con anchor links a 7 secciones | Media |
| RF08 | En Acción | Galería de 8 fotos del tatuador trabajando (proceso) | Media |
| RF09 | Calculadora de Precios | Cotizador interactivo: silueta humana con zonas cliqueables, slider de tamaño, toggle color, precio en vivo | Alta |

### 2.2 Requisitos No Funcionales

| ID | Requisito | Descripción | Prioridad |
|----|-----------|-------------|-----------|
| RNF01 | Responsivo | Diseño mobile-first adaptable a tablets y desktop | Alta |
| RNF02 | Performance | Carga rápida de imágenes (lazy loading, formatos optimizados) | Alta |
| RNF03 | SEO básico | Meta tags, Open Graph, heading structure semántica | Media |
| RNF04 | Accesibilidad | Contraste suficiente, alt text en imágenes, semantic HTML | Media |
| RNF05 | Sin dependencias externas | Sin frameworks pesados ni librerías externas complejas | Alta |

### 2.3 Restricciones

| ID | Restricción | Impacto |
|----|-------------|---------|
| C01 | Todo debe ser estático (sin backend, sin base de datos) | No hay procesamiento server-side; el formulario de contacto puede usar servicio externo (Formspree, EmailJS) |
| C02 | Sin carrito de compras ni pagos | No se requiere lógica transaccional |
| C03 | Sin frameworks pesados | Solo HTML5, CSS3, JavaScript vanilla |
| C04 | Assets visuales ya existentes en `/imagenes/` | La estructura de imágenes está definida y debe respetarse |

---

## 3. Patrón Arquitectónico Seleccionado (Selected Architecture Pattern)

**Patrón:** **MVC (Model-View-Controller)** adaptado a contexto estático

### Justificación

Según el catálogo `architectures.yaml`, la arquitectura MVC es ideal para "Landing Pages" y "Aplicaciones Web", con un score de:

| Dimensión | Puntaje |
|-----------|---------|
| Simplicidad | 8/10 |
| Mantenibilidad | 8/10 |
| Despliegue | 9/10 |
| Curva de aprendizaje | 9/10 |

Adaptación al contexto estático:

| Componente | Rol en SebaTatto |
|------------|-------------------|
| **Model** | Datos estructurados del sitio embebidos como objetos JS o JSON-LD: lista de servicios, información del tatuador, metadatos de portfolio, config de navegación |
| **View** | HTML semántico en `index.html` (estructura de secciones) + CSS modular para estilos y responsividad |
| **Controller** | JavaScript vanilla para: navegación por scroll, lightbox de galería, validación de formulario, animaciones, manejo de eventos |

### Flujo General

```
Usuario → Controller (JS) → actualiza/controla → View (HTML + CSS)
                 ↕
            Model (Datos JS)
```

---

## 4. Tipo de Arquitectura (Architecture Type)

- **Tipo:** Static MVC — Landing Page / Corporate Site
- **Subtipo:** Página única multi-sección con navegación por anclas
- **Despliegue:** Archivos estáticos (HTML, CSS, JS, Assets)
- **Hostings compatibles:** GitHub Pages, Netlify, Vercel, cualquier servidor web estático

### Alternativas Descartadas

| Arquitectura | Motivo de descarte |
|--------------|--------------------|
| **Monolítica** | Pensada para apps full-stack con backend; sobreingeniería para sitio estático |
| **Clean Architecture** | Excesiva abstracción; requiere 2+ desarrolladores según catálogo; curva alta |
| **Hexagonal** | Excesiva para un sitio sin lógica de dominio compleja |
| **Microservicios** | Completamente inapropiado para un sitio estático de 1 página |
| **MVVM** | Orientado a apps móviles/escritorio con binding reactivo; innecesario aquí |
| **ECS** | Arquitectura de videojuegos, sin relación con el dominio |

---

## 5. Stack Tecnológico Seleccionado (Selected Stack)

Basado en el catálogo `stack_map.yaml` (entrada MVC) y las restricciones del proyecto:

### 5.1 Lenguajes

| Tecnología | Versión Recomendada | Justificación |
|------------|---------------------|---------------|
| **HTML5** | Estándar W3C | Base de cualquier sitio web. Semántico para SEO. |
| **CSS3** | Estándar W3C | Sin preprocesadores. Variables CSS nativas para mantener consistencia. |
| **JavaScript** | ES6+ (ECMAScript 2020+) | Vanilla JS, sin frameworks. Solo lo necesario para interacciones. |

### 5.2 Herramientas y Servicios (Opcionales)

| Herramienta | Propósito | Notas |
|-------------|-----------|-------|
| **Formspree** (o EmailJS) | Procesamiento del formulario de contacto | Sin backend; estos servicios reciben POST del formulario y reenvían por email |
| **Google Fonts** | Tipografía personalizada | 3 familias: Bebas Neue (títulos), Montserrat (cuerpo), Dancing Script (marca) |
| **Emoji/Unicode** | Iconos para servicios y contacto | Sin dependencia de icon fonts; se usan emojis nativos |
| **Squoosh CLI** | Optimización de imágenes | Compresión manual antes del deploy |
| **GitHub Pages / Netlify** | Hosting estático | Gratuito, con SSL automático, soporte para dominio personalizado |

### 5.3 Lo que NO se usa

| Tecnología | Motivo |
|------------|--------|
| Node.js / npm | No se requiere procesamiento server-side ni build tools |
| Webpack / Vite | Sin bundling; vanilla HTML+CSS+JS sin compilación |
| React / Vue / Angular | Violaría la restricción "sin frameworks pesados" y es excesivo |
| Bootstrap / Tailwind | Preferir CSS vanilla con variables; mantener control total y mínimo peso |
| Base de datos | Sin backend; toda la información es estática |
| CMS | No se requiere gestión de contenido dinámico |

---

## 6. Validación Tecnológica (Technology Validation)

- **Compatibilidad verificada:** HTML5 + CSS3 + ES6+ son 100% compatibles entre sí.
- **Obsoletencias detectadas:** Ninguna — el stack es actual y estándar.
- **Riesgo de breaking changes:** Nulo (tecnologías maduras y estandarizadas).
- **Alternativas evaluadas:** Ninguna supera a vanilla HTML/CSS/JS en simplicidad para este proyecto.

---

## 7. Estructura de Módulos (Module Structure)

El sitio se organiza en **8 módulos funcionales** (cada uno = una sección del sitio):

| Módulo | ID Sección | Contenido | Assets Asociados |
|--------|------------|-----------|-------------------|
| **Hero** | `#hero` | Banner principal, logo redondo, CTA "Agenda tu cita" | `banner.png`, `Logo.png` |
| **Sobre mí** | `#about` | Biografía del tatuador, collage de 6 fotos personales, banner destacado al final | `Tatuador/tatuador*.png`, `tatuador13.jpeg`, `banner.png` |
| **En Acción** | `#proceso` | Galería de 8 fotos del tatuador trabajando (proceso) | `Tatuador/tatuador7`–`tatuador13.jpeg`, `tatuador6.png` |
| **Portafolio** | `#portfolio` | Galería masonry/grid de 12 trabajos con lightbox modal | `foto1.jpeg`–`foto13.png` |
| **Servicios** | `#services` | 6 tarjetas de servicios ofrecidos | Iconos decorativos (emoji/HTML) |
| **Calculadora** | `#precios` | Cotizador interactivo: silueta HTML imagemap, slider tamaño, toggle color, precio en vivo + tabla referencia | `silueta.png` |
| **Contacto** | `#contact` | Formulario (nombre, email, teléfono, mensaje) + botón WhatsApp + email directo | Iconos decorativos |
| **Footer** | `#footer` | Copyright, enlaces WhatsApp y email | — |

---

## 8. Estructura de Directorios (Folder Structure)

> **Nota:** Se respeta la regla de máximo 3 niveles de profundidad desde la raíz.

```
SebaTatto/
│
├── index.html                  # Página principal (única)
│
├── css/
│   ├── reset.css               # Normalización de estilos entre navegadores
│   ├── variables.css           # Variables CSS (colores, tipografías, spacing)
│   ├── layout.css              # Estructura general, grid, flex, secciones
│   ├── components.css          # Componentes reutilizables (cards, botones, navbar)
│   └── responsive.css          # Media queries mobile-first
│
├── js/
│   ├── main.js                 # Nav, scroll suave, menú hamburguesa, animaciones, active link
│   ├── gallery.js              # Lightbox modal con navegación entre fotos
│   ├── contact.js              # Validación de formulario, integración con servicio externo
│   └── calculator.js           # Cotizador: lógica de precios, imagemap zones, slider, toggle color
│
├── imagenes/
│   ├── Tatuador/               # Fotos del artista (tatuador*.png, tatuador13.jpeg) + banner.png + Logo.png
│   ├── foto1.jpeg              # Portfolio — imágenes de tatuajes realizados
│   ├── foto2.jpeg
│   ├── foto4.jpeg
│   ├── foto5.png – foto13.png
│   ├── silueta.png             # Silueta humana (322×726) para el cotizador interactivo
│   └── ...                     # Resto del portfolio
│
├── assets/
│   ├── icons/                  # Iconos SVG inline o archivos .svg
│   └── favicon/                # Favicon del sitio
│
└── outputs/                    # Artefactos generados por agentes del sistema
    └── architecture/           # Documentos de arquitectura (este archivo)
```

### Notas sobre niveles adicionales

- Si el portafolio creciera a más de 30 imágenes, se podría subdividir `imagenes/portfolio/` pero con el volumen actual (12 imágenes) no es necesario.
- Para SEO avanzado, se podría añadir un `sitemap.xml` y `robots.txt` en la raíz.

---

## 9. Responsabilidades por Capa (Layer Responsibilities)

### Capa View (HTML + CSS)

| Archivo | Responsabilidad |
|---------|-----------------|
| `index.html` | Estructura semántica completa del sitio: `<header>`, 6 secciones (`<section>`), `<footer>`. Meta tags, Open Graph, JSON-LD para SEO. |
| `reset.css` | Normalizar estilos por defecto del navegador (box-sizing, margin reset) |
| `variables.css` | Definir tokens de diseño: colores primarios/secundarios, tipografía, tamaños, breakpoints |
| `layout.css` | Estructura general: grid del portafolio, flexbox del hero, distribución de secciones |
| `components.css` | Estilos de componentes: navbar, botones, cards de servicios, lightbox, formulario |
| `responsive.css` | Ajustes responsivos mobile-first: menú hamburguesa, grid adaptable, tamaños de fuente |

### Capa Controller (JavaScript)

| Archivo | Responsabilidad |
|---------|-----------------|
| `main.js` | Scroll suave entre secciones, menú hamburguesa (toggle), efecto de active en nav, animaciones al scroll (Intersection Observer), carga lazy de imágenes |
| `gallery.js` | Lightbox modal para ver tatuajes en grande, navegación entre fotos (anterior/siguiente/teclado), precarga de imágenes cercanas |
| `contact.js` | Validación de formulario en cliente (campos requeridos, formato email), envío a servicio externo (Formspree/EmailJS), feedback visual al usuario |

### Capa Model (Datos JS)

Embebidos directamente en el HTML o en un archivo JS de datos:

```javascript
// Datos del sitio (modelo)
const SITE_DATA = {
  artist: {
    name: "Sebastián",
    bio: "...",
    photos: ["imagenes/Tatuador/tatuador1.png", ...]
  },
  portfolio: [
    { id: 1, src: "imagenes/foto1.jpeg", alt: "Descripción..." },
    // ...
  ],
  services: [
    { name: "Tatuajes a domicilio", description: "...", icon: "..." },
    // ...
  ],
  social: {
    whatsapp: "https://wa.me/56971930350",
    email: "adriaticosama@gmail.com"
  },
  pricing: {
    sizeTiers: [
      { id: "mini", maxCm: 5, basePrice: 35000 },
      { id: "pequeno", minCm: 6, maxCm: 10, basePrice: 70000 },
      { id: "mediano", minCm: 11, maxCm: 15, basePrice: 120000 },
      { id: "grande", minCm: 16, maxCm: 25, basePrice: 200000 },
      { id: "mega", minCm: 26, basePrice: null }  // A cotizar
    ],
    zoneFactors: {
      cabeza: 1.5, cuello: 1.3, pecho: 1.8, vientre: 1.6,
      "brazo-izq": 1.0, "brazo-der": 1.0,
      "mano-izq": 0.8, "mano-der": 0.8,
      "pierna-izq": 1.4, "pierna-der": 1.4,
      "pie-izq": 1.0, "pie-der": 1.0
    },
    colorMultiplier: 1.3
  }
};
```

---

## 10. Dependencias Externas (External Dependencies)

| Dependencia | Tipo | Propósito | Alternativa sin ella |
|-------------|------|-----------|---------------------|
| **Formspree** (o EmailJS) | Servicio HTTP externo | Envío de emails desde formulario sin backend | Mostrar solo email de contacto (menos funcional) |
| **Google Fonts** | CDN | Tipografía personalizada | Usar fuentes del sistema (fallback) |
| **Servicio de hosting** (GitHub Pages, Netlify) | Infraestructura | Alojar archivos estáticos | Servidor HTTP propio |

Todas las dependencias externas son **reemplazables** y no críticas para el funcionamiento base del sitio.

---

## 11. Supuestos (Assumptions)

| ID | Supuesto | Impacto si es incorrecto |
|----|----------|--------------------------|
| A01 | El cliente tiene o adquirirá un dominio personalizado | Si no, se usará la URL del hosting (netlify.app, github.io) |
| A02 | Las imágenes del portfolio están en resolución suficiente para verse en desktop | Si no, se verán pixeladas; requeriría reemplazo |
| A03 | El formulario de contacto no requiere almacenamiento persistente de datos | Si se necesitara, habría que agregar backend o un CMS headless |
| A04 | El tatuador tiene WhatsApp activo (+56971930350) y email | Si no, se deberán ajustar los enlaces de contacto |
| A05 | No se requiere multi-idioma | Si se requiriera, se podría implementar con i18n en JS |
| A06 | La silueta (silueta.png 322×726) tiene coordenadas precisas para las 12 zonas corporales | Si las coordenadas son incorrectas, la selección de zona no funcionará correctamente |
| A07 | El pricing (tamaño × zona × color) será validado antes del deploy | Si no, los precios mostrados podrían no coincidir con los reales |

---

## 12. Restricciones (Constraints)

| ID | Restricción | Detalle |
|----|-------------|---------|
| C01 | Sin backend | Todo el sitio debe ser servible como archivos estáticos |
| C02 | Sin base de datos | No hay persistencia de datos del lado del servidor |
| C03 | Sin frameworks JS | Solo JavaScript vanilla (ES6+). Sin React, Vue, Angular, etc. |
| C04 | Responsive obligatorio | El diseño debe funcionar en mobile, tablet y desktop |
| C05 | Assets existentes fijos | Las imágenes del portfolio y del tatuador ya existen y no deben moverse/renombrarse sin coordinación |

---

## 13. Riesgos (Risks)

| ID | Riesgo | Probabilidad | Impacto | Mitigación |
|----|--------|-------------|---------|------------|
| R01 | Imágenes de portfolio muy pesadas (>1MB cada una) | Alta | Alto — lentitud en carga | Usar lazy loading nativo (`loading="lazy"`), comprimir imágenes con Squoosh a WebP/AVIF, usar srcset |
| R02 | El formulario de contacto sin backend depende de servicio externo (Formspree/EmailJS) | Media | Medio — si el servicio cae, el formulario no funciona | Mostrar email directo como fallback visible |
| R03 | Diseño responsive mal implementado en dispositivos muy pequeños (<320px) | Baja | Medio — mala experiencia en algunos dispositivos | Probar en múltiples viewports durante desarrollo |
| R04 | Crecimiento futuro del portafolio sin plan de organización | Media | Bajo — desorden en imágenes | La estructura `imagenes/` soporta añadir más archivos sin cambios |
| R05 | El logo (1254×1254) puede ser pesado para hero sin optimizar | Alta | Medio — afecta LCP (Largest Contentful Paint) | Redimensionar y comprimir el logo; usar formato moderno |

---

## 14. Decisiones Arquitectónicas Clave (Decision Log)

### Decisión 1: Página única vs. Multi-página

- **Decisión:** Página única multi-sección con scroll
- **Justificación:** Para un sitio informativo pequeño, una sola página ofrece mejor experiencia de navegación continua, es más fácil de mantener y evita recargas. Ideal para storytelling visual del emprendimiento.
- **Impacto:** La navegación es por anclas (`#hero`, `#about`, `#portfolio`, etc.). No hay cambio de URLs, toda la SEO se concentra en una sola página.

### Decisión 2: Sin preprocesadores CSS ni build tools

- **Decisión:** CSS vanilla con variables nativas
- **Justificación:** Sin necesidad de compilación, reduce la complejidad del pipeline, cero dependencias de desarrollo. Las variables CSS nativas cubren las necesidades de consistencia visual.
- **Impacto:** Sin Hot Reload, pero el flujo de trabajo es abrir HTML en el navegador directamente.

### Decisión 3: JavaScript vanilla modular por archivo

- **Decisión:** Separar JS en 3 archivos (main.js, gallery.js, contact.js)
- **Justificación:** Mantiene responsabilidades separadas sin necesidad de un bundler. Cada archivo tiene una función clara.
- **Impacto:** Se cargan 3 archivos JS (vs 1). Para un sitio estático pequeño es irrelevante en performance y mejora la legibilidad.

### Decisión 4: Lazy loading nativo para imágenes

- **Decisión:** Usar `loading="lazy"` de HTML nativo + Intersection Observer como fallback
- **Justificación:** Mejora significativa en tiempo de carga inicial sin librerías adicionales.
- **Impacto:** Las imágenes del portfolio se cargan solo cuando el usuario scrollea cerca de ellas.

### Decisión 5: JSON-LD para datos estructurados SEO

- **Decisión:** Incluir datos estructurados en formato JSON-LD en el `<head>`
- **Justificación:** Mejora la visibilidad en buscadores con rich snippets (reseñas, perfil de artista, horarios).
- **Impacto:** Sin efecto en la UI, solo en resultados de búsqueda.

### Decisión 6: Mobile-first CSS

- **Decisión:** Escribir estilos base para mobile, luego `@media (min-width: ...)` para tablets y desktop
- **Justificación:** El tráfico móvil es dominante para búsquedas locales de servicios. Mobile-first asegura buena experiencia en el dispositivo más usado.
- **Impacto:** Los estilos base son para mobile; se añaden capas para pantallas más grandes.

### Decisión 7: Servicio externo para formulario de contacto

- **Decisión:** Usar Formspree (o EmailJS) para procesar el formulario
- **Justificación:** Única manera de enviar emails sin backend. Estos servicios reciben un POST HTTP y reenvían el contenido del formulario a una dirección email configurada.
- **Impacto:** Dependencia externa leve. Si el servicio no está disponible, se muestra mensaje de error y el email de contacto directo.

### Decisión 8: Silueta PNG + HTML imagemap en lugar de SVG

- **Decisión:** Usar imagen PNG (silueta.png, 322×726) con mapa de imagen HTML (`<map>` + `<area shape="rect">`) para la selección de zonas corporales
- **Justificación:** El cliente solicitó explícitamente el reemplazo del SVG por la imagen real. El HTML imagemap es compatible con todos los navegadores y no requiere librerías adicionales. Las 12 zonas se definen con coordenadas rectangulares.
- **Impacto:** Las coordenadas deben calibrarse manualmente. Si la imagen cambia de dimensiones, las coordenadas deben recalibrarse. Cada `<area>` tiene atributos `data-zone` y `data-label` para integración con JS.

### Decisión 9: Tres familias tipográficas (Bebas Neue + Montserrat + Dancing Script)

- **Decisión:** Usar Bebas Neue para títulos seccionales, Montserrat para cuerpo, y Dancing Script para el nombre de marca (navbar, hero h1, footer)
- **Justificación:** Dancing Script aporta una identidad manuscrita elegante y distintiva para la marca, diferenciando el nombre del resto del contenido. Se mantienen Bebas Neue y Montserrat para el resto de la jerarquía visual.
- **Impacto:** 3 familias de Google Fonts (vs 2 originalmente planeadas). Puede tener un impacto menor en performance de carga que se mitiga con `preconnect` y `preload`.

### Decisión 10: Sin Instagram — solo WhatsApp + Email

- **Decisión:** Eliminar el botón/enlace de Instagram del sitio. Los únicos canales de contacto directo son WhatsApp (+56971930350) y email (adriaticosama@gmail.com)
- **Justificación:** El cliente no desea promocionar Instagram en el sitio.
- **Impacto:** Menos elementos en la sección de contacto y footer. La estrategia de redes sociales queda fuera del sitio web.

---

## 15. Estrategia de Optimización de Imágenes

Dado que el proyecto tiene **25+ imágenes** (12 portfolio + 12+ tatuador + logo + banner), la estrategia es:

| Acción | Detalle |
|--------|---------|
| **Formato moderno** | Convertir JPG/PNG a **WebP** con respaldo del original |
| **srcset** | Usar `<picture>` o `srcset` para servir resoluciones adecuadas |
| **Lazy loading** | `loading="lazy"` en imágenes del portfolio y tatuador (no en hero) |
| **Dimensiones** | Redimensionar logo (1254×1254 → ~200×200 o según diseño) |
| **Compresión** | Squoosh CLI: calidad 80% para JPG, lossy para WebP |
| **Carga crítica** | El hero banner (1983×793) debe cargarse sin lazy (prioridad alta) |

### Tamaños estimados post-optimización

| Tipo | Original | Optimizado (WebP) |
|------|----------|-------------------|
| Logo (1254×1254) | ~500 KB | ~50-80 KB |
| Banner (1983×793) | ~400 KB | ~100-150 KB |
| Fotos portfolio (900×1600) | ~300-500 KB c/u | ~80-150 KB c/u |
| Fotos tatuador (varias) | ~200-400 KB c/u | ~60-120 KB c/u |

---

## 16. Consideraciones de SEO

### Meta Tags

```html
<title>SebaTatto — Tatuajes a Domicilio | [Ciudad]</title>
<meta name="description" content="Tatuajes profesionales a domicilio. Diseños personalizados, ambiente seguro y resultados de calidad. Agenda tu cita con SebaTatto.">
<meta name="keywords" content="tatuajes a domicilio, tatuador, tatuajes personalizados, [ciudad]">
<meta name="author" content="SebaTatto">

<!-- Open Graph -->
<meta property="og:title" content="SebaTatto — Tatuajes a Domicilio">
<meta property="og:description" content="Tatuajes profesionales a domicilio. Diseños personalizados.">
<meta property="og:image" content="https://[dominio]/imagenes/Tatuador/banner.png">
<meta property="og:type" content="website">
<meta property="og:url" content="https://[dominio]">
```

### Datos Estructurados (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "SebaTatto",
  "description": "Tatuajes a domicilio profesionales",
  "image": "https://[dominio]/imagenes/Tatuador/Logo.png",
  "url": "https://[dominio]",
  "telephone": "[teléfono]",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "[Ciudad]",
    "addressCountry": "AR"
  }
}
```

### Buenas Prácticas

- Encabezados jerárquicos (`<h1>` → `<h2>` → `<h3>`)
- Texto alternativo descriptivo en todas las imágenes (`alt`)
- Atributos `aria-label` en elementos interactivos
- URL canónica para evitar contenido duplicado
- `sitemap.xml` y `robots.txt` en la raíz (opcional pero recomendado)

---

## 17. Mapa del Sitio / Estructura de Navegación

```
SebaTatto — Página Principal
│
├── #hero          → Banner + Logo + CTA principal
│
├── #about         → Sobre el artista (collage de 6 fotos + bio + banner destacado)
│
├── #proceso       → Galería "En Acción" (8 fotos del artista trabajando)
│
├── #portfolio     → Galería de trabajos (12 imágenes)
│   └── Lightbox   → Modal de visualización ampliada
│
├── #services      → Servicios ofrecidos (6 tarjetas)
│
├── #precios       → Calculadora interactiva (silueta + slider + toggle)
│
├── #contact       → Formulario + WhatsApp + email directo
│
└── #footer        → Enlaces + copyright
```

### Flujo de Navegación del Usuario

```
1. Usuario llega al sitio (desde Google, WhatsApp, recomendación)
       │
2. Ve el HERO con banner y CTA "Agenda tu cita"
       │
3. Scrollea o hace clic en "Sobre mí" en la navbar
       │
4. Lee la biografía, ve el collage de fotos del tatuador + banner destacado
       │
5. Ve "En Acción" — galería del proceso de trabajo del artista
       │
6. Explora el PORTAFOLIO — puede hacer clic en imágenes
       │       └── Lightbox se abre para ver detalle
       │
7. Scrollea a SERVICIOS — conoce qué se ofrece (6 servicios)
       │
8. Usa la CALCULADORA DE PRECIOS — selecciona zona en la silueta, ajusta tamaño, elige color y ve el precio estimado
       │
9. Scrollea a CONTACTO — completa formulario o usa WhatsApp / email directo
       │
10. Ve el FOOTER con enlaces y copyright
```

### Árbol de Componentes

```
index.html
├── <header>
│   └── Navbar (logo Dancing Script "SebaTatto" + menú hamburguesa + 7 anchor links)
├── <section#hero>
│   ├── Hero-bg (banner.png con overlay gradient)
│   ├── Logo redondo (con borde dorado y glow)
│   ├── H1 "SebaTatto" (Dancing Script)
│   ├── Subtítulo "Tatuajes a Domicilio"
│   └── CTA button "Agenda tu Cita"
├── <section#about>
│   └── About-grid
│       ├── Collage de 6 fotos del tatuador (grid 2col mobile, 3col desktop)
│       └── Texto biográfico + banner.png destacado al final con overlay
├── <section#proceso> (En Acción)
│   └── Proceso-grid (8 fotos tatuador trabajando, 2col → 3col → 4col)
├── <section#portfolio>
│   ├── Portfolio-grid (12 imágenes, 2col → 3col → 4col)
│   └── Lightbox modal (navegación anterior/siguiente + cerrar + contador)
├── <section#services>
│   └── Services-grid (6 cards de servicios, 1col → 2col → 3col)
├── <section#precios> (Calculadora)
│   └── Precios-grid (3 columnas en desktop)
│       ├── Tabla de referencia rápida (mini/pequeño/mediano/grande/mega)
│       ├── Silueta humana (imagen 322×726 + HTML imagemap con 12 zonas)
│       └── Controles: label zona, slider tamaño (1-30cm), toggle color (ByN/Color), precio en vivo, CTA
├── <section#contact>
│   ├── Formulario (nombre, email, teléfono opcional, mensaje)
│   └── Contacto directo: botón WhatsApp (+56971930350) + email (adriaticosama@gmail.com)
└── <footer>
    ├── Enlaces WhatsApp + email
    └── Copyright con brand Dancing Script
```

---

## 18. Recomendaciones de Performance

1. **Carga crítica vs no crítica:**
   - **Carga prioritaria:** Banner del hero, logo, CSS principal, fonts
   - **Carga diferida:** Portfolio, fotos del tatuador (no visibles al inicio)

2. **Estrategia de imágenes:**
   - Hero banner: `<img fetchpriority="high" loading="eager">`
   - Portfolio/tatuador: `<img loading="lazy">`

3. **CSS crítico inline:** Considerar inlinear el CSS crítico (hero + navbar) en el `<head>` para mejorar First Contentful Paint (FCP).

4. **Fuentes:** Precargar Google Fonts con `<link rel="preload">` para evitar FOIT (Flash of Invisible Text).

---

## 19. Preparado para el siguiente agente (ready_for_next)

✅ **ready_for_next = true** | **Versión 1.1**

El documento está completo y actualizado con los cambios introducidos durante la fase de diseño. Los siguientes agentes (Planner, Developer, QA, Security) pueden consumir `architecture_document.md` y `architecture_summary.md` como inputs para sus respectivas responsabilidades.

### Cambios de v1.0 → v1.1

| Cambio | Detalle |
|--------|---------|
| Nueva sección | `#proceso` — Galería "En Acción" (8 fotos del artista trabajando) |
| Nueva sección | `#precios` — Calculadora interactiva de precios con silueta HTML imagemap |
| Secciones totales | 6 → 8 |
| Navegación | 7 anchor links (Inicio, Sobre Mí, En Acción, Portafolio, Servicios, Cotizá tu Precio, Contacto) |
| Contacto | Instagram eliminado; solo WhatsApp +56971930350 y email adriaticosama@gmail.com |
| Tipografía | 3 familias: Bebas Neue + Montserrat + Dancing Script (para marca) |
| Silueta | PNG (322×726) con HTML imagemap en lugar de SVG |
| JS | Nuevo archivo: `calculator.js` (lógica del cotizador) |
| Imágenes | Nueva: `silueta.png` |
