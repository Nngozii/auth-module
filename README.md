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

## Installation

Clone the repository:

```
git clone https://github.com/Nngozii/auth-module.git
```

Install dependencies:

```
npm install
```

Create a `.env` file:

```
PORT=5000 // example
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Start the server:

```
npm start
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
* OAuth login (Google/GitHub)

