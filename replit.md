# Custom Bike Builder

A full-stack web application for building custom mountain bikes with real-time visualization, built with React, Express, and TypeScript.

## Overview

Custom Bike Builder allows users to design their perfect mountain bike by selecting brands, frames, and premium components. The application features real-time visual updates as components are selected, dynamic price and weight tracking, and a smooth multi-step wizard interface.

## Recent Changes

**January 2025** - Initial MVP Implementation
- Implemented complete bike builder wizard with 5 steps (Brand → Frame → Components → Review → Summary)
- Built real-time bike visualizer with layered component rendering
- Created comprehensive component catalog with 3 brands, 4 frame models, and 12+ components
- Implemented shopping cart functionality with automatic discount calculation
- Added FAQ section and support chat widget
- Configured mountain bike-themed design system (deep blue primary, energetic orange accent)

## User Preferences

- **Design Philosophy**: Premium outdoor e-commerce aesthetic inspired by REI and Backcountry
- **Color Scheme**: Mountain blue primary (#356B8C), trail orange accent (#E67E22), success green (#45A164)
- **Typography**: Inter for body text, Montserrat for headings
- **Component Library**: Shadcn UI with Tailwind CSS
- **Visual Quality**: Exceptional attention to spacing, typography, and micro-interactions

## Project Architecture

### Tech Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Express.js, Node.js
- **State Management**: TanStack Query (React Query v5)
- **Routing**: Wouter
- **Forms**: React Hook Form with Zod validation
- **Storage**: In-memory storage (MemStorage) for development

### Project Structure

```
bike-builder/
├── client/                          # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── builder/             # Builder-specific components
│   │   │   │   ├── bike-visualizer.tsx
│   │   │   │   ├── brand-select.tsx
│   │   │   │   ├── component-card.tsx
│   │   │   │   ├── component-select.tsx
│   │   │   │   ├── frame-select.tsx
│   │   │   │   ├── price-weight-tracker.tsx
│   │   │   │   ├── progress-indicator.tsx
│   │   │   │   ├── review-step.tsx
│   │   │   │   ├── summary-step.tsx
│   │   │   │   └── loading-skeleton.tsx
│   │   │   ├── navbar.tsx
│   │   │   ├── support-chat-widget.tsx
│   │   │   └── ui/                  # Shadcn UI components
│   │   ├── pages/
│   │   │   ├── home.tsx             # Landing page with hero
│   │   │   ├── builder.tsx          # Main builder wizard
│   │   │   ├── cart.tsx             # Shopping cart
│   │   │   ├── faq.tsx              # FAQ page
│   │   │   └── not-found.tsx
│   │   ├── lib/
│   │   │   ├── queryClient.ts       # React Query setup
│   │   │   └── utils.ts
│   │   └── App.tsx
│   ├── index.html
│   └── attached_assets/
│       └── generated_images/        # AI-generated bike component images
├── server/                          # Express backend
│   ├── routes.ts                    # API endpoints
│   ├── storage.ts                   # In-memory data storage
│   └── index.ts
├── shared/
│   └── schema.ts                    # TypeScript types and Zod schemas
├── design_guidelines.md             # Design system documentation
└── replit.md                        # This file
```

## Key Features

### Multi-Step Builder Wizard
1. **Brand Selection** - Choose from Evil, Yeti, or Santa Cruz
2. **Frame Selection** - Pick your frame model (160-170mm travel options)
3. **Component Selection** - Select fork, wheelset, groupset, and brakes via tabbed interface
4. **Review** - Review all selections with option to edit any section
5. **Summary** - Enter rider info (weight, height, saddle height, t-shirt size) and complete build

### Real-Time Bike Visualizer
- Layered component rendering showing frame, fork, wheels, groupset, and brakes
- Smooth transitions when components are swapped (300ms crossfade)
- Zoom controls (60-200%)
- Visual component list below preview
- **Compatibility Filtering**: Only compatible components shown based on selected frame's wheel size

### Dynamic Pricing & Discounts
- Real-time price and weight tracking as components are selected
- Automatic discounts:
  - Builds over $5,000: 10% discount
  - Builds over $3,000: 5% discount
- Weight displayed in both pounds and kilograms

### Shopping Cart
- Add completed builds to cart
- View build details and pricing
- Remove builds from cart
- Free shipping on orders over $50
- Checkout flow (ready for payment integration)

### Additional Features
- FAQ page with accordion (General, Shipping, Warranty sections)
- Support chat widget (fixed bottom-right, expandable)
- Responsive design (mobile, tablet, desktop)
- Loading skeletons for better UX
- Empty states and error handling

## API Endpoints

### Brands
- `GET /api/brands` - Get all brands

### Frames
- `GET /api/frames?brandId={id}` - Get frames (optionally filtered by brand)
- `GET /api/frames/:brandId` - Get frames by brand ID

### Components
- `GET /api/components?category={category}&wheelSize={size}` - Get components (filtered by category and wheel size compatibility)

### Builds
- `POST /api/builds` - Create a new build (auto-adds to cart)
- `GET /api/builds` - Get all builds

### Cart
- `GET /api/cart` - Get cart items
- `DELETE /api/cart/:buildId` - Remove build from cart

## Data Models

### Brand
```typescript
{
  id: string
  name: string
  logo?: string
  description?: string
}
```

### Frame
```typescript
{
  id: string
  brandId: string
  name: string
  image: string
  price: decimal
  weight: decimal
  description?: string
  travelMm?: number
  wheelSize?: string
  material?: string
}
```

### Component
```typescript
{
  id: string
  category: 'fork' | 'wheelset' | 'groupset' | 'brakes'
  brand: string
  name: string
  image: string
  price: decimal
  weight: decimal
  description?: string
  specs?: string
  compatibleWheelSizes?: string
}
```

### Build
```typescript
{
  id: string
  brandId: string
  frameId: string
  forkId?: string
  wheelsetId?: string
  groupsetId?: string
  brakesId?: string
  totalPrice: decimal
  totalWeight: decimal
  riderWeight?: number
  riderHeight?: number
  saddleHeight?: number
  tshirtSize?: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'
  createdAt: string
}
```

## Running the Project

The workflow "Start application" runs `npm run dev` which starts:
- Express server for the backend
- Vite server for the frontend
- Both served on the same port

After making edits, the workflow automatically restarts.

## Future Enhancements

### Phase 2 Features
- Complete checkout flow with Stripe payment integration
- User accounts with build history and saved configurations
- Build gallery showcasing completed custom bikes from other customers
- Email notifications for order confirmation and build status updates
- Admin dashboard for managing inventory, components, and pricing

### Advanced Visualization
- 360-degree bike view rotation for detailed inspection
- Zoom and detail views for specific components
- Color customization for frames and components
- AR preview feature for mobile devices

## Design System

The application follows a carefully crafted design system documented in `design_guidelines.md`:

- **Colors**: Mountain blue primary, trail orange accent, success green
- **Typography**: Inter (body), Montserrat (headings)
- **Spacing**: Consistent 4px-based scale
- **Components**: Shadcn UI primitives with custom styling
- **Interactions**: Subtle hover elevations, smooth transitions
- **Accessibility**: WCAG AA compliant contrast ratios

## Notes

- All bike component images are AI-generated placeholder images
- In-memory storage resets on server restart
- Free shipping applies to orders over $50 in the lower 48 United States
- Custom builds typically take 7-10 days to assemble and ship
- 30-day return policy applies with some exceptions for custom builds
