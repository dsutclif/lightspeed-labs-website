/**
 * SecureInformAct Interactive Component
 * Vanilla JavaScript implementation of the hover-isolate layered graphics
 */

class SecureInformAct {
  constructor(container) {
    this.container = container;
    this.activeLayer = 'secure';
    this.layers = ['secure', 'inform', 'act'];
    this.animationConfig = {
      duration: 250,
      stiffness: 240,
      damping: 22
    };

    // Content data
    this.content = {
      secure: {
        title: "SECURE",
        subtitle: "[ Encrypted Cloud • SOC 2 • Zero Trust • PII Redaction ]",
        pain: "\"We can't adopt AI because security/compliance won't allow it.\"",
        value: "Enterprise-grade AI workspace — your data stays yours. No training leakage. No legal surprises.",
        capability: "Private GCP tenancy with outbound controls, PII stripping, secrets management, audit trails."
      },
      inform: {
        title: "INFORM",
        subtitle: "[ RAG • Knowledge Fabric • Organizational Memory ]",
        pain: "\"Our knowledge is scattered across Drive, Slack, and inboxes — every decision starts from zero.\"",
        value: "A central nervous system for company knowledge — instantly queryable, continuously up to date.",
        capability: "RAG over Google Drive, Slack, Email, Notion, and PDFs with source citations and freshness."
      },
      act: {
        title: "ACT",
        subtitle: "[ Agents • Workflow Automation ]",
        pain: "\"30% of our time is manual ops — memos, recruiting lists, reporting, email triage.\"",
        value: "AI operators that actually do work — from first drafts to structured handoffs.",
        capability: "Agents to summarize investor updates, pull talent lists, draft reports and communications."
      }
    };

    this.layerImages = {
      secure: 'images/Offerings Secure.png',
      inform: 'images/Offerings Inform.png',
      act: 'images/Offerings Act.png'
    };

    this.init();
  }

  init() {
    this.createHTML();
    this.bindEvents();
    this.updateDisplay();
  }

  createHTML() {
    this.container.innerHTML = `
      <section class="secure-inform-act relative" style="width: 100%; min-height: 70vh; overflow: hidden;">
        <!-- Background Image -->
        <div class="absolute inset-0" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0;">
          <img src="images/Offerings Background.png" alt=""
               style="width: 100%; height: 100%; object-fit: cover; position: absolute; z-index: 0;">
        </div>

        <!-- Main Content -->
        <div class="relative" style="position: relative; z-index: 10; max-width: 1280px; margin: 0 auto; padding: 4rem 1.5rem; min-height: 70vh;">
          <div class="content-grid" style="display: grid; grid-template-columns: 1fr; gap: 2rem;">

            <!-- Artwork Section -->
            <div class="artwork-container"
                 style="position: relative; aspect-ratio: 1; margin: 0 auto; width: 100%; max-width: 560px; display: flex; align-items: center; justify-content: center;">
              ${this.layers.map((layer, index) => `
                <button class="layer-button"
                        data-layer="${layer}"
                        aria-label="Activate ${this.content[layer].title} layer"
                        aria-pressed="${this.activeLayer === layer}"
                        aria-controls="text-panel"
                        tabindex="0"
                        style="position: absolute; inset: 0; background: none; border: none; cursor: pointer; transition: all 200ms ease-in-out; z-index: ${10 + index};">
                  <div class="layer-image" data-layer="${layer}"
                       style="width: 100%; height: 100%; transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);">
                    <img src="${this.layerImages[layer]}"
                         alt=""
                         style="width: 100%; height: 100%; object-fit: contain; position: absolute; top: 0; left: 0;">
                  </div>
                </button>
              `).join('')}
            </div>

            <!-- Text Panel -->
            <aside id="text-panel"
                   aria-live="polite"
                   class="text-panel"
                   style="font-family: 'Space Mono', 'Courier New', monospace; display: flex; flex-direction: column; justify-content: center; color: white; letter-spacing: 0.06em;">

              <div class="content-container" style="space-y: 1rem;">
                <!-- Title -->
                <h3 class="title"
                    style="font-size: 2.25rem; font-weight: bold; color: white; letter-spacing: 0.05em; margin-bottom: 1rem;">
                  ${this.content[this.activeLayer].title}
                </h3>

                <!-- Subtitle -->
                <p class="subtitle"
                   style="font-size: 0.875rem; color: #d1d5db; font-weight: normal; margin-bottom: 1rem;">
                  ${this.content[this.activeLayer].subtitle}
                </p>

                <!-- Indicator Line -->
                <div class="indicator-line"
                     style="position: relative; width: 100%; height: 1px; margin: 1rem 0;">
                  <div class="line"
                       style="position: absolute; inset: 0; background: linear-gradient(to right, #60a5fa, transparent); transform-origin: left; animation: drawLine 300ms ease-out;">
                  </div>
                  <div class="dot"
                       style="position: absolute; top: 50%; width: 8px; height: 8px; background: #60a5fa; border-radius: 50%; transform: translateY(-50%); animation: moveDot 400ms ease-out 150ms both;">
                  </div>
                </div>

                <!-- Content Sections -->
                <div class="content-sections" style="margin-top: 1.5rem; space-y: 1rem;">
                  <div class="content-item" style="margin-bottom: 1rem;">
                    <strong style="color: #60a5fa;">Pain point:</strong>
                    <p class="pain-content" style="margin-top: 0.25rem; color: #e5e7eb; line-height: 1.625;">
                      ${this.content[this.activeLayer].pain}
                    </p>
                  </div>

                  <div class="content-item" style="margin-bottom: 1rem;">
                    <strong style="color: #60a5fa;">Value:</strong>
                    <p class="value-content" style="margin-top: 0.25rem; color: #e5e7eb; line-height: 1.625;">
                      ${this.content[this.activeLayer].value}
                    </p>
                  </div>

                  <div class="content-item" style="margin-bottom: 1rem;">
                    <strong style="color: #60a5fa;">Capability:</strong>
                    <p class="capability-content" style="margin-top: 0.25rem; color: #e5e7eb; line-height: 1.625;">
                      ${this.content[this.activeLayer].capability}
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <style>
          @keyframes drawLine {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
          }

          @keyframes moveDot {
            from { transform: translateY(-50%) translateX(0); opacity: 0; }
            to { transform: translateY(-50%) translateX(120px); opacity: 1; }
          }

          .layer-button:focus-visible {
            outline: 2px solid #0a5bd8;
            outline-offset: 2px;
          }

          @media (min-width: 1024px) {
            .content-grid {
              grid-template-columns: 55% 45% !important;
            }
            .title {
              font-size: 3rem !important;
            }
            .subtitle {
              font-size: 1rem !important;
            }
          }
        </style>
      </section>
    `;
  }

