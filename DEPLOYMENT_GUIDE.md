# FreelanceFinder deployment (Render + Netlify + MongoDB Atlas)

## Project layout
- Frontend: `Project Files/code/client` (Create React App)
- Backend: `Project Files/code/server` (Express, Mongoose, Socket.IO)

## 1. Create MongoDB Atlas database
1. Create a MongoDB Atlas cluster and a database user.
2. Configure Network Access to allow your Render service to connect. For a quick demo, `0.0.0.0/0` works but is broad; use fixed outbound IP restrictions when your hosting plan supports them.
3. Copy the Atlas connection string and replace its username/password. Keep it private.

## 2. Deploy backend to Render
1. Push this repository to GitHub.
2. In Render, create **New > Web Service** and connect the repository.
3. Root Directory: `Project Files/code/server`
4. Runtime: Node; Build Command: `npm install`; Start Command: `npm start`.
5. Add environment variables:
   - `MONGO_URI`: your complete MongoDB Atlas connection string
   - `CLIENT_URL`: your Netlify site origin (add this after frontend deployment; initially it may be `http://localhost:3000`)
6. Deploy. The backend health URL is the service root `/`, which should respond `FreelanceFinder API is running`.

## 3. Deploy frontend to Netlify
1. In Netlify, import the same GitHub repository.
2. Base directory: `Project Files/code/client`
3. Build command: `npm run build`
4. Publish directory: `build`
5. Add environment variable `REACT_APP_API_URL` with your Render service URL, e.g. `https://your-service.onrender.com` (no trailing slash).
6. Deploy. Netlify will provide a public `https://....netlify.app` address.

## 4. Finish CORS configuration
1. Copy the exact Netlify site origin (no path and no trailing slash).
2. Set Render's `CLIENT_URL` to that value.
3. Redeploy the backend.

## 5. Test
- Open the Netlify URL.
- Register a test Freelancer and a test Client.
- Log in, create a test project, place a test bid, and test project chat.
- Refresh nested routes such as `/freelancer`; `public/_redirects` provides the SPA fallback.
- Check Render logs and browser developer console if anything fails.

## Important security notice
This package is configured for deployment and avoids returning password hashes from registration/login responses. Public self-registration as `admin` has been disabled. However, this original application does **not** implement comprehensive server-side authentication/authorization for its data-changing API routes or Socket.IO events. Do not use it with real personal data, confidential projects, real payments, or as a production marketplace until proper authenticated sessions/tokens, role and ownership checks, input validation, rate limiting, and secure chat authorization are implemented and tested. The admin interface will require a separately secured administrator provisioning/authentication workflow before use.

## Local development
- Backend: from `Project Files/code/server`, run `npm install`, set `MONGO_URI` if needed, then `npm start`.
- Frontend: from `Project Files/code/client`, run `npm install`, set `REACT_APP_API_URL=http://localhost:6001`, then `npm start`.
