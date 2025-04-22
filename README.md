News & User Preferences API

📌 Overview

This API provides authentication, user preference management, and news fetching capabilities. Users can:

Register and log in securely.

Get and update their news preferences.

Fetch news from an external API based on their preferences.

🛠️ Tech Stack

Node.js with Express.js

MongoDB with Mongoose

bcrypt for password hashing

jsonwebtoken (JWT) for authentication

axios for fetching external news

🚀 API Endpoints

🔹 User Authentication

1️⃣ Register a New User

Endpoint: POST /users/register

2️⃣ User Login

Endpoint: POST /users/login

🔹 User Preferences

3️⃣ Get User Preferences (Protected Route)

Endpoint: GET /users/preferences

4️⃣ Update User Preferences (Protected Route)

Endpoint: PUT /users/preferences

🔹 Fetch News from External API

5️⃣ Get News Based on User Preferences (Protected Route)

Endpoint: GET /users/news


🔑 Authentication & Security

Passwords are securely hashed using bcrypt.

JWT (JSON Web Tokens) are used for secure authentication.

Middleware verifies tokens before accessing protected routes.

🛠️ Setup & Installation

Clone this repository

Install dependencies

Create a .env file and add:

PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

NEWS_API_KEY=your_news_api_key

Run the server
