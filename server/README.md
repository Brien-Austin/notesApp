# Personal Notes Maker - Server

A robust backend API for the Personal Notes Maker application, built with Node.js, Express, and MongoDB. This server handles user authentication, note management, and bookmarking functionality.

## 🚀 Features

- 🔐 JWT-based authentication
- 📝 Create, read, update, and delete notes
- 🔖 Bookmark management with web scraping capabilities
- 🛡️ Secure password hashing with bcryptjs
- 🗃️ MongoDB for data persistence
- 🌐 CORS enabled for cross-origin requests
- 🚀 Built-in development server with hot-reloading

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: [JWT (JSON Web Tokens)](https://jwt.io/)
- **Web Scraping**: [Puppeteer](https://pptr.dev/) and [Cheerio](https://cheerio.js.org/)
- **Security**: [bcryptjs](https://www.npmjs.com/package/bcryptjs) for password hashing
- **Development**: [Nodemon](https://nodemon.io/) for hot-reloading

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or later
- npm 8.x or later
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Brien-Austin/notesApp.git
   cd personal_notes_maker/server
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the server root directory with the following variables:
   ```env
   PORT=3001
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

4. Start the development server
   ```bash
   npm start
   ```
   The server will be available at `http://localhost:3001`

## 📁 Project Structure

```
/server
  /auth               # Authentication controllers and routes
  /bookmarks          # Bookmark management logic
  /common             # Shared utilities and middleware
  /config             # Configuration files
  /constants          # Application constants
  /middleware         # Custom Express middleware
  /notes              # Note management logic
  /utils              # Helper functions
  index.js            # Main application entry point
```

## 🛠️ Development

### Available Scripts

- `npm start` - Start the development server with hot-reloading

### Environment Variables

- `PORT` - Port on which the server will run (default: 3001)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token generation
- `NODE_ENV` - Application environment (development/production)

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile (protected)

#### Notes
- `GET /api/notes` - Get all notes for the authenticated user
- `POST /api/notes` - Create a new note
- `GET /api/notes/:id` - Get a specific note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note
- `POST /api/notes/:id` - Make a note favourite
- `GET /api/notes/tags` - Get all tags for the authenticated user
- `GET /api/notes/stats` - Get all stats for the authenticated user

#### Bookmarks
- `GET /api/bookmarks` - Get all bookmarks for the authenticated user
- `POST /api/bookmarks` - Create a new bookmark
- `GET /api/bookmarks/:id` - Get a specific bookmark
- `DELETE /api/bookmarks/:id` - Delete a bookmark
- `POST /api/bookmarks/:id` - Make a bookmark favouritef

#### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh-token` - Refresh access token

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT Documentation](https://jwt.io/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
