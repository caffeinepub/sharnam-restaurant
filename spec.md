# Sharnam Restaurant

## Current State
New project — no existing code.

## Requested Changes (Diff)

### Add
- Full restaurant website for Sharnam Restaurant, Mandsaur, Madhya Pradesh, India
- Hero section with full-screen image, headline, subheading, and CTA buttons
- About section with chef image and restaurant story
- Signature Dishes section with 6 dish cards (image, name, price)
- Full Menu section with category tabs (Starters, Soups, Paneer Specials, Veg Curries, Dal, Rice, Indo-Chinese, Breads, South Indian, Fast Food, Desserts, Beverages)
- Customer Reviews section with 3 testimonials
- Gallery section with placeholder grid
- Reservation Form (Name, Phone, Email, Guests, Date, Time, Special Request)
- Location section with address, opening hours, and embedded map
- Footer with logo, quick links, contact info, social media icons
- Backend canister to store reservation submissions

### Modify
- Nothing (new project)

### Remove
- Nothing

## Implementation Plan
1. Generate images: hero, about/chef, 6 signature dish photos
2. Select no special components (pure frontend + basic backend)
3. Generate Motoko backend with a `submitReservation` function storing reservation records
4. Build React frontend with all sections, smooth scroll, hover animations, mobile-responsive layout
   - Color palette: Deep Maroon #7b1e2b, Royal Gold #d4af37, Cream #fff8ee
   - Serif headings (Playfair Display), sans-serif body (Inter)
   - Sticky nav with smooth scroll to sections
   - Hero, About, Signature Dishes, Full Menu (tabbed), Reviews, Gallery, Reservation, Location, Footer
5. Deploy
