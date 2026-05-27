# Noble Threads - React + Node Online Shopping Starter

This is a starter online shopping app inspired by stores like Souled Store.

## Tech stack

- Frontend: React + Vite + React Router + Axios
- Backend: Node.js + Express + MongoDB + JWT auth

## Project structure

- `frontend/` - React app
- `backend/` - Express API

## Run locally

1. Setup backend env:
   - Copy `backend/.env.example` to `backend/.env`
   - Update `MONGO_URI` and `JWT_SECRET`
   - Optionally set `CLIENT_ORIGIN=http://localhost:5173`
2. Install and run backend:
   - `cd backend`
   - `npm install`
   - `npm run dev`
3. Install and run frontend (new terminal):
   - `cd frontend`
   - `npm install`
   - `npm run dev`

## Deploy (GitHub + Render + Vercel)

1. Push code to GitHub:
   - `git init`
   - `git add .`
   - `git commit -m "Initial full-stack shopping app"`
   - `git branch -M main`
   - `git remote add origin https://github.com/<your-username>/<repo-name>.git`
   - `git push -u origin main`

2. Backend on Render:
   - New Web Service → connect the repo
   - Root directory: `backend`
   - Build command: `npm install`
   - Start command: `npm start`
   - Env vars:
     - `MONGO_URI` = your Atlas URI
     - `JWT_SECRET` = strong random string
     - `CLIENT_ORIGIN` = `https://<your-frontend>.vercel.app`

3. Frontend on Vercel:
   - New Project → same repo
   - Root directory: `frontend`
   - Env vars:
     - `VITE_API_BASE` = `https://<your-backend>.onrender.com/api`

4. Redeploy backend if you change `CLIENT_ORIGIN`.

## APIs included

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/orders`
- `GET /api/orders/my`

## Next features to add

- Admin panel for product/category management
- Payment gateway integration (Razorpay/Stripe)
- Wishlist and reviews
- Coupons, inventory tracking, order status updates
