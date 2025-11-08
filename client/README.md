# Snapmint Clone - EMI Product Store

A pixel-perfect recreation of the Snapmint e-commerce interface, built with React, TypeScript, and Tailwind CSS.

## Features

- **Exact Snapmint UI Recreation**: Matches the original design including colors, layout, and interactions
- **Product Detail Page**: Complete iPhone 17 Pro product page with image gallery, variant selection, and EMI plans
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **EMI Calculator**: Interactive EMI plan selection with different tenure options
- **Fallback Data**: Works even without backend API using mock data

## Tech Stack

- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Vite** for fast development

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the local development URL

## Project Structure

```
src/
├── components/          # Reusable UI components
├── routes/             # Page components
│   ├── ProductDetail.tsx   # Main product page (iPhone 17 Pro)
│   └── ProductsList.tsx    # Products listing page
├── lib/                # API utilities
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main app component with header
└── main.tsx            # App entry point
```

## Key Features Implemented

### Header Navigation
- Snapmint logo and branding
- Search bar with placeholder text
- Navigation menu with all categories
- Business and EMI payment buttons
- Sign up button

### Product Detail Page
- Breadcrumb navigation
- Image gallery with thumbnails
- Product information and pricing
- Variant selection (Color/Storage)
- Downpayment options
- EMI tenure selection with different plans
- Interactive EMI calculator
- "Buy on EMI" button

### Design Accuracy
- Exact color scheme matching Snapmint's teal branding
- Proper spacing and typography
- Interactive states and hover effects
- Responsive grid layout
- Custom radio button styling

## API Integration

The app is designed to work with a backend API but includes fallback mock data for demonstration purposes. The API endpoints expected are:

- `GET /api/products` - List all products
- `GET /api/products/:slug` - Get product details with EMI plans

## Customization

The design can be easily customized by modifying:
- `tailwind.config.cjs` for colors and theme
- `src/index.css` for custom styles
- Component files for layout and functionality

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.