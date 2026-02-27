# Portfolio Backend API

A Node.js/Express.js backend API for managing portfolio data including certificates, skills, and projects.

## Features

- RESTful API endpoints for certificates, skills, and projects
- MongoDB database integration with Mongoose ODM
- CORS enabled for frontend integration
- Error handling middleware
- Environment variable configuration

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the server directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/portfolio
   PORT=5000
   ```

3. Make sure MongoDB is running on your system

4. Seed the database with initial data:
   ```bash
   npm run seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Certificates
- `GET /api/certificates` - Get all certificates
- `POST /api/certificates` - Create a new certificate
- `DELETE /api/certificates/:id` - Delete a certificate

### Skills
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Create a new skill
- `DELETE /api/skills/:id` - Delete a skill

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create a new project
- `DELETE /api/projects/:id` - Delete a project

## Data Models

### Certificate
```javascript
{
  title: String (required),
  issuer: String (required),
  date: Date (required),
  description: String,
  url: String
}
```

### Skill
```javascript
{
  name: String (required),
  level: String (required),
  category: String
}
```

### Project
```javascript
{
  name: String (required),
  description: String,
  url: String,
  image: String,
  techStack: [String],
  github: String
}
```

## Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm run seed` - Seed the database with initial data 