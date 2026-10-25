# Portfolio Frontend

The frontend for a modern, content-managed developer portfolio. It provides a responsive public portfolio experience and a protected administration portal for maintaining projects, skills, professional experience, education, contact messages, and CV content.

## Overview

The application is built with React and Vite and communicates with a separate REST API through Axios.

### Public portfolio

- Hero, projects, skills, experience, education, and contact sections
- Responsive layout with light and dark themes
- Language switching powered by a shared translation context
- CV download support
- Client-side routing with a dedicated not-found page

### Administration portal

- JWT-based admin sign-in
- Protected dashboard at `/admin/dashboard`
- CRUD management for projects, skills, experience, and education
- Contact message management
- CV management
- Authenticated API requests with credentials and an admin bearer token

## Technology stack

- React 19
- Vite
- React Router
- Axios
- Tailwind CSS and daisyUI
- Framer Motion
- Lucide React

## Requirements

- Node.js 18 or newer
- npm 9 or newer
- A running backend API that exposes the endpoints used by the application

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file:

   ```bash
   Copy-Item .env.example .env
   ```

3. Set the backend API URL in `.env`:

   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

   The `/api` path is part of the expected value. `VITE_API_URL` is also supported for backward compatibility, but `VITE_API_BASE_URL` is preferred.

4. Start the development server:

   ```bash
   npm run dev
   ```

   Vite will print the local URL in the terminal.

## Application routes

| Route | Purpose | Access |
| --- | --- | --- |
| `/` | Public portfolio | Public |
| `/admin/login` | Administrator sign-in | Public |
| `/admin/dashboard` | Portfolio content management | Authenticated |

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

## Production deployment

This project is configured for deployment on Vercel.

1. Import the repository into Vercel.
2. Select **Vite** as the framework if it is not detected automatically.
3. Configure the production environment variable:

   ```env
   VITE_API_BASE_URL=https://api.example.com/api
   ```

4. Deploy the project. The production build command is `npm run build`, and the output directory is `dist`.

The included `vercel.json` rewrites requests to `index.html` so React Router routes work correctly after deployment.

## Backend integration

The backend must:

- Allow the deployed frontend origin in its CORS configuration
- Support credentialed requests from that exact origin
- Expose the portfolio, authentication, contact, and CV endpoints expected by the frontend
- Accept the admin JWT in the `Authorization` header for protected operations

Do not place backend secrets in `VITE_*` variables. Vite embeds these values into the browser bundle, so only public configuration belongs in the frontend environment.

## Validation

Run the project checks before submitting changes:

```bash
npm run lint
npm run build
```
