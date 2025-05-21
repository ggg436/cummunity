# Turso Database Setup with Vercel

This guide explains how to connect your application to Turso database using Vercel for deployment.

## Local Development

1. Install dependencies:
   ```
   npm install
   ```

2. Start the local API server:
   ```
   npm run server
   ```

3. In a separate terminal, start the development server:
   ```
   npm run dev
   ```

4. Visit http://localhost:8080/turso-test to check the database connection

## Deploying to Vercel

1. Push your code to a GitHub repository

2. Sign up for Vercel and import your repository:
   - Go to [vercel.com](https://vercel.com)
   - Connect your GitHub account
   - Import your repository

3. Add environment variables:
   - In your project settings, add these environment variables:
     - `TURSO_DATABASE_URL`: `libsql://community-communityi.aws-ap-south-1.turso.io`
     - `TURSO_AUTH_TOKEN`: Your Turso auth token

4. Deploy your application:
   - Vercel will automatically detect your Vite + React app
   - The API routes in the `/api` directory will be deployed as serverless functions
   - Your frontend will be built and deployed as static assets

5. Visit your deployed site and go to `/turso-test` to verify the database connection

## Project Structure

- `/api/db.js` - API endpoint that connects to Turso
- `/src/TursoTest.jsx` - React component that tests the database connection
- `.env` - Local environment variables (not committed to Git)
- `vercel.json` - Configuration for Vercel deployment
- `server.js` - Local development server for testing API endpoints

## Security Notes

- Never commit your `.env` file to Git
- Rotate your Turso auth token if it was ever exposed
- Use Vercel's environment variables for secure credential storage 