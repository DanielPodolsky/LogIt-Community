# LogIt-Community 📝

A backend-focused community blog platform built as part of a learning journey. This project serves as a practical exploration of Node.js backend development and RESTful API design.

## 🎯 About

LogIt-Community is a **backend-only** project that provides the API infrastructure for a community blogging platform. It was developed to strengthen my understanding of server-side architecture, authentication flows, and database modeling.

## 🚀 Features

- **👤 User Authentication**: Register, login, and password reset functionality
- **📋 Post Management**: Create, read, update, and delete blog posts
- **🏷️ Tag System**: Categorize posts with tags for better organization
- **👑 Admin Controls**: Special privileges for community administrators

## 💻 Tech Stack

### Backend Framework
- **[Node.js](https://nodejs.org/)** - JavaScript runtime
- **[Express](https://expressjs.com/)** - Web framework

### Database
- **[MongoDB](https://www.mongodb.com/)** - NoSQL database
- **[Mongoose](https://mongoosejs.com/)** - ODM for MongoDB

### Authentication & Security
- **[JWT](https://jwt.io/)** - Secure authentication
- **[Bcrypt](https://github.com/kelektiv/node.bcrypt.js)** - Password hashing
- **[DOMPurify](https://github.com/cure53/DOMPurify)** & **[JSDOM](https://github.com/jsdom/jsdom)** - Content sanitization

### Validation
- **[Joi](https://joi.dev/)** - Schema validation
- **[Joi-ObjectId](https://www.npmjs.com/package/joi-objectid)** - MongoDB ObjectId validation

### Utilities
- **[Nodemailer](https://nodemailer.com/)** - Email functionality
- **[Nodemon](https://nodemon.io/)** - Development auto-restart
- **[dotenv](https://github.com/motdotla/dotenv)** - Environment management

## 🧠 Learning Outcomes

This project helped me gain hands-on experience with:
- Designing RESTful APIs
- Implementing secure authentication flows
- Data validation and sanitization
- MongoDB schema design
- Middleware patterns in Express
- Environment configuration

## 🔧 Getting Started

1. Clone the repository
   ```
   git clone https://github.com/DanielPodolsky/LogIt-Community.git
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   MongoDB_USERNAME=your_mongodb_username
   MongoDB_PASSWORD=your_mongodb_password
   MongoDB_CLUSTER=your_mongodb_cluster
   MongoDB_OPTIONS=your_mongodb_options
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server
   ```
   npm start
   ```
   
   For development with auto-restart:
   ```
   npm run dev
   ```

## 📡 API Endpoints

### 🔐 Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/forgot-password/:token` - Reset password with token

### 📝 Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/me` - Get current user's posts
- `GET /api/posts/tags?tags=id1,id2` - Get posts by tags
- `POST /api/posts` - Create a new post
- `PATCH /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post

### 🏷️ Tags
- `POST /api/tags` - Create a new tag (admin only)

*This project was built with ❤️ as a learning exercise. Feel free to explore and build upon it!*
