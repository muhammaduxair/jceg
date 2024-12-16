# AI Job Cold Email Generator (This is not a Toy Project 😀)

AI Job Cold Email Generator is a web application that helps users create professional cold emails tailored for job applications using AI. The application is split into two parts: a **frontend** built with Next.js and a **backend** developed with FastAPI.

## Features
- Generate professional job cold emails using AI.
- Modern UI for user-friendly interaction.
- Secure API integration for data processing.

## Project Structure
```
jceg/
├── frontend/   # Next.js app
├── backend/    # FastAPI app
```

## Prerequisites
- Node.js (v20+)
- Python (v3.9+)
- Vercel CLI (for deployment)

## Installation
### Clone the Repository
```bash
git clone https://github.com/muhammaduxair/jceg.git
cd jceg
```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies: (I'm using `pnpm` project manager)
   ```bash
   pnpm install
   ```
3. Set up environment variables:
   - For development, use `.env.local`. Example:
     ```env
     NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1/
     ```
   - For production, create `.env.production`:
     ```env
     NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app
     ```
4. Start the development server:
   ```bash
   pnpm run dev
   ```
   The app will be available at `http://localhost:3000`.

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Set up environment variables:
   - Create a `.env` file with the following content:
     ```env
     GROQ_API_KEY=your_groq_api_key
     ALLOWED_ORIGINS=http://localhost:3000
     ```
 4. I'm using Groq Cloud for LLM. Visit [console.groq.com](https://console.groq.com) to create your API key.
4. Run the development server:
   ```bash
   uvicorn main:app --reload
   ```
   The API will be available at `http://localhost:8000`.

## Deployment

### Frontend Deployment (Vercel)
1. Navigate to the `frontend` directory.
2. Deploy using Vercel CLI:
   ```bash
   vercel login

   vercel --prod
   ```
3. Vercel will use your `.env.production` file during the build process.

### Backend Deployment (Vercel)
1. Navigate to the `backend` directory.
2. Ensure the `vercel.json` file is present with the following content:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "main.py",
         "use": "@vercel/python",
         "config": {
           "maxLambdaSize": "15mb",
           "runtime": "python3.9"
         }
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "main.py"
       }
     ],
     "env": {
       "GROQ_API_KEY": "API_KEY_HERE",
       "ALLOWED_ORIGINS": "YOUR_CLIENT_APP_URL"
     }
   }
   ```
3. Deploy using Vercel CLI:
   ```bash
   vercel login

   vercel --prod
   ```

## Notes
- The `.env.production` file for the frontend and the `.env` file for the backend should not be pushed to Git for privacy and security reasons.
- Always update your API key and allowed origins in the environment variables as required.
- For the backend app, the `vercel.json` file contains the environment variables for production.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
