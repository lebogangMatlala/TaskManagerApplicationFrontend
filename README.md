# Task Manager Frontend (React + Vite)

This is the frontend for the Task Manager Application.  
It is built with **React** and **Vite**, and can be run locally or in Docker.

---

## Requirements

- Node.js 20.x
- npm 9+ (comes with Node 20)

> ⚠ Make sure Node version is 20 to avoid dependency conflicts.

---

## 1️⃣ Running Locally (Development)

1. Open terminal in this folder.
2. Install dependencies:

```bash
npm install

Start the development server:

npm run dev

Open your browser at:

http://localhost:5173

Any changes you make in src/ will auto-reload.

2️⃣ Build for Production

To create a production-ready build:

npm run build

The output will be in the /dist folder.

3️⃣ Running in Docker (Optional)

If you prefer to run the app in Docker:

Build the Docker image:

docker build -t taskmanager-frontend .

Run the Docker container:

docker run -p 3000:80 taskmanager-frontend

Open in browser:

http://localhost:3000

The Dockerfile is included in the repo and ready for production deployment.

4️⃣ Notes

The project uses Node 20 — do not use Node 22 or higher.

.dockerignore is included to speed up Docker builds.

No other setup is needed; this is production-ready.

5️⃣ Folder Structure
taskmanager-frontend/
├── public/           # Static assets
├── src/              # React source code
├── package.json      # Node dependencies
├── package-lock.json
├── Dockerfile        # Production Docker container
├── .dockerignore
└── README.md