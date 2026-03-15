# Auth API (Node.js + JWT)

A secure authentication and authorization REST API built with **Node.js, Express, and MongoDB**.
This project demonstrates how modern backend systems handle **user authentication, protected routes, and role-based access control** using **JWT tokens**.

## Overview

Authentication is a core component of almost every backend system. This project implements a complete auth flow including:

* User registration
* Secure login
* Password hashing
* JWT-based authentication
* Protected routes
* Role-based authorization

The goal of this project is to demonstrate **backend security fundamentals** and how authentication fits into a real API architecture.

## Features

* User signup and login
* Password hashing with **bcrypt**
* **JWT token generation**
* Auth middleware for protected routes
* Role-based authorization (user/admin)
* MongoDB database integration
* Structured backend architecture

## Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JWT (JSON Web Tokens)**
* **bcrypt**

## API Endpoints

### Authentication

| Method | Endpoint         | Description                 |
| ------ | ---------------- | --------------------------- |
| POST   | /api/auth/signup | Register a new user         |
| POST   | /api/auth/login  | Login and receive JWT token |

### Protected Routes

| Method | Endpoint     | Description                       |
| ------ | ------------ | --------------------------------- |
| GET    | /api/profile | Access authenticated user profile |
| GET    | /api/admin   | Admin-only route                  |

## Authentication Flow

1. User registers with email and password.
2. Password is **hashed with bcrypt** before storing in the database.
3. User logs in with credentials.
4. Server validates credentials and generates a **JWT token**.
5. Client sends the token in the **Authorization header**.
6. Auth middleware verifies the token and allows access to protected routes.

## Installation

Clone the repository:

```
git clone https://github.com/yourusername/auth-api.git
```

Install dependencies:

```
npm install
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Start the server:

```
npm run dev
```

## Example Request

Login request:

```
POST /api/auth/login
```

```
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:

```
{
  "token": "jwt_token_here"
}
```

## Learning Goals

This project was built to better understand:

* Backend authentication architecture
* Token-based authentication (JWT)
* Middleware in Express
* Securing REST APIs
* Authorization patterns

## Future Improvements

* Refresh tokens
* Email verification
* Password reset functionality
* Rate limiting
* OAuth login (Google/GitHub)

## License

MIT

