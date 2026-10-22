# Portfolio Frontend

React and Vite client for the portfolio and admin dashboard.

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` to the backend API URL, including the `/api` path.

3. Start the development server:

   ```bash
   npm run dev
   ```

## Deploying to Vercel

1. Import this repository into Vercel.
2. Keep the detected framework as **Vite**. The build command is `npm run build` and the output directory is `dist`.
3. Add this Vercel environment variable for the **Production** environment:

   ```
   VITE_API_BASE_URL=https://your-backend-domain.example/api
   ```

4. Redeploy after saving the variable. `vercel.json` handles client-side route fallback for the React Router pages.

The backend must allow the deployed frontend origin in its CORS configuration. Because the client sends credentials and an admin bearer token, the backend must also support credentialed requests from that exact origin. Never put backend secrets in `VITE_*` variables; Vite embeds them in the browser bundle.

## Checks

```bash
npm run lint
npm run build
```
