# Lightspeed Labs Consulting Website

Single-page consulting website for AI workflow automation services.

## Setup

1. No build process required - pure HTML/CSS/JS
2. Use any local server (e.g., `python -m http.server 8000`)
3. Update content in `/content/site-content.json`
4. Replace placeholder images in `/images/placeholders/` with real assets

## Image Asset Requirements

All placeholder images include pixel dimensions in filename. Generate or replace:

### Hero Section
- `hero-background-1920x1080.png` - Abstract tech visualization
- `hero-particle-overlay.svg` - Animated particle system

### Icons (256x256px unless noted)
- `icon-vc-256x256.svg` - Growth chart icon (✓ Created)
- `icon-startup-256x256.svg` - Rocket icon (✓ Created)
- `icon-digital-256x256.svg` - Network nodes icon (✓ Created)
- `icon-discovery-128x128.svg` - Discovery phase icon
- `icon-foundation-128x128.svg` - Foundation phase icon
- `icon-enhancement-128x128.svg` - Enhancement phase icon
- `icon-scale-128x128.svg` - Scale phase icon

### Security Icons (256x256px)
- `security-fort-knox-256x256.svg` - Maximum security shield (✓ Created)
- `security-bank-vault-256x256.svg` - High security shield (✓ Created)
- `security-wall-safe-256x256.svg` - Standard security shield (✓ Created)

### Solution Mockups (800x600px)
- `solution-investment-800x600.png` - Dashboard mockup
- `solution-email-800x600.png` - Email interface mockup
- `solution-founder-800x600.png` - Research dashboard
- `solution-custom-800x600.png` - Workflow diagram

### Publications
- `article-featured-800x450.jpg` - Featured article image
- `logo-entrepreneur-120x40.png`
- `logo-business-insider-120x40.png`
- `logo-tech-times-120x40.png`
- `logo-ibtimes-120x40.png`
- `logo-hackernoon-120x40.png`

### Team
- `team-hero-600x800.jpg` - Professional photo placeholder

### SEO/Social
- `og-image-1200x630.jpg` - Open Graph preview
- `twitter-card-1200x675.jpg` - Twitter preview

## AI Image Generation Prompts

Use these prompts with DALL-E, Midjourney, or similar:

**Hero Background (1920x1080):**
"Abstract technology visualization with flowing data streams, neural network patterns, gradient from deep navy blue #1B365D to electric cyan #00B4D8, modern sophisticated aesthetic, no text, professional consulting style"

**Icon Set (256x256, Monochrome #1B365D):**
"Minimalist line icon, modern geometric professional style, monochrome, suitable for scaling:
- VC: Upward trending growth chart with dollar sign
- Startup: Rocket launching with trail
- Digital Business: Connected network nodes forming web"

**Security Icons (256x256, Isometric):**
"Three-tier security shield icon, isometric modern professional style, monochrome #1B365D with #A47864 accents:
- Fort Knox: Multi-layered fortress shield with lock
- Bank Vault: Solid vault door shield with combination lock
- Wall Safe: Simple wall-mounted safe shield"

**Solution Mockups (800x600):**
"Modern dashboard UI mockup, clean interface, Deep Ocean Blue #1B365D navigation, white background, Electric Cyan #00B4D8 accent buttons, professional business tool aesthetic, realistic anonymized data"

## Configuration

### Calendly Integration
1. Sign up at calendly.com
2. Create "30min-consultation" event type
3. Add qualification questions (see spec)
4. Update `index.html` line ~450 with your Calendly username

### Airtable Integration (handled separately)
- Form submissions will POST to Airtable API
- Configure API connection separately in backend

## Development
```bash
# Start local server
python -m http.server 8000
# or
npx http-server -p 8000

# Open browser
http://localhost:8000
```

## Performance Targets

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Total Bundle Size: < 500KB (excluding images)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari iOS 14+

## File Structure

```
lightspeed-labs-website/
├── index.html
├── css/
│   ├── variables.css
│   ├── global.css
│   ├── components.css
│   └── sections.css
├── js/
│   ├── main.js
│   ├── forms.js
│   ├── scroll-animations.js
│   └── utils.js
├── images/
│   ├── placeholders/
│   ├── icons/
│   ├── solutions/
│   ├── publications/
│   └── team/
├── content/
│   └── site-content.json
├── README.md
└── .gitignore
```

## Testing Checklist

### Functionality Tests
- [ ] Navigation scrolls smoothly to sections
- [ ] Mobile menu opens/closes properly
- [ ] All content loads from JSON
- [ ] Stats display correctly
- [ ] Partner cards render
- [ ] Solutions display with images
- [ ] Implementation cards show
- [ ] Methodology timeline appears
- [ ] Security tiers display
- [ ] Insights/publications load
- [ ] About section populates
- [ ] Contact form validates fields
- [ ] Newsletter form works
- [ ] Footer links function

### Responsive Testing
- [ ] Mobile (375px width)
- [ ] Tablet (768px width)
- [ ] Desktop (1024px width)
- [ ] Large Desktop (1440px width)

### Form Validation
- [ ] Required fields show errors
- [ ] Email validation works
- [ ] Name validation (letters/spaces/hyphens only)
- [ ] Success messages appear
- [ ] Form resets after submission

### Scroll Animations
- [ ] Elements fade in on scroll
- [ ] Animations trigger at correct viewport position
- [ ] No performance issues

### Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

## Post-Build Configuration

### Step 1: Update Calendly Integration
In `index.html`, line ~450, replace:
```html
data-url="https://calendly.com/YOUR_USERNAME_HERE/30min-consultation"
```

With your actual Calendly URL:
```html
data-url="https://calendly.com/your-actual-username/30min-consultation"
```

### Step 2: Replace Placeholder Images
Use the AI image generation prompts above to create professional images for all placeholder files.

### Step 3: Add Analytics (Optional)
Add Google Analytics or Plausible tracking code before closing `</head>` tag.

## Deployment Options

### Option 1: Netlify
```bash
netlify deploy --prod --dir=.
```

### Option 2: Vercel
```bash
vercel --prod
```

### Option 3: GitHub Pages
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Set source to main branch, root directory

## License

© 2025 Lightspeed Labs Consulting. All rights reserved.