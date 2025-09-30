/**
 * Main JavaScript
 * Initialization and navigation
 */

import { smoothScroll, throttle, loadContent } from './utils.js';
import { initScrollAnimations } from './scroll-animations.js';
import { initForms } from './forms.js';

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initMobileMenu();
  loadDynamicContent();
  initScrollAnimations();
  initForms();
});

// Navigation functionality
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

  window.addEventListener('scroll', handleScroll);

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      if (targetId !== '#') {
        smoothScroll(targetId);
        // Close mobile menu if open
        closeMobileMenu();
      }
    });
  });
}

// Mobile menu functionality
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

function openMobileMenu() {
  const mobileNav = document.querySelector('.mobile-nav');
  mobileNav.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  const mobileNav = document.querySelector('.mobile-nav');
  mobileNav.classList.remove('active');
  document.body.style.overflow = '';
}

// Load dynamic content from JSON
async function loadDynamicContent() {
  const content = await loadContent('./content/site-content.json');

  if (!content) {
    console.error('Failed to load content');
    return;
  }

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

// Populate security section
function populateSecurity(securityTiers) {
  const securityGrid = document.querySelector('.security-grid');
  if (!securityGrid || !securityTiers) return;

  securityGrid.innerHTML = securityTiers.map(tier => `
    <div class="security-tier ${tier.recommended ? 'recommended' : ''}">
      <img src="./images/icons/${tier.icon}" alt="${tier.tier}" class="security-icon">
      <h3>${tier.tier}</h3>
      <p class="text-muted mb-4">${tier.level}</p>
      <ul class="security-features">
        ${tier.features.map(feature => `<li>${feature}</li>`).join('')}
      </ul>
      <div class="security-best-for">
        <strong>Best For:</strong>
        <span>${tier.bestFor}</span>
      </div>
      <p class="security-pricing">${tier.pricing}</p>
      <a href="#contact" class="btn btn-secondary btn-block">Contact Us</a>
    </div>
  `).join('');
}

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