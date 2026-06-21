# Resumen Arquitectónico — SebaTatto

> **Versión 1.1** | **Fecha:** 2026-06-21 | **Arquitecto:** Sistema de Agentes (actualizado post-diseño)

---

## 1. Estructura General del Sitio

**SebaTatto** es un sitio web **estático de una sola página** (multi-sección con navegación por anclas) para un emprendimiento de tatuajes a domicilio.

### Árbol de Navegación

```
Inicio (#hero)
  ├── Sobre Mí (#about)
  ├── En Acción (#proceso)
  ├── Portafolio (#portfolio) → Lightbox modal
  ├── Servicios (#services)
  ├── Cotizá tu Precio (#precios) → Calculadora interactiva
  ├── Contacto (#contact) → Formulario + WhatsApp/Email
  └── Footer (#footer)
```

### Secciones y Contenido

| Sección | ID | Elementos clave |
|---------|-----|-----------------|
| Hero | `#hero` | Banner (1983×793), Logo (1254×1254), CTA, título Dancing Script |
| Sobre mí | `#about` | 6 fotos del tatuador en collage + biografía + banner destacado al final |
| En Acción | `#proceso` | 8 fotos del tatuador trabajando (proceso) |
| Portafolio | `#portfolio` | 12 imágenes de trabajos en grid + lightbox |
| Servicios | `#services` | 6 tarjetas de servicios ofrecidos |
| Calculadora | `#precios` | Silueta interactiva (imagemap 12 zonas) + slider tamaño + toggle color + precio en vivo |
| Contacto | `#contact` | Formulario + WhatsApp (+56971930350) + email (adriaticosama@gmail.com) |
| Footer | `#footer` | Enlaces WhatsApp/email, copyright |

---

## 2. Stack Tecnológico

| Componente | Tecnología | Versión |
|------------|------------|---------|
| **Lenguaje de marcado** | HTML5 | Estándar W3C |
| **Estilos** | CSS3 (vanilla + variables nativas) | Estándar W3C |
| **Interactividad** | JavaScript (ES6+) | Vanilla, sin frameworks |
| **Formulario** | Formspree o EmailJS | Servicio externo (sin backend) |
| **Tipografía** | Google Fonts (3 familias) | CDN: Bebas Neue + Montserrat + Dancing Script |
| **Iconos** | Emoji / Unicode nativos | Sin dependencia de icon fonts |
| **Hosting** | GitHub Pages / Netlify | Gratuito, SSL automático |

### Política tecnológica

- ✅ **Sí:** HTML5, CSS3 con variables, JS vanilla modular, estándares web
- ❌ **No:** Frameworks JS (React, Vue, Angular), preprocesadores CSS (SASS/LESS), bundlers (Webpack/Vite), backend, bases de datos, CMS

---

## 3. Principios Arquitectónicos

### Patrón: MVC adaptado a estático

| Capa | Rol |
|------|-----|
| **View** | `index.html` + CSS modular (5 archivos) |
| **Controller** | JS vanilla (4 archivos: main, gallery, contact, calculator) |
| **Model** | Datos JS embebidos (JSON con contenido del sitio + datos de pricing) |

### Decisiones Clave

1. **Página única**: Mejor experiencia para el usuario, toda la información fluye en scroll continuo
2. **Sin build tools**: Nada que compilar, abrir `index.html` y funciona
3. **JS modular**: Separación lógica en 4 archivos (navegación, galería, formulario, calculadora)
4. **Mobile-first CSS**: Los estilos base son para móvil; media queries para pantallas más grandes
5. **Lazy loading nativo**: Imágenes del portfolio y tatuador se cargan bajo demanda
6. **Servicio externo para formulario**: Formspree/EmailJS como única dependencia externa de funcionalidad
7. **Silueta PNG + HTML imagemap**: Para selección interactiva de zonas corporales en la calculadora
8. **Dancing Script para marca**: Tipografía manuscrita elegante para el nombre de la marca

---

## 4. Estructura de Directorios

```
SebaTatto/
├── index.html
├── css/
│   ├── reset.css
│   ├── variables.css
│   ├── layout.css
│   ├── components.css
│   └── responsive.css
├── js/
│   ├── main.js
│   ├── gallery.js
│   ├── contact.js
│   └── calculator.js
├── imagenes/
│   ├── Tatuador/          (fotos del artista + banner.png + Logo.png)
│   ├── foto1.jpeg
│   ├── foto2.jpeg
│   ├── ...
│   ├── foto13.png
│   └── silueta.png        (322×726, para el cotizador)
├── assets/
│   ├── icons/
│   └── favicon/
└── outputs/architecture/   (documentos del agente)
```

---

## 5. Puntos Clave de la Arquitectura

### Performance
- Imágenes optimizadas a **WebP** con respaldo original
- **Lazy loading nativo** (`loading="lazy"`) para portfolio
- **Carga prioritaria** (`fetchpriority="high"`) para hero banner
- Compresión de imágenes con Squoosh (calidad 80%)

### SEO
- Meta tags completos + Open Graph
- **JSON-LD** con datos estructurados de tipo `LocalBusiness`
- Jerarquía de encabezados semántica (`<h1>` → `<h2>` → `<h3>`)
- URL canónica y `alt` descriptivo en todas las imágenes
- `sitemap.xml` y `robots.txt` recomendados

### Accesibilidad
- HTML semántico (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- Atributos `aria-*` en elementos interactivos
- Contraste suficiente entre colores de fondo y texto
- Imagemap con `alt` descriptivo en cada área

### Mantenibilidad
- CSS modular con variables de diseño en un solo archivo (`variables.css`)
- JS separado por responsabilidad (4 archivos pequeños)
- Sin dependencias complejas — cualquier persona con conocimientos básicos de web puede modificar el sitio

---

## 6. Servicios Externos

| Servicio | Función | Backup |
|----------|---------|--------|
| Formspree / EmailJS | Procesar formulario de contacto | Mostrar email directo |
| Google Fonts | Tipografía personalizada (3 familias) | Fallback a fuentes del sistema |
| GitHub Pages / Netlify | Hosting estático | Servidor HTTP propio |

---

## 7. Preparado para Desarrollo

✅ **Arquitectura lista para implementar (v1.1)**

Los siguientes pasos para el Developer Agent incluyen:
1. Maquetar `index.html` con las **8 secciones** + navbar + footer
2. Implementar CSS modular (reset → variables → layout → components → responsive)
3. Desarrollar JS para navegación, galería con lightbox, formulario de contacto y **calculadora de precios**
4. Integrar silueta PNG con HTML imagemap para las 12 zonas corporales
5. Optimizar imágenes (WebP, compresión, srcset)
6. Configurar servicio externo (Formspree/EmailJS) para el formulario
7. Configurar SEO (meta tags, Open Graph, JSON-LD)
8. Desplegar en GitHub Pages o Netlify

### Cambios v1.0 → v1.1
- Nuevas secciones: `#proceso` (En Acción) y `#precios` (Calculadora)
- Navegación: 7 anchor links
- Contacto: Instagram eliminado; solo WhatsApp + Email
- Tipografía: Dancing Script añadida para la marca
- Silueta: PNG con HTML imagemap en lugar de SVG
- Nuevo JS: `calculator.js` con lógica de pricing
- 8 secciones totales (antes 6)
