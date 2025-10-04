/**
 * @fileoverview Main JavaScript module for Lightspeed Labs website
 * Handles navigation, mobile menu, and dynamic content loading from JSON
 * @version 1.0.0
 * @author Doug Sutcliffe
 */

import { smoothScroll, throttle, loadContent } from './utils.js';
import { initScrollAnimations } from './scroll-animations.js';
import { initForms } from './forms.js';

// Prevent Ada chatbot errors and infinite loops
window.addEventListener('load', () => {
  // Prevent Ada embed initialization if it's already started
  if (window.adaEmbed && window.adaEmbed.isStarted) {
    console.warn('Ada embed already started, preventing duplicate initialization');
    return;
  }

  // Override Ada embed start method to prevent multiple initializations
  if (window.adaEmbed) {
    const originalStart = window.adaEmbed.start;
    window.adaEmbed.start = function() {
      if (this.isStarted) {
        console.warn('Ada embed start called but already initialized');
        return;
      }
      return originalStart.apply(this, arguments);
    };
  }
});

// Global error handler for unhandled errors
window.addEventListener('error', (event) => {
  // Suppress Ada embed errors to prevent console spam
  if (event.error && event.error.message && event.error.message.includes('Ada Embed')) {
    console.warn('Ada embed error suppressed:', event.error.message);
    event.preventDefault();
    return;
  }
  console.error('Global error caught:', event.error);
  // In production, this could be sent to error tracking service
});

// Global error handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  // Suppress Ada embed promise rejections
  if (event.reason && event.reason.message && event.reason.message.includes('Ada Embed')) {
    console.warn('Ada embed promise rejection suppressed:', event.reason.message);
    event.preventDefault();
    return;
  }
  console.error('Unhandled promise rejection:', event.reason);
  // In production, this could be sent to error tracking service
});

/**
 * Initialize everything when DOM is ready with error handling
 */
document.addEventListener('DOMContentLoaded', () => {
  try {
    initNavigation();
    initMobileMenu();
    loadDynamicContent();
    initScrollAnimations();
    initForms();
  } catch (error) {
    console.error('Error during initialization:', error);
    // Graceful degradation - site still functions without JS enhancements
  }
});

/**
 * Initialize navigation functionality including scroll effects and smooth scrolling
 * @function initNavigation
 */
function initNavigation() {
  const header = document.querySelector('.header');

  // Add scroll effect to header
  const handleScroll = throttle(() => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, 100);

  // Ensure header starts in correct state - force initial check
  const currentScroll = window.scrollY || window.pageYOffset;
  if (currentScroll <= 50) {
    header.classList.remove('scrolled');
  } else {
    header.classList.add('scrolled');
  }

  window.addEventListener('scroll', handleScroll);

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      // Only handle internal anchor links, not external URLs
      if (href && href.startsWith('#') && href !== '#') {
        e.preventDefault();
        smoothScroll(href);
        // Close mobile menu if open
        closeMobileMenu();
      }
    });
  });
}

/**
 * Initialize mobile menu functionality with event listeners
 * @function initMobileMenu
 */
function initMobileMenu() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavClose = document.querySelector('.mobile-nav-close');

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', openMobileMenu);
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', closeMobileMenu);
  }

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}

/**
 * Open the mobile navigation menu and prevent body scrolling
 * @function openMobileMenu
 */