  bindEvents() {
    const layerButtons = this.container.querySelectorAll('.layer-button');

    layerButtons.forEach(button => {
      const layer = button.dataset.layer;

      // Mouse events
      button.addEventListener('mouseenter', () => this.setActiveLayer(layer));
      button.addEventListener('focus', () => this.setActiveLayer(layer));

      // Keyboard events
      button.addEventListener('keydown', (e) => this.handleKeyDown(e, layer));
    });
  }

  handleKeyDown(event, layer) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.setActiveLayer(layer);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      const currentIndex = this.layers.indexOf(this.activeLayer);
      let nextIndex;

      if (event.key === 'ArrowLeft') {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : this.layers.length - 1;
      } else {
        nextIndex = currentIndex < this.layers.length - 1 ? currentIndex + 1 : 0;
      }

      this.setActiveLayer(this.layers[nextIndex]);
    }
  }

  setActiveLayer(layer) {
    if (this.activeLayer === layer) return;

    this.activeLayer = layer;
    this.updateDisplay();
  }

  updateDisplay() {
    this.updateLayerStates();
    this.updateTextContent();
  }

  updateLayerStates() {
    const layerImages = this.container.querySelectorAll('.layer-image');
    const layerButtons = this.container.querySelectorAll('.layer-button');

    layerImages.forEach(image => {
      const layer = image.dataset.layer;
      const isActive = layer === this.activeLayer;

      if (isActive) {
        image.style.transform = 'scale(1.02)';
        image.style.filter = 'grayscale(0) brightness(1)';
        image.style.opacity = '1';
      } else {
        image.style.transform = 'scale(1.0)';
        image.style.filter = 'grayscale(1) brightness(1.15)';
        image.style.opacity = '0.5';
      }
    });

    layerButtons.forEach(button => {
      const layer = button.dataset.layer;
      button.setAttribute('aria-pressed', layer === this.activeLayer);
    });
  }

  updateTextContent() {
    const title = this.container.querySelector('.title');
    const subtitle = this.container.querySelector('.subtitle');
    const painContent = this.container.querySelector('.pain-content');
    const valueContent = this.container.querySelector('.value-content');
    const capabilityContent = this.container.querySelector('.capability-content');

    // Fade out
    const elements = [title, subtitle, painContent, valueContent, capabilityContent];
    elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(8px)';
    });

    // Update content and fade in
    setTimeout(() => {
      title.textContent = this.content[this.activeLayer].title;
      subtitle.textContent = this.content[this.activeLayer].subtitle;
      painContent.textContent = this.content[this.activeLayer].pain;
      valueContent.textContent = this.content[this.activeLayer].value;
      capabilityContent.textContent = this.content[this.activeLayer].capability;

      // Staggered fade in
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.style.transition = 'opacity 200ms ease-out, transform 200ms ease-out';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, index * 100);
      });

      // Restart indicator line animation
      const line = this.container.querySelector('.line');
      const dot = this.container.querySelector('.dot');

      line.style.animation = 'none';
      dot.style.animation = 'none';

      setTimeout(() => {
        line.style.animation = 'drawLine 300ms ease-out';
        dot.style.animation = 'moveDot 400ms ease-out 150ms both';
      }, 10);

    }, 125);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('secure-inform-act-container');
  if (container) {
    new SecureInformAct(container);
  }
});

// Export for potential manual initialization
window.SecureInformAct = SecureInformAct;