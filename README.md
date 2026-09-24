# Product Admin Dashboard

A responsive Product Admin Dashboard built with Next.js, React, Tailwind CSS, Axios, and DummyJSON API**.

The dashboard allows authenticated users to view, search, filter, sort, add, edit, and delete products.

##  Live Demo

Live Demo: https://product-admin-dashboard-r3fu.vercel.app/login



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



# A short note explaining your choices, one problem you faced and how you fixed it, and where AI helped you.
I chose Next.js, React, Tailwind CSS, and Axios because they provided a simple structure for building a responsive dashboard, handling API requests, and managing routing. I used DummyJSON for authentication and product data.

One problem I faced was with search requests. When users searched quickly, an older API response could overwrite a newer result. I solved this by adding debouncing and request tracking so only the latest request updates the product list.

I used AI to understand Next.js concepts, debug errors, improve the implementation, and review my approach.