function openMobileMenu() {
  const mobileNav = document.querySelector('.mobile-nav');
  mobileNav.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * Close the mobile navigation menu and restore body scrolling
 * @function closeMobileMenu
 */
function closeMobileMenu() {
  const mobileNav = document.querySelector('.mobile-nav');
  mobileNav.classList.remove('active');
  document.body.style.overflow = '';
}

/**
 * Load and populate dynamic content from JSON configuration
 * @async
 * @function loadDynamicContent
 * @returns {Promise<void>}
 */
async function loadDynamicContent() {
  const content = await loadContent('./content/site-content.json');

  if (!content) {
    console.error('Failed to load content');
    return;
  }

  // Populate hero content
  populateHero(content.hero);

  // Populate problem section
  populateProblem(content.problem);

  // Populate stats
  populateStats(content.problem.stats);

  // Populate partners cards
  populatePartners(content.partners);

  // Populate solutions
  populateSolutions(content.solutions);

  // Populate implementations
  populateImplementations(content.implementations);

  // Populate methodology
  populateMethodology(content.methodology);

  // Populate security tiers
  populateSecurity(content.security);

  // Populate insights
  populateInsights(content.insights);

  // Populate about content
  populateAbout(content.about);
}

/**
 * Populate the hero section with content from JSON
 * @function populateHero
 * @param {Object} hero - Hero section content object
 * @param {string} hero.headline - Main headline text
 * @param {string} hero.description - Description text
 * @param {string} hero.cta_primary - Primary CTA button text
 * @param {string} hero.cta_secondary - Secondary CTA button text
 * @param {string[]} hero.trust_badges - Array of trust badge texts
 */
function populateHero(hero) {
  const heroContent = document.querySelector('.hero-content');
  if (!heroContent || !hero) return;

  heroContent.innerHTML = `
    <h1>${hero.headline}</h1>
    <p>${hero.description}</p>
    <div class="hero-cta">
      <a href="#contact" class="btn btn-primary btn-large">${hero.cta_primary}</a>
      <a href="#solutions" class="btn btn-secondary btn-large">${hero.cta_secondary}</a>
    </div>
    <div class="trust-badges">
      ${hero.trust_badges.map(badge => `<span>${badge}</span>`).join('')}
    </div>
  `;
}

// Populate problem section
function populateProblem(problem) {
  const problemContent = document.querySelector('.problem-content');
  if (!problemContent || !problem) return;

  problemContent.innerHTML = `
    <h2>${problem.headline}</h2>
    ${problem.description ? `<p>${problem.description}</p>` : ''}
  `;
}

// Populate stats section
function populateStats(stats) {
  const statsGrid = document.querySelector('.stats-grid');
  if (!statsGrid || !stats) return;

  statsGrid.innerHTML = stats.map(stat => `
    <div class="stat-item">
      <span class="stat-value">${stat.value}</span>
      <span class="stat-label">${stat.label}</span>
    </div>
  `).join('');
}

// Populate partners section
function populatePartners(partners) {
  const partnersGrid = document.querySelector('.partners-grid');
  if (!partnersGrid || !partners) return;

  partnersGrid.innerHTML = partners.map(partner => `
    <div class="card">
      <img src="./images/icons/${partner.icon}" alt="${partner.headline}" class="card-icon">
      <h3 class="card-title">${partner.headline}</h3>
      <p class="card-description">${partner.description}</p>
      <ul class="card-benefits">
        ${partner.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
      </ul>
      <a href="#contact" class="btn btn-primary card-cta">Get Started</a>
    </div>
  `).join('');
}

// Populate solutions section
function populateSolutions(solutions) {
  const solutionsContainer = document.querySelector('.solutions-container');
  if (!solutionsContainer || !solutions) return;

  solutionsContainer.innerHTML = solutions.map((solution, index) => `
    <div class="solution-item">
      <div class="solution-content">
        <h3>${solution.title}</h3>
        <p>${solution.description}</p>
        <div class="solution-deliverables">
          <h4>Key Deliverables:</h4>
          <ul>
            ${solution.deliverables.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
        <p class="solution-impact"><strong>Impact:</strong> ${solution.impact}</p>
      </div>
      <div class="solution-visual">
        <img src="./images/solutions/${solution.image}" alt="${solution.title}">
      </div>
    </div>
  `).join('');
}

// Populate implementations section
function populateImplementations(implementations) {
  const implementationGrid = document.querySelector('.implementation-grid');
  if (!implementationGrid || !implementations) return;

  implementationGrid.innerHTML = implementations.map(impl => `
    <div class="implementation-card">
      <h3>${impl.title}</h3>
      <h4>Challenge</h4>
      <p>${impl.challenge}</p>
      <h4>Solution</h4>
      <p>${impl.solution}</p>
      <div class="implementation-meta">
        <p><strong>Technologies:</strong> ${impl.technologies}</p>
        <p><strong>Deployment:</strong> ${impl.deployment}</p>
        <p><strong>Timeline:</strong> ${impl.timeline}</p>
      </div>
    </div>
  `).join('');
}

// Populate methodology section
function populateMethodology(methodology) {
  const timeline = document.querySelector('.methodology-timeline');
  const differentiators = document.querySelector('.methodology-differentiators ul');

  if (timeline && methodology.phases) {
    timeline.innerHTML = methodology.phases.map(phase => `
      <div class="timeline-phase">
        <span class="phase-number">${phase.number}</span>
        <h3>${phase.title}</h3>
        <p class="text-muted">${phase.duration}</p>
        <ul>
          ${phase.deliverables.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  }

  if (differentiators && methodology.differentiators) {
    differentiators.innerHTML = methodology.differentiators.map(item => `
      <li>${item}</li>
    `).join('');
  }
}

/**
 * Populate security section with collapsible details
 * @function populateSecurity
 * @param {Array} securityTiers - Array of security tier objects
 */
function populateSecurity(securityTiers) {
  const securityGrid = document.querySelector('.security-grid');
  if (!securityGrid || !securityTiers) return;

  securityGrid.innerHTML = securityTiers.map((tier, index) => `
    <div class="security-tier">
      <img src="./images/icons/${tier.icon}" alt="${tier.tier}" class="security-icon">
      <h3>${tier.tier}</h3>

      <div class="security-best-for">
        <strong>Best For:</strong>
        <span>${tier.bestFor}</span>
      </div>

      <div class="security-details" id="security-details-${index}" style="display: none;">
        <ul class="security-features">
          ${tier.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
      </div>

      <div class="security-cta">
        <button class="read-more-btn" onclick="toggleSecurityDetails(${index})" aria-expanded="false">
          <span class="read-more-text">Read More</span>
          <span class="read-less-text" style="display: none;">Read Less</span>
        </button>
        <a href="#contact" class="btn btn-secondary btn-block">Contact Us</a>
      </div>
    </div>
  `).join('');
}

/**
 * Toggle security tier details visibility
 * @function toggleSecurityDetails
 * @param {number} index - Index of the security tier
 */
function toggleSecurityDetails(index) {
  const details = document.getElementById(`security-details-${index}`);
  const button = details.previousElementSibling;
  const readMoreText = button.querySelector('.read-more-text');
  const readLessText = button.querySelector('.read-less-text');
  const isExpanded = button.getAttribute('aria-expanded') === 'true';

  if (isExpanded) {
    details.style.display = 'none';
    button.setAttribute('aria-expanded', 'false');
    readMoreText.style.display = 'inline';
    readLessText.style.display = 'none';
  } else {
    details.style.display = 'block';
    button.setAttribute('aria-expanded', 'true');
    readMoreText.style.display = 'none';
    readLessText.style.display = 'inline';
  }
}

// Make toggleSecurityDetails available globally
window.toggleSecurityDetails = toggleSecurityDetails;

// Populate insights section
function populateInsights(insights) {
  // Featured article
  const featuredContainer = document.querySelector('.featured-article-content');
  if (featuredContainer && insights.featured) {
    const f = insights.featured;
    document.querySelector('.featured-article-image').src = `./images/publications/${f.image}`;
    document.querySelector('.publication-logo').src = `./images/publications/${f.publicationLogo}`;
    document.querySelector('.publication-logo').alt = f.publicationName;
    featuredContainer.querySelector('h3').textContent = f.headline;
    document.querySelector('.featured-article-excerpt').textContent = f.excerpt;
    const articleButton = featuredContainer.querySelector('.article-cta .btn-primary');
    if (articleButton) {
      articleButton.href = f.url;
      articleButton.setAttribute('target', '_blank');
      console.log('Article button URL set to:', f.url);
    } else {
      console.log('Article button not found in featured container');
      // Fallback: try global selector
      const fallbackButton = document.querySelector('.featured-article .article-cta a[href="#"]');
      if (fallbackButton) {
        fallbackButton.href = f.url;
        fallbackButton.setAttribute('target', '_blank');
        console.log('Article button found with fallback selector');
      }
    }
  }

  // Publications grid
  const publicationsGrid = document.querySelector('.publications-grid');
  if (publicationsGrid && insights.publications) {
    publicationsGrid.innerHTML = insights.publications.map(pub => `
      <div class="publication-card">
        <img src="./images/publications/${pub.logo}" alt="Publication" class="publication-logo">
        <h4><a href="${pub.url}" class="publication-title-link" target="_blank">${pub.title}</a></h4>
      </div>
    `).join('');
  }
}

// Populate about section
function populateAbout(about) {
  const aboutContent = document.querySelector('.about-content');
  if (!aboutContent || !about) return;

  const experienceList = about.experience.map(item => `<li>${item}</li>`).join('');

  // Update existing content
  const sections = aboutContent.querySelectorAll('p');
  if (sections[0]) sections[0].textContent = about.company;
  if (sections[1]) sections[1].textContent = about.approach;

  // Add experience list
  const experienceSection = aboutContent.querySelector('ul');
  if (experienceSection) {
    experienceSection.innerHTML = experienceList;
  }
}