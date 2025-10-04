# Project Overview

### This repository contains a full-stack sample app demonstrating a responsive React.js frontend integrated with a lightweight backend (Node.js + Express). It implements JWT-based authentication, protected dashboard routes, CRUD for a sample entity (e.g., tasks), client + server validation, and basic security best-practices.

<img width="1920" height="1080" alt="Screenshot (35)" src="https://github.com/user-attachments/assets/06f11c3e-caa4-4619-b4b5-f809aa1f047d" />

# Tech Stack
- Frontend: React, TailwindCSS
- Backend: Node.js + Express
- Database: MongoDB (Atlas)
- Auth: JWT for access tokens
- Password hashing: bcrypt
- Dev tools: Postman, ESLint, Prettier, nodemon


```
/repo-root
├─ /frontend
│  ├─ /src
│  │  ├─ /components
│  │  ├─ /pages 
│  │  ├─ /services (api wrappers)
│  │  └─ /context
│  └─ package.json
├─ /backend
│  ├─ /src
│  │  ├─ /controllers
│  │  ├─ /routes
│  │  ├─ /models
│  │  ├─ /middleware
│  │  └─ /utils
│  │  └─ .env
│  └─ package.json
└─ README.md
```

## Getting Started (local) - Prerequisites

- Node.js
- MongoDB (local or Atlas)
- Postman (optional)

```
git clone https://github.com/<your-org>/<repo-name>.git
cd <repo-name>
```

# backend steup
- cd backen
- npm i mongoose express dotenv jsonwebtoken bcryptjs nodemon
- Put all below envirmentale variable in env
- node index.js or npx nodemon index.js
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/mydb?retryWrites=true&w=majority
JWT_SECRET=super-secret-jwt-key
```

# Frontend
- cd frontend
- npm i react-router-dom lucide-react
- npm run dev (To Sart)



