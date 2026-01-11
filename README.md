# Todo React App

A modern, full-featured todo application built with React, TypeScript, Vite, and Tailwind CSS. This app helps users manage their tasks with user authentication, categorization, and intuitive dashboard insights.

## Features

- **User Authentication**: Sign up and login functionality
- **Todo Management**: Create, view, and organize todos
- **Task Status Tracking**: Monitor tasks by status (New, In Progress, Completed)
- **Dashboard**: Visual analytics with charts and statistics
- **Favorites**: Mark and manage favorite todos
- **Emoji Support**: Add emojis to todos for better organization
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Real-time Notifications**: Toast notifications for user feedback

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Charts**: Recharts
- **UI Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Emoji Picker**: emoji-picker-react

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Build for production:
```bash
npm run build
```

### Preview

Preview the production build:
```bash
npm run preview
```

### Linting

Run ESLint:
```bash
npm run lint
```

## Project Structure

- `src/pages/` - Application pages (Login, Signup, Home, Items)
- `src/components/` - Reusable components
- `src/context/` - React Context for state management
- `src/hooks/` - Custom React hooks
- `src/util/` - Utility functions and API configuration
- `public/` - Static assets

## Available Routes

- `/` - Login page (default)
- `/login` - Login page
- `/signup` - Sign up page
- `/dashboard` - Main dashboard with stats and favorites
- `/todo-items` - Todo items list view
