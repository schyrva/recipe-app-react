# Recipe App React

## Demo

Live Demo: [Recipe App React](https://recipe-app-react-one.vercel.app/)

## Author

Stanislav Chyrva - [LinkedIn](https://www.linkedin.com/in/stanislav-chyrva-3a3b24347/)

An application for searching and saving culinary recipes, created using React, TypeScript, Tailwind CSS, and TanStack Query.

## Project Structure

The project is built on Clean Architecture principles and follows best practices such as:

- **KISS** (Keep It Simple, Stupid)
- **DRY** (Don't Repeat Yourself)
- Modular architecture

### Folder Structure

```
src/
├── components/      # React components
│   ├── layout/      # Layout components (Layout, Navbar...)
│   └── recipe/      # Recipe-related components
├── constants/       # Application constants
│   ├── api.ts       # API-related constants
│   ├── ui.ts        # UI constants
│   └── index.ts     # Export point for all constants
├── hooks/           # Custom React hooks
│   ├── useFavorites.ts  # Hook for working with favorite recipes
│   ├── useMeals.ts      # Hooks for working with meals and API
│   └── index.ts         # Export point for all hooks
├── lib/             # Libraries and utilities
│   └── utils.ts     # Helper functions for working with CSS classes
├── pages/           # Page components
├── services/        # Services for working with API and other external systems
│   └── api/         # API services
│       ├── apiClient.ts    # Base client for HTTP requests
│       ├── mealService.ts  # Service for working with MealDB API
│       ├── types.ts        # API types
│       └── index.ts        # Export point for API services
├── types/           # TypeScript types
│   └── meal.ts      # Meal-related types
└── utils/           # Data processing utilities
    ├── mealUtils.ts # Utilities for working with meals
    └── index.ts     # Export point for all utilities
```

## Tech Stack

- **React** - library for building user interfaces
- **TypeScript** - statically typed JavaScript
- **TanStack Query** - library for query state management and caching
- **Axios** - HTTP client for making network requests
- **Tailwind CSS** - utility-first CSS framework
- **React Router** - library for routing in React applications
- **Vite** - fast development tool

## Patterns and Principles

### Service Layer

API requests are concentrated in the service layer, separating business logic from UI.

### Hooks for Business Logic

Reusable hooks for common functionality.

### Caching and State Management

TanStack Query is used for efficient query state management, caching, and background updates.

### Typing

Carefully defined TypeScript types to ensure code reliability.

## Running the Project

```bash
# Install dependencies
npm install

# Run development mode
npm run dev

# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## API Documentation

The application uses [The MealDB API](https://www.themealdb.com/api.php) to retrieve recipe data.
