# Resume Forge Backend

## Overview
Resume Forge Backend is a RESTful API built with **Node.js**, **Express.js**, and **Prisma ORM**, designed to handle authentication, resume creation, AI-powered resume generation, and user management. It integrates **Firebase Authentication** and **OpenAI** for advanced functionalities.

## Features
- User authentication via **Firebase Authentication** (Google & Email/Password login).
- CRUD operations for resumes.
- AI-powered resume generation via OpenAI.
- Secure authentication middleware.

## Tech Stack
- **Node.js** (Runtime environment)
- **Express.js** (Backend framework)
- **Prisma ORM** (Database management)
- **PostgreSQL** (Database)
- **Firebase Authentication** (User authentication)
- **OpenAI API** (AI-powered resume generation)

---
## Installation
### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- Firebase project setup

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/resume-forge-backend.git
   cd resume-forge-backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Setup environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   JWT_SECRET=your_jwt_secret_key
   OPENAI_API_KEY=your_openai_api_key
   FIREBASE_ADMIN_KEY=your_firebase_admin_key
   ```
4. Run database migrations:
   ```sh
   npx prisma migrate dev --name init
   ```
5. Start the development server:
   ```sh
   npm run dev
   ```

---
## Project Structure
```
resume-forge-backend/
├── prisma/               # Database schema & migrations
│   ├── schema.prisma     # Prisma schema
├── src/
│   ├── controllers/      # Request handlers
│   │   ├── aiController.ts
│   │   ├── authController.ts
│   │   ├── resumeController.ts
│   ├── middleware/       # Authentication middleware
│   │   ├── authMiddleware.ts
│   │   ├── firebaseAuthMiddleware.ts
│   ├── routes/           # API routes
│   │   ├── aiRoutes.ts
│   │   ├── authRoutes.ts
│   │   ├── resumeRoutes.ts
│   ├── utils/            # Utility functions & clients
│   │   ├── firebase.ts
│   │   ├── firebaseAdmin.ts
│   │   ├── openaiClient.ts
│   ├── app.ts            # Express application setup
├── .env                  # Environment variables
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── README.md             # Documentation
```

---
## API Endpoints
### Authentication
- **POST** `/auth/register` - Register a new user using Firebase Authentication.
- **POST** `/auth/login` - Login user and return JWT token.

### Resume Management
- **POST** `/resume/create` - Create a new resume.
- **GET** `/resume/all` - Retrieve all resumes for the authenticated user.
- **GET** `/resume/:id` - Retrieve a specific resume.
- **PUT** `/resume/:id/update` - Update a resume.
- **DELETE** `/resume/:id/delete` - Delete a resume.

### AI Integration
- **POST** `/ai/generate-resume` - Generate a resume using OpenAI.

---
## Contributing
1. Fork the repository.
2. Create a new feature branch: `git checkout -b feature-branch`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature-branch`
5. Open a pull request.

---
## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

