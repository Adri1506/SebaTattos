# Auditoría de Seguridad — SebaTatto

**Fecha:** 2026-06-21  
**Auditor:** Security Agent  
**Stage:** 7 — Auditoría de Seguridad  
**Sitio:** https://sebatatto.cl

---

## 1. Análisis de Dependencias Externas

### Google Fonts (CDN)
| Aspecto | Estado |
|---------|--------|
| Uso de `preconnect` | ✅ Correcto |
| Carga vía HTTPS | ✅ Sí |
| Riesgo de privacidad | ⚠️ **Bajo** — La IP del visitante se comparte con Google al cargar fuentes desde `fonts.googleapis.com` y `fonts.gstatic.com`. En la UE esto tiene implicancias legales (GDPR). Para Chile no es un problema regulatorio directo, pero es una fuga de datos menor. |
| Recomendación | Self-hostear las fuentes o usar un proxy local para eliminar la dependencia externa. |

### Formspree
| Aspecto | Estado |
|---------|--------|
| Endpoint HTTPS | ✅ Sí |
| Form ID configurado | ❌ **CRÍTICO** — El action contiene `YOUR_FORM_ID` como placeholder. No hay un ID real de Formspree configurado. El formulario no puede enviar datos. |
| Transmisión cifrada | ✅ El endpoint de Formspree usa HTTPS |
| Almacenamiento de datos | Depende de la cuenta Formspree del cliente (no verificable) |

### Otras dependencias
| Dependencia | Estado |
|-------------|--------|
| Ninguna otra | ✅ Sin dependencias adicionales |

---

## 2. Formulario de Contacto

| Aspecto | Estado |
|---------|--------|
| Envío de datos sensibles | ✅ No — Solo datos personales básicos (nombre, email, teléfono, mensaje) |
| Validación cliente-side | ✅ Sí — En `js/contact.js`: validación de campos requeridos, formato email, longitud mínima |
| Validación server-side | ❌ No aplica (Formspree no configurado) |
| Protección anti-spam | ❌ **MEDIO** — No hay CAPTCHA, honeypot, rate limiting ni ninguna protección contra bots |
| HTTPS en endpoint | ✅ `https://formspree.io/...` |

### Riesgos identificados
1. **CRÍTICO**: `action="https://formspree.io/f/YOUR_FORM_ID"` — El placeholder impide el envío real. Posible fuga de datos si un atacante reemplaza el ID por su cuenta de Formspree (man-in-the-middle o modificación del código fuente).
2. **MEDIO**: Sin protección anti-spam, el formulario (una vez configurado) es vulnerable a envíos automatizados.

---

## 3. Enlaces Externos

| Enlace | HTTPS | `rel="noopener noreferrer"` | Estado |
|--------|-------|---------------------------|--------|
| WhatsApp — Contacto (`wa.me/56971930350`) | ✅ | ✅ | ✅ Seguro |
| WhatsApp — Footer (`wa.me/56971930350`) | ✅ | ✅ | ✅ Seguro |
| Email (`mailto:adriaticosama@gmail.com`) | N/A | N/A | ✅ Seguro por naturaleza |

**Conclusión:** Todos los enlaces externos son seguros. No hay enlaces HTTP.

---

## 4. Privacidad

| Aspecto | Estado |
|---------|--------|
| Cookies | ✅ No se utilizan cookies |
| LocalStorage / SessionStorage | ✅ No se utiliza almacenamiento local |
| Tracking / Analytics | ✅ No hay scripts de tracking, píxeles ni analytics |
| Exposición de datos de contacto | ℹ️ Email y teléfono visibles en HTML — esperado para un sitio de contacto |

**Conclusión:** El sitio respeta la privacidad del usuario. No hay mecanismos de seguimiento.

---

## 5. Headers de Seguridad

