/**
 * Form Handling & Validation
 * Contact form, newsletter signup
 */

export function initForms() {
  // Initialize contact form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }

  // Initialize newsletter form
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
  }

  // Add real-time validation
  const inputs = document.querySelectorAll('.form-input, .form-textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input);
      }
    });
  });
}

// Validate individual field
function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.name;
  let error = '';

  // Required field check
  if (field.hasAttribute('required') && !value) {
    error = 'This field is required';
  }

  // Email validation
  else if (field.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      error = 'Please enter a valid email address';
    }
  }

  // Name validation (letters, spaces, hyphens only)
  else if (fieldName === 'name' && value) {
    const nameRegex = /^[a-zA-Z\s-]+$/;
    if (!nameRegex.test(value)) {
      error = 'Name can only contain letters, spaces, and hyphens';
    }
    if (value.length < 2) {
      error = 'Name must be at least 2 characters';
    }
  }

  // Show/hide error
  showFieldError(field, error);
  return error === '';
}

// Show field error
function showFieldError(field, errorMsg) {
  const formGroup = field.closest('.form-group');
  let errorElement = formGroup.querySelector('.form-error');

  if (errorMsg) {
    field.classList.add('error');
    if (!errorElement) {
      errorElement = document.createElement('span');
      errorElement.className = 'form-error';
      formGroup.appendChild(errorElement);
    }
    errorElement.textContent = errorMsg;
  } else {
    field.classList.remove('error');
    if (errorElement) {
      errorElement.remove();
    }
  }
}

// Handle contact form submission
async function handleContactSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const btnText = submitBtn.innerHTML;

  // Validate all fields
  const fields = form.querySelectorAll('.form-input, .form-textarea, .form-select');
  let isValid = true;

  fields.forEach(field => {
    if (!validateField(field)) {
      isValid = false;
    }
  });

  if (!isValid) {
    return;
  }

  // Get form data
  const formData = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    company: form.company.value.trim(),
    companyType: form.companyType.value,
    interest: form.interest.value,
    message: form.message.value.trim(),
    source: 'Contact Form'
  };

  // Show loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="loading"></span> Sending...';

  try {
    // Submit to Netlify Forms
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    });

    if (response.ok) {
      // Show success message
      showFormSuccess(form, 'Thank you! We\'ll be in touch soon.');
      // Reset form
      form.reset();
    } else {
      throw new Error('Form submission failed');
    }

  } catch (error) {
    console.error('Form submission error:', error);
    showFormError(form, 'Something went wrong. Please try again or email us directly at info@lightspeed-labs.com');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = btnText;
  }
}

// Handle newsletter submission
async function handleNewsletterSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const emailInput = form.querySelector('input[type="email"]');
  const submitBtn = form.querySelector('button[type="submit"]');
  const btnText = submitBtn.innerHTML;

  // Validate email
  if (!validateField(emailInput)) {
    return;
  }

  const formData = {
    email: emailInput.value.trim(),
    source: 'Newsletter Signup'
  };

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="loading"></span> Subscribing...';

  try {
    // Submit to Netlify Forms
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    });

    if (response.ok) {
      showFormSuccess(form, 'Successfully subscribed! We\'ll send you monthly automation insights.');
      form.reset();
    } else {
      throw new Error('Newsletter submission failed');
    }

  } catch (error) {
    console.error('Newsletter submission error:', error);
    showFormError(form, 'Something went wrong. Please try again or email us at info@lightspeed-labs.com');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = btnText;
  }
}

// Note: Forms now submit to Netlify Forms which handles email delivery and can sync to Airtable via Zapier

// Show form success message
function showFormSuccess(form, message) {
  let successEl = form.querySelector('.form-success');
  if (!successEl) {
    successEl = document.createElement('div');
    successEl.className = 'form-success';
    form.insertBefore(successEl, form.firstChild);
  }
  successEl.textContent = message;

  setTimeout(() => {
    successEl.remove();
  }, 5000);
}

// Show form error message
function showFormError(form, message) {
  let errorEl = form.querySelector('.form-error');
  if (!errorEl) {
    errorEl = document.createElement('div');
    errorEl.className = 'form-error';
    errorEl.style.cssText = 'padding: 1rem; background-color: rgba(239, 68, 68, 0.1); border: 2px solid var(--color-error); border-radius: var(--border-radius-md); color: var(--color-error); margin-bottom: 1rem;';
    form.insertBefore(errorEl, form.firstChild);
  }
  errorEl.textContent = message;

  setTimeout(() => {
    errorEl.remove();
  }, 5000);
}