# StockY — E-commerce Platform

**CSC 317 Group Project — Milestone 4 (Final)**

StockY is a full-stack e-commerce platform for buying and selling sneakers. This project demonstrates a complete full-stack implementation with front-end, back-end, database integration, and authentication.

---

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation & Setup](#installation--setup)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Known Limitations](#known-limitations)
- [Contributors](#contributors)

---

## Features

- **User Authentication**: Registration, login, logout with session management
- **Product Catalog**: Browse sneakers by brand, category, and trending items
- **Product Details**: View detailed product information with size and price options
- **Shopping Cart**: Add products to cart and proceed to checkout
- **Dynamic Data**: All products are stored in PostgreSQL and fetched via REST API
- **Responsive Design**: Mobile-friendly interface with modern UI/UX

---

## Technology Stack

### Front-End
- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- Fetch API for API calls

### Back-End
- Node.js
- Express.js
- PostgreSQL
- Express Sessions for authentication
- bcryptjs for password hashing

---

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Step 1: Clone the Repository

```bash
git clone https://github.com/CSC317-F25/group-project-ArthurVandross.git
cd group-project-ArthurVandross
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up PostgreSQL Database

1. Create a new PostgreSQL database:

```bash
createdb stocky_db
```

2. Run the schema file to create tables:

```bash
psql -d stocky_db -f db/schema.sql
```

3. Seed the database with initial product data:

```bash
psql -d stocky_db -f db/seed.sql
```

### Step 4: Configure Environment Variables

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Edit `.env` and fill in your database credentials:

```env
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=stocky_db
DB_PASS=your_db_password
DB_PORT=5432
SESSION_SECRET=your_secret_session_key_change_this_in_production
PORT=3001
NODE_ENV=development
```

### Step 5: Run the Application

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The server will start on `http://localhost:3001`

---

## Database Schema

### Tables

#### `users`
Stores user account information for authentication.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PRIMARY KEY | Unique user ID |
| first_name | VARCHAR(100) | User's first name |
| last_name | VARCHAR(100) | User's last name |
| email | VARCHAR(255) UNIQUE | User's email (unique) |
| password | VARCHAR(255) | Hashed password |
| created_at | TIMESTAMP | Account creation timestamp |

#### `products`
Stores product information.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PRIMARY KEY | Unique product ID |
| product_id | VARCHAR(100) UNIQUE | Human-readable product ID |
| title | VARCHAR(255) | Product title |
| brand | VARCHAR(100) | Brand name |
| style_code | VARCHAR(100) | Style/SKU code |
| year | INTEGER | Release year |
| condition | VARCHAR(100) | Product condition |
| colorway | VARCHAR(255) | Color description |
| hero_image | VARCHAR(500) | Main product image URL |
| created_at | TIMESTAMP | Product creation timestamp |

#### `product_sizes`
Stores available sizes and prices for each product.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PRIMARY KEY | Unique ID |
| product_id | INTEGER | Foreign key to products |
| size | VARCHAR(20) | Shoe size |
| price | DECIMAL(10,2) | Price for this size |

#### `product_images`
Stores multiple images for each product.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PRIMARY KEY | Unique ID |
| product_id | INTEGER | Foreign key to products |
| image_url | VARCHAR(500) | Image URL |
| display_order | INTEGER | Display order |

#### `related_products`
Stores product relationships for recommendations.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PRIMARY KEY | Unique ID |
| product_id | INTEGER | Foreign key to products |
| related_product_id | INTEGER | Foreign key to related product |

#### `orders`
Stores order information.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PRIMARY KEY | Unique order ID |
| user_id | INTEGER | Foreign key to users |
| total_amount | DECIMAL(10,2) | Order total |
| shipping_address | TEXT | Shipping address |
| status | VARCHAR(50) | Order status |
| created_at | TIMESTAMP | Order creation timestamp |

#### `order_items`
Stores individual items in each order.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PRIMARY KEY | Unique ID |
| order_id | INTEGER | Foreign key to orders |
| product_id | INTEGER | Foreign key to products |
| size | VARCHAR(20) | Product size |
| quantity | INTEGER | Quantity ordered |
| price | DECIMAL(10,2) | Price at time of order |

### Relationships

- `products` → `product_sizes` (one-to-many)
- `products` → `product_images` (one-to-many)
- `products` → `related_products` (many-to-many via junction table)
- `users` → `orders` (one-to-many)
- `orders` → `order_items` (one-to-many)
- `products` → `order_items` (one-to-many)

---

## API Documentation

### Base URL
```
http://localhost:3001
```

### Authentication Endpoints

#### `POST /register`
Register a new user account.

**Request Body:**
```json
{
  "first": "John",
  "last": "Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:** Redirects to `/login.html` on success

---

#### `POST /login`
Authenticate user and create session.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword",
  "remember": true
}
```

**Response:** Redirects to `/index.html` on success

---

#### `GET /logout`
Destroy user session and log out.

**Response:** Redirects to `/index.html`

---

#### `GET /session-user`
Get current session user information.

**Response:**
```json
{
  "loggedIn": true,
  "email": "john@example.com",
  "first": "John",
  "last": "Doe"
}
```

Or if not logged in:
```json
{
  "loggedIn": false
}
```

---

### Product API Endpoints

#### `GET /api/products`
Get all products with optional filtering.

**Query Parameters:**
- `brand` (optional): Filter by brand name
- `limit` (optional): Limit number of results

**Example:**
```
GET /api/products?brand=Nike&limit=10
```

**Response:**
```json
[
  {
    "id": "nike-dunk-low",
    "title": "Nike Dunk Low",
    "brand": "Nike",
    "styleCode": "DD1391-100",
    "year": 2021,
    "condition": "Brand New",
    "colorway": "White / Black",
    "hero": "/assets/placeholder-shoe-nike.png",
    "sizes": [
      { "size": "7", "price": 170 },
      { "size": "8", "price": 180 }
    ]
  }
]
```

---

#### `GET /api/products/:productId`
Get a single product by ID with full details.

**Example:**
```
GET /api/products/nike-dunk-low
```

**Response:**
```json
{
  "id": "nike-dunk-low",
  "title": "Nike Dunk Low",
  "brand": "Nike",
  "styleCode": "DD1391-100",
  "year": 2021,
  "condition": "Brand New",
  "colorway": "White / Black",
  "hero": "/assets/placeholder-shoe-nike.png",
  "thumbs": [
    "/assets/placeholder-shoe-nike.png"
  ],
  "sizes": [
    { "size": "7", "price": 170 },
    { "size": "8", "price": 180 }
  ],
  "related": ["aj4-cool-grey", "nb-550"]
}
```

---

#### `GET /api/products/brand/:brand`
Get all products for a specific brand.

**Example:**
```
GET /api/products/brand/Nike
```

**Response:**
```json
[
  {
    "id": "nike-dunk-low",
    "title": "Nike Dunk Low",
    "brand": "Nike",
    "hero": "/assets/placeholder-shoe-nike.png",
    "minPrice": 170
  }
]
```

---

## Project Structure

```
group-project-ArthurVandross/
├── db/
│   ├── schema.sql          # Database schema
│   ├── seed.sql            # Seed data
│   ├── pool.js             # Database connection pool
│   ├── db.js               # Database connection (legacy)
│   └── index.js            # Database connection (legacy)
├── middleware/
│   └── auth.js             # Authentication middleware
├── routes/
│   ├── auth.js             # Authentication routes
│   └── products.js         # Product API routes
├── public/
│   ├── index.html          # Home page
│   ├── product.html        # Product detail page
│   ├── checkout.html       # Checkout page
│   ├── login.html          # Login page
│   ├── register.html       # Registration page
│   ├── api-client.js       # Front-end API client
│   ├── product-renderer.js # Product rendering utilities
│   ├── checkout.js         # Checkout logic
│   ├── script.js           # General scripts
│   ├── style.css           # Stylesheet
│   └── products/           # Product category pages
├── server.js               # Express server entry point
├── package.json            # Dependencies
├── .env.example            # Environment variables template
└── README.md               # This file
```

---

## Known Limitations

1. **Search Functionality**: Search bar is present but not yet implemented
2. **Order Processing**: Orders are not persisted to database (checkout clears cart only)
3. **Payment Integration**: No payment processing (demo only)
4. **Image Upload**: Product images are static placeholders
5. **User Profiles**: No user profile editing or order history
6. **Product Reviews**: No review/rating system
7. **Inventory Management**: No stock tracking or availability checks

---

## Contributors

- Team: ArthurVandross
- GitHub Repository: https://github.com/CSC317-F25/group-project-ArthurVandross

---

## License

ISC

---

## Milestone Tags

- `HTMLCSS` - Milestone 2 (HTML/CSS)
- `JSDB` - Milestone 3 (JavaScript + Database)
- `FINAL` - Milestone 4 (Final Full-Stack Integration)
