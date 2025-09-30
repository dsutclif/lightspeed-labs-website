# SecureInformAct Component

A Next.js/React component that displays three centrally stacked ring layers (Secure, Inform, Act) with hover-isolate functionality and animated text panels.

## Features

✅ **Interactive Layer System**: Three stacked rings that respond to hover and focus
✅ **Hover Isolation**: Active layer remains in color, others desaturate to greyscale
✅ **Animated Text Panels**: Sequential fade-in animations for text content
✅ **Keyboard Navigation**: Arrow keys to cycle layers, Enter/Space to activate
✅ **Responsive Design**: Split-screen on desktop, stacked on mobile
✅ **Accessibility**: ARIA roles, focus states, screen reader support
✅ **TypeScript**: Full type safety and IntelliSense support
✅ **Framer Motion**: Smooth animations and transitions
✅ **OCR A Extended Font**: With fallbacks to IBM Plex Mono and Roboto Mono

## Tech Stack

- **Next.js 15.5.4** with App Router
- **React 19.1.1**
- **Framer Motion 12.23.22** for animations
- **TypeScript 5.9.3** for type safety
- **CSS Custom Properties** for theming

## Component API

```tsx
import SecureInformAct from '@/components/SecureInformAct'

// Use with default content
<SecureInformAct />

// Use with custom content
<SecureInformAct
  copy={{
    secure: {
      title: "SECURE",
      subtitle: "[ Custom subtitle ]",
      pain: "Custom pain point...",
      value: "Custom value proposition...",
      capability: "Custom capability..."
    },
    // ... inform and act
  }}
  className="my-custom-class"
/>
```

## File Structure

```
secure-inform-act-component/
├── app/
│   ├── globals.css          # Global styles & font setup
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Demo page
├── components/
│   ├── SecureInformAct.tsx  # Main component
│   └── IndicatorLine.tsx    # Animated indicator line
├── public/
│   ├── Offerings Background.png
│   ├── Offerings Secure.png
│   ├── Offerings Inform.png
│   └── Offerings Act.png
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## Default Content

The component comes with comprehensive default content for:

**SECURE**: Enterprise security, Zero Trust, PII redaction
**INFORM**: Knowledge management, RAG, organizational memory
**ACT**: AI agents, workflow automation, operational efficiency

## Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

   Note: If you encounter path issues on Windows due to spaces in directory names, try moving the project to a path without spaces.

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Type checking**:
   ```bash
   npm run type-check
   ```

## Usage Instructions

### Mouse Interaction
- **Hover** over any ring layer to activate it
- Active layer scales up slightly and remains in full color
- Inactive layers become greyscale and semi-transparent

### Keyboard Navigation
- **Tab** to focus the component
- **Arrow Left/Right** to cycle between layers
- **Enter or Space** to activate the focused layer

### Responsive Behavior
- **Desktop (lg+)**: 55% artwork, 45% text panel side-by-side
- **Mobile**: Stacked vertically with artwork on top

## Animations

- **Layer transitions**: Spring animation with stiffness: 240, damping: 22
- **Text panel**: Crossfade with AnimatePresence (250ms)
- **Content sections**: Sequential fade-in (Pain → Value → Capability)
- **Indicator line**: Animated stroke draw (300ms)

## Accessibility Features

- Semantic HTML structure with proper ARIA roles
- `aria-pressed` states for active layers
- `aria-controls` linking layers to text panel
- `aria-live="polite"` for dynamic content updates
- Visible focus rings for keyboard users
- Screen reader compatible content structure

## Customization

### Colors
Modify CSS custom properties in `globals.css`:
```css
:root {
  --color-primary-blue: #0a5bd8;
  --color-dark-blue: #1B365D;
  --color-text-grey: #aab3c0;
}
```

### Typography
The component uses the OCR A Extended font with fallbacks. To add the actual font file:

1. Place `OCRAExtended.woff2` in `/public/fonts/`
2. The `@font-face` declaration is already set up in `globals.css`

### Animation Timing
Adjust animation timing in the component files:
- Spring animations in `SecureInformAct.tsx`
- Sequential delays in text fade-ins
- Indicator line timing in `IndicatorLine.tsx`

## QA Checklist

- ✅ Layer isolation works on hover and keyboard focus
- ✅ Titles slide/fade; content fades in Pain → Value → Capability sequence
- ✅ Non-active layers appear light greyscale (not dark/muddy)
- ✅ Responsive: artwork scales; right panel stacks on mobile
- ✅ Font falls back gracefully without OCR A Extended file
- ✅ Keyboard navigation with arrow keys
- ✅ Accessibility features implemented
- ✅ TypeScript types are complete and accurate

## Performance Considerations

- Images use `next/image` with priority loading for the first layer
- Animations use `transform` and `opacity` for GPU acceleration
- Grayscale filters are applied efficiently
- Component is optimized for 60fps interactions

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari iOS 14+