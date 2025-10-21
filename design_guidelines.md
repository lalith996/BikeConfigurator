# Custom Bike Builder - Design Guidelines

## Design Approach
**Reference-Based:** Drawing inspiration from premium outdoor e-commerce (REI, Backcountry) combined with modern product configurators (Nike By You, Tesla Design Studio). The design emphasizes the craftsmanship of custom bike building with a professional, adventure-ready aesthetic that appeals to serious mountain bikers.

## Core Design Principles
1. **Visual Progression:** Every component selection shows immediate, satisfying visual feedback
2. **Craftsmanship Focus:** Celebrate the custom build process with premium, detailed imagery
3. **Performance-Driven:** Display specs (weight, price) prominently like performance metrics
4. **Trustworthy Authority:** Position as expert bike builders, not just another retailer

## Color Palette

### Light Mode (Primary)
- **Base:** 0 0% 100% (pure white backgrounds)
- **Surface:** 0 0% 98% (subtle card backgrounds)
- **Primary Brand:** 210 55% 35% (deep mountain blue - trust, performance)
- **Accent Trail:** 25 75% 50% (energetic orange for CTAs - trail energy)
- **Success Build:** 145 60% 45% (mountain green for completed steps)
- **Text Primary:** 220 15% 15% (near-black for readability)
- **Text Secondary:** 220 10% 45% (muted for supporting text)
- **Border Subtle:** 220 15% 90% (light dividers)

### Dark Mode
- **Base:** 220 20% 10% (rich dark background)
- **Surface:** 220 18% 14% (elevated cards)
- **Primary Brand:** 210 60% 55% (brighter blue for contrast)
- **Accent Trail:** 25 80% 60% (vibrant orange)
- **Text Primary:** 0 0% 95% (off-white)
- **Text Secondary:** 220 10% 70% (muted light)

## Typography
- **Primary Font:** 'Inter' (Google Fonts) - Clean, technical, modern
- **Headings:** 'Montserrat' (Google Fonts) - Strong, confident, athletic
- **Sizes:** Hero: 3.5rem/4rem, H1: 2.5rem, H2: 2rem, H3: 1.5rem, Body: 1rem, Small: 0.875rem
- **Weights:** Regular (400), Medium (500), Semibold (600), Bold (700)

## Layout System
**Spacing Scale:** Consistent use of 4, 8, 12, 16, 20, 24, 32, 48, 64 (tailwind units: p-1 through p-16)

### Builder Interface Layout
- **Split-Screen Design (Desktop):** 
  - Left: Component selector (40% width, max-w-2xl)
  - Right: Live bike visualization (60% width)
  - Sticky bike preview that follows scroll
- **Mobile:** Stack vertically - visualization at top, then component selector
- **Progress Bar:** Fixed at top, 4px height, fills with success green
- **Price & Weight:** Sticky bottom bar on mobile, top-right card on desktop

## Component Library

### Navigation
- Clean top nav with logo left, cart icon right
- Builder-specific nav shows: Progress dots, "Save Build," "Need Help?"
- Transparent background over hero, solid white after scroll

### Builder Wizard Steps
- **Step Cards:** Rounded-xl (12px), shadow-lg, p-6 spacing
- **Component Cards:** 
  - Grid layout (2-3 columns desktop, 1 mobile)
  - Image prominent at top (aspect-ratio 4:3)
  - Component name, price, weight below
  - Radio select or checkmark indicator
  - Hover: Lift with shadow-xl, border accent color
  - Selected: Border-2 with accent trail color
- **Selection Confirmation:** Smooth check animation, haptic-like visual feedback

### Live Bike Preview
- **Canvas Area:** Full height, centered bike visualization
- **Layer System:** Base frame → Fork → Wheels → Components (overlay compositing)
- **Smooth Transitions:** 300ms ease-in-out for component swaps
- **Zoom Controls:** +/- buttons, pinch-to-zoom mobile
- **Rotation:** Optional 360° view with drag interaction
- **Spec Display:** Floating card showing current: Total Price, Total Weight, Component Count

### Forms (Rider Info)
- **Input Fields:** Rounded-lg, border-2, p-3, focus ring with primary color
- **Labels:** Above inputs, font-medium, text-sm
- **Select Dropdowns:** Custom styled with chevron icons
- **Measurement Helper:** Tooltip icon with diagram modal
- **Validation:** Inline error states, success checkmarks

### Buttons & CTAs
- **Primary CTA:** Rounded-lg, py-3 px-6, accent trail color, bold text, shadow-md
- **Secondary:** Outlined variant with primary brand color
- **Over Images:** Backdrop-blur-md, semi-transparent white background
- **Icon Integration:** Use Heroicons throughout for consistency

### Progress Indicator
- **Top Bar Style:** Linear progress with segments
- **Step Dots:** 5 dots representing each step, filled/outlined states
- **Step Names:** Show below dots on desktop, hide on mobile
- **Animation:** Progress fills smoothly, dots pop with scale animation

### FAQ Section
- **Accordion Style:** Expandable cards with chevron indicators
- **Categories:** "General," "Shipping," "Warranty" tabs
- **Icons:** Question mark icons for each FAQ item
- **Spacing:** Generous py-6 between items

### Support Chat Widget
- **Fixed Position:** Bottom-right, z-50
- **Trigger Button:** Circular, accent color, message icon
- **Chat Window:** Rounded-xl, shadow-2xl, max-h-96
- **Minimal Footprint:** Collapses to button when not in use

## Images

### Hero Section (Home Page)
**Large Hero Image:** Full-width, 60vh height, professional mountain biker on trail in action shot. Image should convey excitement, freedom, and performance. Overlay with subtle gradient (bottom to top, black opacity 0.6 to 0) for text readability.

### Builder Visualization
**Component Images:** High-quality product photography on transparent backgrounds (PNG). Each component (frame, fork, wheel, groupset, brake) needs individual images for layering.

### Process Section
**3-4 Images:** Behind-the-scenes bike assembly photos showing craftsmanship - mechanic working on bike, close-up of component installation, quality control inspection.

### FAQ Section
**Measurement Diagram:** Illustration showing saddle height measurement technique (as referenced in original site).

### Testimonials/Gallery
**Customer Build Photos:** 6-8 completed custom bikes in various colors/configurations in grid layout (3 columns desktop, 2 tablet, 1 mobile).

## Animations
**Minimal and Purposeful:**
- Component swap: 300ms crossfade
- Card selection: 200ms scale (1.02) + shadow increase
- Progress bar fill: 400ms ease-out
- Price update: Number count-up animation (600ms)
- Page transitions: 250ms fade
- **Avoid:** Excessive parallax, continuous rotating elements, distracting background animations

## Unique Features
- **Build Comparison:** Side-by-side view of 2-3 saved builds
- **Share Build:** Generate shareable link with current configuration
- **Build Gallery:** Showcase completed customer bikes for inspiration
- **Live Inventory Indicator:** "In Stock" / "2-3 days" badges on components
- **Expert Recommendations:** "Popular choice" or "Staff pick" badges on certain components

## Accessibility
- WCAG AA contrast ratios maintained throughout
- Focus indicators visible on all interactive elements
- Keyboard navigation for entire builder flow
- Alt text for all bike component images
- Screen reader announcements for component selection changes
- Dark mode toggle respects system preference by default