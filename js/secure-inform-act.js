/**
 * SecureInformAct Interactive Component
 * Vanilla JavaScript implementation of the hover-isolate layered graphics
 */

class SecureInformAct {
  constructor(container) {
    this.container = container;
    this.hoveredLayer = null;
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
        capability: "Encrypted Cloud Environment (GCP / SOC 2 / Zero Trust / PII Redaction)",
        pain: "\"We can't use AI because legal/security won't allow it.\" \"We're slowing ourselves down because we don't have a safe sandbox.\"",
        valueProposition: "Enterprise-grade AI workspace where your data stays yours. Zero exposure. Zero hallucinations. Zero legal surprises."
      },
      inform: {
        title: "INFORM",
        capability: "RAG / Knowledge Fabric",
        pain: "\"Our knowledge is scattered across 10 tools — nobody knows what the company actually knows.\" \"Every decision starts from zero.\"",
        valueProposition: "Central nervous system for your company's knowledge — Google Drive, email, Slack, Notion, PDFs — indexed and queryable instantly."
      },
      act: {
        title: "ACT",
        capability: "Agents / Workflow Automation",
        pain: "\"We burn 30% of our time on manual ops: memos, recruiting, reporting, email triage.\" \"We don't need more dashboards — we need actions.\"",
        valueProposition: "AI operators that actually do work: summarize investor updates, pull talent lists, write first drafts, move data between systems."
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
      <section class="secure-inform-act" style="position: relative; width: 100%; min-height: 80vh; overflow: hidden; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);">
        <!-- Background Image -->
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 1;">
          <img src="images/Offerings Background.png" alt=""
               style="width: 100%; height: 100%; object-fit: cover; opacity: 0.7;">
        </div>

        <!-- Main Content Container -->
        <div style="position: relative; z-index: 2; max-width: 1400px; margin: 0 auto; padding: 4rem 2rem; min-height: 80vh; display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center;">

          <!-- Left Side: Layered Images (Properly Sized) -->
          <div class="artwork-container" style="position: relative; width: 100%; max-width: 500px; aspect-ratio: 1; margin: 0 auto;">
            ${this.layers.map((layer, index) => {
              // Different sizes for each layer to match the reference image
              const sizes = {
                'secure': { width: '100%', height: '100%' },  // Outermost ring - largest
                'inform': { width: '80%', height: '80%' },    // Middle ring
                'act': { width: '60%', height: '60%' }        // Inner ring - smallest
              };
              const size = sizes[layer];

              return `
              <div class="layer-wrapper" data-layer="${layer}"
                   style="position: absolute; top: 50%; left: 50%; width: ${size.width}; height: ${size.height};
                          transform: translate(-50%, -50%); cursor: pointer; z-index: ${10 + index};">
                <img src="${this.layerImages[layer]}" alt="${this.content[layer].title} layer"
                     class="layer-image" data-layer="${layer}"
                     style="width: 100%; height: 100%; object-fit: contain; transition: all 300ms ease;">
              </div>
            `;
            }).join('')}
          </div>

          <!-- Right Side: Text Content -->
          <div class="text-content" style="color: white; font-family: 'Space Mono', 'Courier New', monospace; position: relative;">

            <!-- Default State: All Value Propositions -->
            <div class="default-state" style="display: block;">
              ${this.layers.map((layer, index) => `
                <div class="default-text-block" data-layer="${layer}"
                     style="margin-bottom: 3rem; opacity: 1; transition: opacity 300ms ease;">
                  <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                    <div style="width: 60px; height: 2px; background: #60a5fa; margin-right: 1rem;"></div>
                    <h3 style="font-size: 2rem; font-weight: bold; letter-spacing: 0.1em; margin: 0;">
                      ${this.content[layer].title}
                    </h3>
                  </div>
                  <p style="font-size: 1rem; line-height: 1.6; color: #e5e7eb; margin: 0; padding-left: 75px;">
                    ${this.content[layer].valueProposition}
                  </p>
                </div>
              `).join('')}
            </div>

            <!-- Hover State: Single Layer Details -->
            <div class="hover-state" style="display: none; position: absolute; top: 0; left: 0; width: 100%; min-height: 100%;">
              ${this.layers.map((layer, index) => `
                <div class="hover-text-block" data-layer="${layer}" style="display: none;">
                  <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
                    <div style="width: 60px; height: 2px; background: #60a5fa; margin-right: 1rem;"></div>
                    <h3 style="font-size: 2rem; font-weight: bold; letter-spacing: 0.1em; margin: 0;">
                      ${this.content[layer].title}
                    </h3>
                  </div>

                  <div style="padding-left: 75px; space-y: 1.5rem;">
                    <div style="margin-bottom: 1.5rem;">
                      <strong style="color: #60a5fa; font-size: 0.9rem;">CAPABILITY:</strong>
                      <p style="font-size: 1rem; line-height: 1.6; color: #e5e7eb; margin: 0.5rem 0 0 0;">
                        ${this.content[layer].capability}
                      </p>
                    </div>

                    <div style="margin-bottom: 1.5rem;">
                      <strong style="color: #60a5fa; font-size: 0.9rem;">FOUNDER/VC PAIN SOLVED:</strong>
                      <p style="font-size: 1rem; line-height: 1.6; color: #e5e7eb; margin: 0.5rem 0 0 0;">
                        ${this.content[layer].pain}
                      </p>
                    </div>

                    <div style="margin-bottom: 1.5rem;">
                      <strong style="color: #60a5fa; font-size: 0.9rem;">VALUE PROPOSITION:</strong>
                      <p style="font-size: 1rem; line-height: 1.6; color: #e5e7eb; margin: 0.5rem 0 0 0;">
                        ${this.content[layer].valueProposition}
                      </p>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <style>
          .secure-inform-act .layer-wrapper {
            cursor: pointer;
          }

          .secure-inform-act .layer-wrapper:focus {
            outline: 2px solid #60a5fa;
            outline-offset: 4px;
            border-radius: 8px;
          }

          .secure-inform-act .text-block {
            cursor: pointer;
          }

          @media (max-width: 1024px) {
            .secure-inform-act > div {
              grid-template-columns: 1fr !important;
              gap: 2rem !important;
              text-align: center;
            }

            .artwork-container {
              max-width: 400px !important;
            }

            .text-block h3 {
              font-size: 1.5rem !important;
            }

            .text-block p {
              font-size: 0.9rem !important;
              padding-left: 0 !important;
            }

            .text-block div {
              justify-content: center !important;
            }
          }
        </style>
      </section>
    `;
  }

  bindEvents() {
    const layerWrappers = this.container.querySelectorAll('.layer-wrapper');
    const defaultTextBlocks = this.container.querySelectorAll('.default-text-block');
    const container = this.container.querySelector('.secure-inform-act');

    layerWrappers.forEach(wrapper => {
      const layer = wrapper.dataset.layer;

      wrapper.addEventListener('mouseenter', () => {
        this.setHoverState(layer);
      });

      wrapper.addEventListener('mouseleave', () => {
        this.clearHoverState();
      });

      // Keyboard accessibility
      wrapper.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.setHoverState(layer);
        }
      });

      wrapper.setAttribute('tabindex', '0');
      wrapper.setAttribute('role', 'button');
      wrapper.setAttribute('aria-label', `View ${this.content[layer].title} details`);
    });

