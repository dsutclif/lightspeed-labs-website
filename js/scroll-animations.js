/**
 * Scroll Animations
 * Uses Intersection Observer for fade-in effects
 */

export function initScrollAnimations() {
  // Elements to animate on scroll
  const animateElements = document.querySelectorAll('.card, .solution-item, .timeline-phase, .security-tier, .publication-card');

  // Intersection Observer options
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  // Intersection Observer callback
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  };

  // Create observer
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe all elements
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Add fade-in class styles
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);