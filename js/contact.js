(function() {
  'use strict';

  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('formName');
  const emailInput = document.getElementById('formEmail');
  const phoneInput = document.getElementById('formPhone');
  const messageInput = document.getElementById('formMessage');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const submitBtn = document.getElementById('formSubmit');
  const formFeedback = document.getElementById('formFeedback');

  const FORMSPREE_PLACEHOLDER = 'REEMPLAZA_CON_TU_ID';

  function isFormspreeConfigured() {
    const formspreeId = form.dataset.formspreeId;
    return formspreeId && formspreeId !== FORMSPREE_PLACEHOLDER;
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateField(input, errorEl, validationFn) {
    const value = input.value.trim();
    if (input.required && !value) {
      input.classList.add('error');
      input.classList.remove('success');
      errorEl.textContent = 'Este campo es obligatorio';
      return false;
    }
    if (validationFn && !validationFn(value)) {
      input.classList.add('error');
      input.classList.remove('success');
      errorEl.textContent = input.dataset.errorMsg || 'Valor inválido';
      return false;
    }
    input.classList.remove('error');
    input.classList.add('success');
    errorEl.textContent = '';
    return true;
  }

  function validateForm() {
    let valid = true;
    valid = validateField(nameInput, nameError, (v) => v.length >= 2) && valid;
    valid = validateField(emailInput, emailError, (v) => validateEmail(v)) && valid;
    valid = validateField(messageInput, messageError, (v) => v.length >= 10) && valid;
    return valid;
  }

  function buildMailTo() {
    const name = encodeURIComponent(nameInput.value.trim());
    const email = encodeURIComponent(emailInput.value.trim());
    const phone = encodeURIComponent(phoneInput.value.trim());
    const message = encodeURIComponent(messageInput.value.trim());
    const subject = encodeURIComponent('Consulta desde SebaTatto');
    const body = encodeURIComponent(
      `Nombre: ${name}\n` +
      `Email: ${email}\n` +
      `Teléfono: ${phone}\n\n` +
      `Mensaje:\n${message}`
    );
    return `mailto:Sebastian.cornejo.maya@gmail.com?subject=${subject}&body=${body}`;
  }

  async function sendToFormspree() {
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) throw new Error('Error en el envío');
  }

  function showFeedback(message, type) {
    formFeedback.textContent = message;
    formFeedback.style.display = 'block';
    formFeedback.style.color = type === 'success'
      ? 'var(--color-success)'
      : 'var(--color-error)';
  }

  function resetForm() {
    form.reset();
    form.querySelectorAll('.success').forEach(el => el.classList.remove('success'));
  }

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Reset feedback
    formFeedback.style.display = 'none';

    if (!validateForm()) {
      showFeedback('Corregí los errores antes de enviar', 'error');
      return;
    }

    // If Formspree not configured, use mailto fallback
    if (!isFormspreeConfigured()) {
      showFeedback(
        'Redirigiendo a tu correo para completar el envío...',
        'success'
      );
      setTimeout(() => {
        window.location.href = buildMailTo();
      }, 800);
      return;
    }

    // Submit to Formspree
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Enviando...';

    try {
      await sendToFormspree();
      showFeedback('✅ Mensaje enviado con éxito. Te responderé pronto.', 'success');
      resetForm();
    } catch (err) {
      showFeedback(
        '❌ Hubo un error al enviar. Escribime directamente a Sebastian.cornejo.maya@gmail.com',
        'error'
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar Mensaje';
    }
  });

  // Real-time validation on blur
  nameInput.addEventListener('blur', () => validateField(nameInput, nameError, (v) => v.length >= 2));
  emailInput.addEventListener('blur', () => validateField(emailInput, emailError, (v) => validateEmail(v)));
  messageInput.addEventListener('blur', () => validateField(messageInput, messageError, (v) => v.length >= 10));

  // Clear error on focus
  [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
    input.addEventListener('focus', function() {
      this.classList.remove('error');
    });
  });
})();
