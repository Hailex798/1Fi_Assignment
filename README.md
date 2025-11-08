
# 1Fi – Full Stack Assignment

A full-stack web application that displays **mobile phone products**, allows users to **select variants**, and compare **EMI financing plans** dynamically.  
This project demonstrates clean architecture, scalable backend structure, UI/UX design, real API usage, and database modeling.

---

## 🚀 Live Links

| Layer | URL |
|------|-----|
| **Frontend** | https://1-fi-assignment-dun.vercel.app/mobiles |
| **Backend API** | https://onefi-assignment-4.onrender.com |
| **Products Endpoint** | https://onefi-assignment-4.onrender.com/api/products |

---

## 🧰 Tech Stack

### Frontend
- React.js (Vite + TypeScript)
- React Router DOM
- Tailwind CSS v4
- Functional Components + Hooks

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- ts-node + nodemon
- dotenv for environment configuration

### Deployment
- **Frontend** → Vercel
- **Backend** → Render
- **Database** → MongoDB Atlas

---

## 🗂️ Project Structure

```

project-root/
│
├── client/                       # Frontend (React + Tailwind)
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   ├── routes/               # Screens (Product list + detail page)
│   │   ├── lib/api.ts            # API caller utilities
│   │   ├── types.ts              # Shared TypeScript interfaces
│   │   └── main.tsx
│   ├── index.html
│   ├── tailwind.config.cjs
│   └── postcss.config.cjs
│
└── server/                       # Backend (Node + Express)
├── src/
│   ├── config/db.ts          # MongoDB Connection
│   ├── models/               # Schemas
│   │   ├── Product.ts
│   │   └── EMIPlan.ts
│   ├── controllers/          # Route Controllers
│   │   └── productController.ts
│   ├── routes/products.ts    # Express Router
│   ├── seed/seed.ts          # Seed Script
│   └── server.ts             # App Entry
└── package.json

````

---

## 🗄️ Database Schema

### Product Schema
```ts
{
  name: string,
  brand: string,
  slug: string,
  description: string,
  variants: [
    {
      name: string,
      mrp: number,
      price: number,
      images: string[]
    }
  ]
}
````

### EMI Plan Schema

```ts
{
  productId: ObjectId,
  variantId: ObjectId,
  tenureMonths: number,
  interestAPR: number,
  monthlyAmount: number,
  cashback?: number,
  provider?: string
}
```

---

## 🌱 Seed Data

Ensure `.env` contains:

```
MONGO_URI=your-mongodb-atlas-url
PORT=4000
```

Run seeding:

```bash
cd server
npm install
npm run seed
npm run dev
```

---

## 🏃 Running the Project Locally

### Backend

```bash
cd server
npm install
npm run dev
```

Runs at:

```
http://localhost:4000
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Runs at:

```
http://localhost:5173
```

---

## 📡 API Endpoints

| Method | Endpoint              | Description                                       |
| ------ | --------------------- | ------------------------------------------------- |
| GET    | `/api/products`       | Get product list with computed price range        |
| GET    | `/api/products/:slug` | Get product detail + selected variant + EMI plans |

### Example Response: `/api/products`

```json
{
  "items": [
    {
      "name": "iPhone 14",
      "brand": "Apple",
      "slug": "iphone-14",
      "image": "https://...",
      "priceRange": { "min": 59999, "max": 79999 }
    }
  ]
}
```

### Example Response: `/api/products/:slug`

```json
{
  "product": {
    "name": "iPhone 14",
    "brand": "Apple",
    "variants": [...]
  },
  "selectedVariantId": "66d9989...",
  "emiPlans": [
    {
      "tenureMonths": 12,
      "interestAPR": 0,
      "monthlyAmount": 4999
    }
  ]
}
```

---

## ✅ Features

| Feature              | Status |
| -------------------- | ------ |
| Product Listing Page | ✅      |
| Product Detail Page  | ✅      |
| Variant Switching    | ✅      |
| EMI Plan Comparison  | ✅      |
| Responsive UI        | ✅      |
| Seeded Database      | ✅      |
| API Documentation    | ✅      |
| Deployment           | ✅      |

---

## 👨‍💻 Developer

Name: **[Kshitij Singh Bisht]**
Email: *[kshitijsinghbisht777@gmail.com](mailto:kshitijsinghbisht777@gmail.com)*
---

## 🎯 Summary

This project demonstrates:

* Good backend API design
* Clean data modeling in MongoDB
* React UI with dynamic data rendering
* Tailwind-based responsive layouts
* Fully deployed and functioning product

---

