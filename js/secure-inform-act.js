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

    // Default content (fallback if JSON fails to load)
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

    this.loadContentAndInit();
  }

  async loadContentAndInit() {
    try {
      const response = await fetch('./content/site-content.json');
      const siteContent = await response.json();

      if (siteContent.secureInformAct) {
        this.content = {
          sectionTitle: siteContent.secureInformAct.sectionTitle || '3 Components of Enterprise AI',
          sectionSubtitle: siteContent.secureInformAct.sectionSubtitle || 'Every company wants to "use AI," but very few are set up to do it responsibly and effectively.',
          ...siteContent.secureInformAct
        };
        console.log('SecureInformAct content loaded from JSON');
      }
    } catch (error) {
      console.warn('Could not load content from JSON, using defaults:', error);
    }

    this.init();
  }

  init() {
    this.createHTML();
    this.setupCanvases();
    this.bindEvents();
    this.updateDisplay();
  }

  setupCanvases() {
    let loadedImages = 0;
    const totalImages = this.layers.length;

    this.layers.forEach((layer, index) => {
      const img = this.container.querySelector(`.layer-image[data-layer="${layer}"]`);
      const canvas = this.container.querySelector(`.layer-canvas[data-layer="${layer}"]`);
      const ctx = canvas.getContext('2d');

      const drawImage = () => {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw image to canvas for pixel detection
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        loadedImages++;
        console.log(`Canvas setup complete for ${layer} (${loadedImages}/${totalImages})`);

        // Test a few pixels to verify canvas has content
        const testPixels = [
          [canvas.width/2, canvas.height/2],
          [canvas.width/4, canvas.height/4],
          [canvas.width*3/4, canvas.height*3/4]
        ];

        testPixels.forEach(([x, y]) => {
          const alpha = this.getPixelAlpha(canvas, x, y);
          console.log(`${layer} test pixel at (${x}, ${y}): alpha=${alpha}`);
        });
      };

      // Force image reload if needed
      if (!img.complete || img.naturalHeight === 0) {
        img.onload = drawImage;
        // Force reload
        const src = img.src;
        img.src = '';
        img.src = src;
      } else {
        drawImage();
      }
    });
  }

  getPixelAlpha(canvas, x, y) {
    try {
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();

      // Scale coordinates to canvas size
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const canvasX = Math.floor(x * scaleX);
      const canvasY = Math.floor(y * scaleY);

      // Bounds checking
      if (canvasX < 0 || canvasY < 0 || canvasX >= canvas.width || canvasY >= canvas.height) {
        return 0;
      }

      // Get pixel data
      const imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
      return imageData.data[3]; // Alpha channel
    } catch (e) {
      return 0;
    }
  }

  isPixelTransparent(canvas, x, y) {
    const alpha = this.getPixelAlpha(canvas, x, y);
    return alpha < 50; // Consider pixels with alpha < 50 as transparent
  }

  createHTML() {
    this.container.innerHTML = `
      <section class="secure-inform-act" style="position: relative; width: 100%; min-height: 80vh; overflow: hidden; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);">
        <!-- Background Image -->
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 1;">
          <img src="images/Offerings Background.png" alt=""
               style="width: 100%; height: 100%; object-fit: cover; opacity: 0.7;">
        </div>

        <!-- Section Header -->
        <div style="position: relative; z-index: 2; max-width: var(--container-max-width); margin: 0 auto; padding: 4rem 2rem 2rem; text-align: center;">
          <h2 style="font-size: var(--font-size-4xl); font-weight: bold; color: white; margin-bottom: 1rem; letter-spacing: 0.05em;">
            ${this.content.sectionTitle || '3 Components of Enterprise AI'}
          </h2>
          <p style="font-size: 1.25rem; color: #e5e7eb; max-width: 800px; margin: 0 auto; line-height: 1.6;">
            ${this.content.sectionSubtitle || 'Every company wants to "use AI," but very few are set up to do it responsibly and effectively. Real AI adoption isn\'t just picking tools — it requires building the right layers in the right order.'}
          </p>
        </div>

        <!-- Main Content Container -->
        <div style="position: relative; z-index: 2; max-width: var(--container-max-width); margin: 0 auto; padding: 2rem 2rem 4rem; min-height: 60vh; display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: start;">

          <!-- Left Side: Layered Images (Same Size, Pixel-Perfect Hover) -->
          <div class="artwork-container" style="position: relative; width: 100%; max-width: 550px; aspect-ratio: 1; margin: 0 auto; overflow: hidden;">
            ${this.layers.map((layer, index) => {
              return `
              <div class="layer-wrapper" data-layer="${layer}"
                   style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: ${10 + (this.layers.length - 1 - index)};">
                <canvas class="layer-canvas" data-layer="${layer}"
                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; cursor: pointer; transition: all 300ms ease; pointer-events: auto; opacity: 0;"
                        width="500" height="500">
                </canvas>
                <img src="${this.layerImages[layer]}" alt="${this.content[layer].title} layer"
                     class="layer-image" data-layer="${layer}"
                     style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; transition: all 300ms ease; pointer-events: none; transform-origin: center; transform: scale(1);">
              </div>
            `;
            }).join('')}
          </div>

          <!-- Right Side: Text Content -->
          <div class="text-content" style="color: white; font-family: 'Space Mono', 'Courier New', monospace; position: relative; height: 500px; overflow: hidden;">

            <!-- Default State: All Value Propositions -->
            <div class="default-state" style="display: block; height: 100%;">
              ${this.layers.map((layer, index) => `
                <div class="default-text-block" data-layer="${layer}"
                     style="margin-bottom: 3rem; opacity: 1; transition: opacity 300ms ease;">
                  <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                    <div style="width: 60px; height: 2px; background: #60a5fa; margin-right: 1rem;"></div>
                    <h3 style="font-size: 2rem; font-weight: bold; letter-spacing: 0.1em; margin: 0; color: #60a5fa;">
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
            <div class="hover-state" style="display: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow-y: auto;">
              ${this.layers.map((layer, index) => `
                <div class="hover-text-block" data-layer="${layer}" style="display: none; height: 100%; overflow-y: auto; padding: 2rem 1rem 2rem 0;">
                  <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                    <div style="width: 60px; height: 2px; background: #60a5fa; margin-right: 1rem;"></div>
                    <h3 style="font-size: 2rem; font-weight: bold; letter-spacing: 0.1em; margin: 0; color: #60a5fa;">
                      ${this.content[layer].title}
                    </h3>
                  </div>

                  <div style="padding-left: 75px; margin-top: 1.5rem;">
                    <div style="margin-bottom: 1.5rem;">
                      <strong style="color: #60a5fa; font-size: 0.9rem; letter-spacing: 0.05em; text-transform: uppercase;">Capability:</strong>
                      <p style="font-size: 0.95rem; line-height: 1.5; color: #e5e7eb; margin: 0.5rem 0 0 0;">
                        ${this.content[layer].capability}
                      </p>
                    </div>

                    <div style="margin-bottom: 1.5rem;">
                      <strong style="color: #60a5fa; font-size: 0.9rem; letter-spacing: 0.05em; text-transform: uppercase;">Pain Point:</strong>
                      <p style="font-size: 0.95rem; line-height: 1.5; color: #e5e7eb; margin: 0.5rem 0 0 0;">
                        ${this.content[layer].pain}
                      </p>
                    </div>

                    <div style="margin-bottom: 1rem;">
                      <strong style="color: #60a5fa; font-size: 0.9rem; letter-spacing: 0.05em; text-transform: uppercase;">Value:</strong>
                      <p style="font-size: 0.95rem; line-height: 1.5; color: #e5e7eb; margin: 0.5rem 0 0 0;">
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

          /* Professional responsive breakpoints */
          @media (max-width: 768px) {
            .secure-inform-act {
              background: url('images/Offerings Background.png') !important;
              background-size: cover !important;
              background-position: center !important;
            }

            .secure-inform-act > div {
              grid-template-columns: 1fr !important;
              gap: 2rem !important;
              padding: 2rem 1rem !important;
              max-width: 100% !important;
              text-align: left;
            }
          }

          @media (max-width: 1024px) {
            .secure-inform-act > div {
              grid-template-columns: 1fr !important;
              gap: 2rem !important;
              text-align: left;
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

            /* Remove padding from hover text content */
            .hover-text-block > div {
              padding-left: 0 !important;
            }

            /* Remove padding from default text content */
            .default-text-block p {
              padding-left: 0 !important;
            }

            /* Fix height consistency on mobile - remove scrolling but maintain same height */
            .text-content {
              height: 600px !important;
              overflow: visible !important;
            }

            .default-state {
              height: 600px !important;
              overflow: visible !important;
            }

            .hover-state {
              height: 600px !important;
              overflow: visible !important;
            }

            .hover-text-block {
              height: auto !important;
              overflow: visible !important;
              padding: 1rem 0 !important;
            }

            .text-block div {
              justify-content: flex-start !important;
            }
          }
        </style>
      </section>
    `;
  }

  bindEvents() {
    const artworkContainer = this.container.querySelector('.artwork-container');
    const defaultTextBlocks = this.container.querySelectorAll('.default-text-block');
    const container = this.container.querySelector('.secure-inform-act');

    // Single event handler for the artwork container
    artworkContainer.addEventListener('mousemove', (e) => {
      const rect = artworkContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check all layers from top to bottom (SECURE -> INFORM -> ACT)
      const detectedLayer = this.detectLayerAtPoint(x, y);

      if (detectedLayer) {
        if (this.hoveredLayer !== detectedLayer) {
          console.log(`✓ Hover detected on ${detectedLayer} at (${Math.round(x)}, ${Math.round(y)})`);
          this.setHoverState(detectedLayer);
        }
      } else {
        if (this.hoveredLayer) {
          console.log('Mouse over transparent area, clearing hover');
          this.clearHoverState();
        }
      }
    });

    // Add hover persistence for text content area
    const textContent = this.container.querySelector('.text-content');
    let isOverText = false;

    textContent.addEventListener('mouseenter', () => {
      isOverText = true;
    });

    textContent.addEventListener('mouseleave', () => {
      isOverText = false;
    });

    // Modify the artwork mousemove to respect text hover state
    const originalMouseMove = artworkContainer.addEventListener;
    artworkContainer.removeEventListener('mousemove', arguments.callee);

    artworkContainer.addEventListener('mousemove', (e) => {
      const rect = artworkContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check all layers from top to bottom (SECURE -> INFORM -> ACT)
      const detectedLayer = this.detectLayerAtPoint(x, y);

      if (detectedLayer) {
        if (this.hoveredLayer !== detectedLayer) {
          console.log(`✓ Hover detected on ${detectedLayer} at (${Math.round(x)}, ${Math.round(y)})`);
          this.setHoverState(detectedLayer);
        }
      } else {
        // Only clear hover if not over text content
        if (this.hoveredLayer && !isOverText) {
          console.log('Mouse over transparent area, clearing hover');
          this.clearHoverState();
        }
      }
    });

    // Clear hover only when leaving the entire component
    container.addEventListener('mouseleave', () => {
      this.clearHoverState();
    });

    // Add keyboard accessibility to canvases
    const layerCanvases = this.container.querySelectorAll('.layer-canvas');
    layerCanvases.forEach(canvas => {
      const layer = canvas.dataset.layer;

      canvas.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.setHoverState(layer);
        }
      });

      canvas.setAttribute('tabindex', '0');
      canvas.setAttribute('role', 'button');
      canvas.setAttribute('aria-label', `View ${this.content[layer].title} details`);
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

    // Add hover events to hover text blocks as well
    const hoverTextBlocks = this.container.querySelectorAll('.hover-text-block');
    hoverTextBlocks.forEach(block => {
      const layer = block.dataset.layer;

      block.addEventListener('mouseenter', () => {
        this.setHoverState(layer);
      });
    });

    // Container mouse leave to reset state
    container.addEventListener('mouseleave', () => {
      this.clearHoverState();
    });
  }

  detectLayerAtPoint(x, y) {
    // Check layers in z-index order (SECURE first, then INFORM, then ACT)
    for (const layer of this.layers) {
      const canvas = this.container.querySelector(`.layer-canvas[data-layer="${layer}"]`);
      const alpha = this.getPixelAlpha(canvas, x, y);

      console.log(`Checking ${layer}: alpha=${alpha}`);

      if (alpha >= 50) { // Non-transparent pixel found
        return layer;
      }
    }

    return null; // No layer detected at this point
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
          image.style.transform = 'scale(1.03)';
        } else {
          image.style.opacity = '0.2';
          image.style.filter = 'none';
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