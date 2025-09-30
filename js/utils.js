/**
 * Utility Functions
 * Reusable helper functions used across the site
 */

// Smooth scroll to section
export function smoothScroll(targetId) {
  // Only handle anchor links (starting with #)
  if (!targetId || !targetId.startsWith('#')) {
    return;
  }

  try {
    const target = document.querySelector(targetId);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  } catch (error) {
    console.log('Smooth scroll ignored invalid selector:', targetId);
  }
}

// Debounce function for performance
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
export function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Format number with commas
export function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Validate email format
export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Get query parameter from URL
export function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Load JSON content
export async function loadContent(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading content:', error);
    return null;
  }
}

// Show/hide element with animation
export function toggleElement(element, show) {
  if (show) {
    element.style.display = 'block';
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 10);
  } else {
    element.style.opacity = '0';
    element.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      element.style.display = 'none';
    }, 300);
  }
}