| Header | Estado | Nota |
|--------|--------|------|
| Content-Security-Policy | ❌ No configurado | Sitio estático — depende del hosting |
| X-Frame-Options | ❌ No configurado | Podría prevenir clickjacking |
| X-Content-Type-Options | ❌ No configurado | Depende del hosting |
| Strict-Transport-Security | ❌ No configurado | Depende del hosting/CDN |
| Referrer-Policy | ❌ No configurado | Se puede agregar vía `<meta>` tag |

**Recomendación:** Agregar tag `<meta http-equiv="Content-Security-Policy">` y `<meta name="referrer" content="no-referrer-when-downgrade">` en el HTML, ya que es un sitio estático sin acceso a headers server-side.

### Contenido Mixto
| Aspecto | Estado |
|---------|--------|
| Recursos HTTP | ✅ No se detectaron recursos cargados vía HTTP |
| Recursos HTTPS | ✅ Google Fonts, Formspree, imágenes (relativas) |
| Conclusión | ✅ Sin contenido mixto |

---

## 6. Buenas Prácticas

### Datos hardcodeados sensibles
| Elemento | Estado |
|----------|--------|
| API keys / tokens | ✅ No hay |
| Contraseñas | ✅ No hay |
| Números de teléfono | ℹ️ Expuesto intencionalmente (contacto público) |
| Emails | ℹ️ Expuesto intencionalmente (contacto público) |
| Form ID placeholder | ⚠️ `YOUR_FORM_ID` no es un secreto real, pero indica configuración incompleta |

### Seguridad de scripts
| Aspecto | Estado |
|---------|--------|
| Uso de `eval()` | ✅ No se usa |
| `innerHTML` con datos de usuario | ✅ No se usa — gallery.js usa `innerHTML` con datos hardcodeados (seguro) |
| `textContent` para output | ✅ Se usa correctamente |
| `strict mode` | ✅ En contact.js, gallery.js y calculator.js |
| Manipulación DOM insegura | ✅ Sin riesgos |

### Enlaces externos con `rel="noopener noreferrer"`
| Enlace | Estado |
|--------|--------|
| WhatsApp (Contacto) | ✅ `target="_blank" rel="noopener noreferrer"` |
| WhatsApp (Footer) | ✅ `target="_blank" rel="noopener noreferrer"` |

---

## 7. Resumen de Hallazgos

| ID | Severidad | Descripción | Recomendación |
|----|-----------|-------------|---------------|
| S-01 | 🔴 **CRÍTICO** | Form action contiene placeholder `YOUR_FORM_ID` — Formulario no funcional y susceptible a suplantación si un atacante modifica el ID | Configurar un ID real de Formspree o reemplazar el servicio |
| S-02 | 🟡 **MEDIO** | Sin protección anti-spam en formulario de contacto | Agregar honeypot campo oculto, CAPTCHA o rate limiting |
| S-03 | 🟢 **BAJO** | Google Fonts vía CDN externo — fuga de IP a Google | Self-hostear las fuentes o usar proxy local |
| S-04 | 🔵 **INFORMATIVO** | Sin headers de seguridad (CSP, HSTS, etc.) | Agregar meta tags CSP y Referrer-Policy en el HTML |
| S-05 | 🔵 **INFORMATIVO** | Datos de contacto en texto plano en HTML | Aceptable para sitio de contacto; considerar ofuscación anti-scraping |

---

## 8. Conclusión

El sitio SebaTatto presenta **una buena base de seguridad**:
- ✅ Sin vectores XSS, inyección, o manipulación DOM
- ✅ Sin tracking, cookies o almacenamiento local
- ✅ Todos los enlaces externos usan HTTPS con `rel="noopener noreferrer"`
- ✅ Sin contenido mixto
- ✅ Sin API keys, tokens o secretos expuestos
- ✅ Código JavaScript en strict mode, sin `eval()`

El hallazgo **crítico S-01** (form action placeholder) es un error de configuración que inutiliza el formulario, pero no expone datos de usuarios ni permite ataques directos. Es prioritario corregirlo para que el formulario sea funcional.