    // Also bind to default text blocks for cross-interaction
    defaultTextBlocks.forEach(block => {
      const layer = block.dataset.layer;

      block.addEventListener('mouseenter', () => {
        this.setHoverState(layer);
      });

      block.addEventListener('mouseleave', () => {
        this.clearHoverState();
      });
    });

    // Container mouse leave to reset state
    container.addEventListener('mouseleave', () => {
      this.clearHoverState();
    });
  }

  setHoverState(layer) {
    this.hoveredLayer = layer;
    this.updateDisplay();
  }

  clearHoverState() {
    this.hoveredLayer = null;
    this.updateDisplay();
  }

  updateDisplay() {
    const layerWrappers = this.container.querySelectorAll('.layer-wrapper');
    const defaultState = this.container.querySelector('.default-state');
    const hoverState = this.container.querySelector('.hover-state');
    const defaultTextBlocks = this.container.querySelectorAll('.default-text-block');
    const hoverTextBlocks = this.container.querySelectorAll('.hover-text-block');

    if (this.hoveredLayer) {
      // Hover state: fade non-hovered images, show single layer details
      layerWrappers.forEach(wrapper => {
        const layer = wrapper.dataset.layer;
        const image = wrapper.querySelector('.layer-image');

        if (layer === this.hoveredLayer) {
          image.style.opacity = '1';
          image.style.filter = 'none';
          image.style.transform = 'scale(1.05)';
        } else {
          image.style.opacity = '0.3';
          image.style.filter = 'grayscale(1)';
          image.style.transform = 'scale(1)';
        }
      });

      // Hide default state, show hover state
      defaultState.style.display = 'none';
      hoverState.style.display = 'block';

      // Show only the hovered layer's details
      hoverTextBlocks.forEach(block => {
        const layer = block.dataset.layer;
        if (layer === this.hoveredLayer) {
          block.style.display = 'block';
        } else {
          block.style.display = 'none';
        }
      });

    } else {
      // Default state: all rings visible, show all value propositions
      layerWrappers.forEach(wrapper => {
        const image = wrapper.querySelector('.layer-image');
        image.style.opacity = '1';
        image.style.filter = 'none';
        image.style.transform = 'scale(1)';
      });

      // Show default state, hide hover state
      defaultState.style.display = 'block';
      hoverState.style.display = 'none';

      // Ensure all default text blocks are visible
      defaultTextBlocks.forEach(block => {
        block.style.opacity = '1';
      });
    }
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