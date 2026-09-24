# Product Admin Dashboard

A responsive Product Admin Dashboard built with Next.js, React, Tailwind CSS, Axios, and DummyJSON API**.

The dashboard allows authenticated users to view, search, filter, sort, add, edit, and delete products.

##  Live Demo

Live Demo: `YOUR_DEPLOYED_VERCEL_URL`



## Tech Stack

- Next.js – React framework and routing
- React – UI development
- TypeScript – Type safety
- Tailwind CSS – Responsive styling
- Axios – API requests
- DummyJSON API – Authentication and product data


## Features

### Authentication

- Login using DummyJSON authentication API
- Test credentials:
  - Username: emilys
  - Password:emilyspass
- Displays an error for invalid credentials
- Stores authentication token in localStorage
- Protected product pages
- Logout functionality
- Prevents duplicate login requests

### Product Management

- View product list
- Responsive desktop table
- Responsive mobile product cards
- Product details page
- Add new products
- Edit existing products
- Delete products with confirmation
- Form validation
- Prevents duplicate save requests

### Search

- Search products using DummyJSON search API
- Debounced search input
- Automatically resets to page 1 when searching
- Search value is preserved in the URL
- Handles stale API responses so older requests cannot overwrite newer results

### Pagination

- Server-side pagination using limit and skip
- Page size options:
  - 10
  - 20
  - 50
- Previous and Next buttons
- Page numbers
- Displays the current result range

Example:
Showing 21–40 of 194