# 🛒 E-Commerce Store

A modern and fully responsive E-Commerce web application built with **React.js** and **Vite**.

The application provides a complete shopping experience with user authentication, product browsing, advanced search capabilities, detailed product views, cart management, user profile management, and theme customization.

---

## 📑 Table of Contents

- [🛒 E-Commerce Store](#-e-commerce-store)
  - [📑 Table of Contents](#-table-of-contents)
  - [📖 Project Overview](#-project-overview)
  - [✨ Key Features](#-key-features)
    - [🔐 Authentication](#-authentication)
    - [🛍️ Product Management](#️-product-management)
    - [🛒 Shopping Cart](#-shopping-cart)
    - [👤 User Account Management](#-user-account-management)
    - [🎨 User Interface \& Experience](#-user-interface--experience)
  - [🎯 User Operations](#-user-operations)
    - [What Users Can Do](#what-users-can-do)
  - [🏗️ Architecture](#️-architecture)
    - [Service-Repository Pattern](#service-repository-pattern)
  - [💻 Technologies](#-technologies)
  - [📁 Project Structure](#-project-structure)

---

## 📖 Project Overview

This is a fully responsive E-Commerce frontend application developed using **React.js** with **Vite** as the build tool.

The application communicates with a RESTful API backend to handle all core E-Commerce operations. It follows a clean component-based architecture with a service-repository pattern to maintain separation of concerns and code reusability.

**Key Goals:**
- Clean, reusable component architecture
- Fully responsive and mobile-friendly UI
- Form validation and error handling
- Optimal performance with Vite
- User-friendly notifications and feedback
- Theme customization (Dark/Light mode)

---

## ✨ Key Features

### 🔐 Authentication

- **User Registration (Sign Up)**: Create a new account with email validation
  - Input validation for all required fields
  - Password strength requirements
  - Secure account creation

- **User Login (Sign In)**: Authenticate using email and password
  - Token-based authentication (JWT)
  - token storage in local storage
  - Automatic session management
  - Persistent login state

- **Password Recovery**: Multi-step password reset flow
  - Request password reset via email
  - Receive and verify reset code
  - Set new password securely
  - Clear error messaging throughout the process

- **Change Password**: Authenticated users can update their password
  - Accessible from Settings page
  - Current password verification required
  - New password confirmation
  - Secure password update

- **Logout**: Securely terminate user session
  - Remove authentication token
  - Clear user session data
  - Redirect to login page

### 🛍️ Product Management

- **Product Catalog**: Browse all available products
  - View all products in a responsive grid
  - Product information display (name, price, rating, category)
  - Discount information when available
  - Product images and descriptions

- **Product Search**: Find products by title
  - Real-time search functionality
  - Search based on product title
  - Quick filtering of product catalog

- **Product Details**: Comprehensive product information page
  - Full product description
  - Detailed product specifications
  - High-quality product images
  - Product rating and reviews
  - Price and discount information
  - Add to cart functionality from details page

### 🛒 Shopping Cart

- **Add Products to Cart**: Select quantity and add items
  - Add individual products

- **View Cart**: Dedicated cart page showing all items
  - List of all items in cart
  - Product quantity and price per item
  - Total cart price calculation
  - Order summary display

### 👤 User Account Management

- **View Profile**: Access user information
  - Display current account details
  - Email and personal information

- **Update User Data**: Modify account information
  - Update personal information
  - Modify email (if applicable)
  - Save changes securely

- **Settings Page**: Centralized account management
  - Change password option
  - Update profile information
  - Theme preferences
  - Account security options

### 🎨 User Interface & Experience

- **Dark/Light Mode**: Theme customization

- **Responsive Design**: Optimal viewing on all devices

- **User Notifications**:

- **Loading States**: Visual feedback during operations

---

## 🎯 User Operations

### What Users Can Do

1. **Register a New Account**

2. **Login to Account**

3. **Browse Products**

4. **Search Products**

5. **View Product Details**
   
6. **Add Products to Cart**

7. **Manage Shopping Cart**

8.  **Manage Account**

9.  **Switch Theme**

10. **Logout**

---

## 🏗️ Architecture

### Service-Repository Pattern

The application uses a structured approach to API communication:

- **Services**: Handle API requests and responses
- **Repository**: Centralize data operations and business logic
- **Components**: Consume services and manage UI state
- **Utilities**: Provide helper functions and formatting

This separation ensures:
- Easy to test and maintain code
- Reusable service logic
- Clean component structure
- Centralized error handling

---

## 💻 Technologies

**Frontend Framework:**
- React.js
- Vite (Build tool)

**Styling & UI:**
- CSS3
- Responsive design
- Bootstrap

**API Communication:**
- Axios (HTTP client) and optimize the performance using axios interceptor
- REST API integration

**Form Handling & Validation:**
- Input validation schemas
- Error message display

**Development:**
- ES6+
- Modern JavaScript
- Component-based architecture

---

## 📁 Project Structure

```
final-project/
├── src/
│   ├── api/                          # API communication layer
│   │   ├── axios.js                 # Axios instance setup
│   │   ├── private_api.js           # Protected API requests
│   │   └── public_api.js            # Public API requests
│   │
│   ├── components/                   # Reusable React components
│   │   ├── appearance/              # Theme toggle component
│   │   ├── cart-item/               # Individual cart item display
│   │   ├── change-password/         # Password change form
│   │   ├── is-empty-cart/           # Empty cart message
│   │   ├── main-navbar/             # Main navigation bar
│   │   ├── no-products-found/       # No products message
│   │   ├── order-summary/           # Order summary display
│   │   ├── product-card/            # Product card component
│   │   ├── shared-components/       # Shared UI components
│   │   │   ├── appbutton/          # Custom button component
│   │   │   └── is-loading/         # Loading spinner
│   │   └── update-user-data/        # User data update form
│   │
│   ├── layouts/
│   │   └── RootLayout.jsx           # Main layout wrapper
│   │
│   ├── pages/                        # Page components
│   │   ├── auth/
│   │   │   ├── forget-password/    # Password recovery page
│   │   │   ├── reset-password/     # Reset password page
│   │   │   ├── settings/           # User settings page
│   │   │   ├── signin/             # Login page
│   │   │   ├── signup/             # Registration page
│   │   │   └── verify-reset-code/  # Reset code verification
│   │   ├── cart/
│   │   │   └── UserCart.jsx        # Shopping cart page
│   │   └── products/
│   │       ├── ProductDetails.jsx  # Product detail page
│   │       └── Products.jsx        # Products catalog page
│   │
│   ├── routes/
│   │   └── routes.jsx              # Route definitions
│   │
│   ├── schemas/
│   │   └── validations/
│   │       └── auth/               # Form validation schemas
│   │           ├── change_password_schema.js
│   │           ├── reset_password_schema.js
│   │           ├── signup_schema.js
│   │           └── update_user_data_schema.js
│   │
│   ├── services/                    # Business logic & API calls
│   │   ├── services-repository.js  # Main service handler
│   │   ├── cart/                   # Cart operations
│   │   │   ├── add_to_cart.js
│   │   │   ├── cart_repository.js
│   │   │   └── get_logged_user_cart.js
│   │   ├── products/               # Product operations
│   │   │   ├── get_all_products.js
│   │   │   ├── get_specific_product.js
│   │   │   └── products_repository.js
│   │   └── user-auth/              # Authentication operations
│   │       └── auth/
│   │           ├── auth_repository.js
│   │           ├── change_password.js
│   │           ├── forget_password.js
│   │           ├── reset_password.js
│   │           ├── signin.js
│   │           ├── signup.js
│   │           ├── update_user_data.js
│   │           └── verify_reset_code.js
│   │
│   ├── utilities/                   # Helper functions
│   │   ├── utilities-repository.js
│   │   └── helpers/
│   │       ├── alerts.js           # Notification helpers
│   │       ├── formatPrice.js      # Price formatting
│   │       └── formatTitle.js      # Title formatting
│   │
│   ├── assets/                      # Static assets
│   │   └── images/
│   │
│   ├── App.jsx                      # Main App component
│   ├── index.css                    # Global styles
│   └── main.jsx                     # Application entry point
│
├── public/                           # Static public files
├── index.html                        # HTML entry point
├── vite.config.js                   # Vite configuration
├── eslint.config.js                 # ESLint configuration
├── vercel.json                      # Vercel deployment config
├── package.json                     # Project dependencies
└── README.md                         # Project documentation
```