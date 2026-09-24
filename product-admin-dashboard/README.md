# Product Admin Dashboard

A responsive Product Admin Dashboard built with Next.js, React, TypeScript, Tailwind CSS, Axios, and DummyJSON.
The dashboard provides authentication, protected routes, product listing, pagination, and a structured API service layer.

## Live Demo


## GitHub Repository




## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios
- DummyJSON API


## Features

# Authentication

- Login using DummyJSON authentication API
- Username and password validation
- Error handling for invalid credentials
- Prevent duplicate login requests
- Access token stored in localStorage
- Global authentication state using React Context
- Protected product dashboard
- Logout functionality

# Product Management

- Product listing
- Desktop table layout
- Responsive mobile card layout
- Product image
- Product title
- Category
- Price
- Rating
- Stock

# Pagination

- API-based pagination using limit and skip
- Previous and Next buttons
- Page number navigation
- Page size selection
- 10, 20, and 50 products per page
- Display of current item range

# API Architecture

The API logic is separated from UI components.

Component
    ↓
Service
    ↓
Shared Axios Instance
    ↓
DummyJSON API