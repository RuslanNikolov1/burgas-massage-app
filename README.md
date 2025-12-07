# Massage App - Бургас

A Next.js application for a professional masseur based in Burgas, Bulgaria. The app provides information about massage services, booking functionality, and promotes wellbeing and relaxation.

## Features

- 🌐 **Bilingual Support**: Bulgarian (default) and English
- 📅 **Booking System**: Interactive calendar with time slot selection
- 💰 **Pricing Table**: Transparent pricing with promotional packages
- ⭐ **Client Reviews**: Showcase of customer feedback
- 🛍️ **Products Section**: Massage-related products for sale
- 📱 **Responsive Design**: Mobile-first, fully responsive
- ♿ **Accessibility**: WCAG AA compliant
- 🎨 **Beautiful Design**: Custom fonts (Ouroboros for titles, Philosopher for content)
- 🚀 **Performance**: Lazy-loaded sections, optimized images

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **SCSS Modules**
- **React Hook Form**
- **Framer Motion**
- **Feature-based Architecture**

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── features/              # Feature-based modules
│   ├── about/            # About section
│   ├── booking/          # Booking calendar
│   ├── contact/          # Contact section
│   ├── feedbacks/        # Reviews section
│   ├── hero/             # Hero banner
│   ├── i18n/             # Internationalization
│   ├── layout/           # Layout components
│   ├── pricing/          # Pricing table
│   ├── products/         # Products section
│   └── ui/               # Shared UI components
├── fonts/                # Font files
├── public/               # Static assets
└── styles/               # Global styles
    ├── fonts.scss        # Font definitions
    ├── globals.scss      # Global styles
    └── variables.scss    # SCSS variables
```

## Design

- **Background Color**: `#04282f` (primary), `#021a1f` (secondary)
- **Accent Color**: `#d4af37` (golden)
- **Fonts**:
  - Titles: Ouroboros
  - Content: Philosopher (Regular, Bold, Italic, BoldItalic)

## Sections

1. **Hero**: Logo, services description, motivational message, location map
2. **About**: Masseur description with image
3. **Pricing**: Pricing table with promotional packages and stones image
4. **Booking**: Interactive calendar with form (9:00-18:00 working hours)
5. **Feedbacks**: 6 mock client reviews
6. **Products**: Mock massage products for sale
7. **Contact**: Contact links with meditation image

## Accessibility

- Semantic HTML
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Screen reader friendly

## SEO

- Meta tags optimized
- Open Graph tags
- Semantic markup
- Proper heading hierarchy

## License

Private project for masseur services in Burgas.






















