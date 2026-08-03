# Voltra Tracker

A premium, minimalist daily consistency tracker designed with uncompromising aesthetics and functional elegance. Built for professionals who demand both performance and visual sophistication.

## Features

- **Minimalist Interface**: Distraction-free tracking environment with a high-contrast, off-white and deep neutral palette.
- **Milestone Celebrations**: Subtle, elegant confetti animations triggered at key consistency milestones (7, 14, 21, and 30 days).
- **Goal Setting**: Customizable streak targets with a precise progress indicator.
- **Client-Side Persistence**: Fast, offline-first data storage using secure local state.
- **Adaptive Design**: Flawless responsive layout from mobile to ultra-wide displays.
- **Advanced Security Measures**: Protection against casual scraping and inspection via context menu suppression and keyboard shortcut blocking.

## Technology Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS, utilizing OKLCH color space for precise perceptual uniformity
- **Typography**: Inter (system-ui fallback) with optimized line-height and letter-spacing for premium readability
- **Icons**: Lucide React for crisp, scalable vector iconography
- **Animation**: Framer Motion for liquid-smooth transitions and interruptible micro-interactions
- **Milestones**: Canvas Confetti for celebratory visual feedback

## Design Philosophy

Voltra Tracker adheres to a strict design philosophy:
- **Restraint**: Every pixel must justify its existence. No arbitrary borders, gradients, or shadows.
- **Mathematical Spacing**: Layout relies on an 8px grid system, ensuring perfect optical alignment.
- **Typography as UI**: Hierarchy is established through weight, size, and whitespace, not just color.
- **Fluid Motion**: Interactions feel tactile and responsive, never sluggish or exaggerated.

## Installation & Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Security

Voltra Tracker implements several client-side security measures to discourage scraping and unauthorized inspection:
- Content Security Policy (CSP) enforcement
- Suppression of context menus
- Disablement of common developer tool keyboard shortcuts (F12, Ctrl+Shift+I, etc.)
- Protection against basic automated interaction

## License

All rights reserved.
