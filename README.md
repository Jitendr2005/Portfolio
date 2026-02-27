# Portfolio - Full Stack Application

A modern portfolio website built with React (Frontend) and Express.js (Backend) with MongoDB database integration.

## 🚀 Features

### Frontend
- Modern React with TypeScript
- Beautiful UI with Tailwind CSS and shadcn/ui components
- Responsive design
- Dynamic content loading from API
- Smooth animations and transitions

### Backend
- Express.js REST API
- MongoDB Atlas database integration
- CRUD operations for certificates, skills, and projects
- CORS enabled for frontend integration
- Error handling middleware

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB Atlas account** (for cloud database) or **MongoDB Community** (for local database)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Portfolio
```

### 2. Frontend Setup

```bash
# Install frontend dependencies
npm install

# Start the frontend development server
npm run dev
```

The frontend will be available at `http://localhost:8080`

### 3. Backend Setup

```bash
# Navigate to server directory
cd server

# Install backend dependencies
npm install
```

### 4. Database Configuration

#### Option A: MongoDB Atlas (Recommended)

1. **Create MongoDB Atlas Account:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free account and cluster

2. **Get Connection String:**
   - In your Atlas dashboard, click "Connect"
   - Choose "Connect your application"
   - Copy the connection string

3. **Configure IP Whitelist:**
   - Go to "Network Access" in Atlas
   - Click "Add IP Address"
   - Add `0.0.0.0/0` for development (or your specific IP)

4. **Create Environment File:**
   ```bash
   cd server
   echo 'MONGODB_URI=mongodb+srv://username:password@your-cluster.mongodb.net/' > .env
   echo 'PORT=5000' >> .env
   ```
   
   **Replace with your actual values:**
   - `username`: Your MongoDB Atlas username
   - `password`: Your MongoDB Atlas password (URL-encode special characters)
   - `your-cluster.mongodb.net`: Your actual cluster URL

#### Option B: Local MongoDB

1. **Install MongoDB Community:**
   ```bash
   # macOS with Homebrew
   brew tap mongodb/brew
   brew install mongodb-community
   
   # Start MongoDB service
   brew services start mongodb-community
   ```

2. **Create Environment File:**
   ```bash
   cd server
   echo 'MONGODB_URI=mongodb://localhost:27017/portfolio' > .env
   echo 'PORT=5000' >> .env
   ```

### 5. Seed the Database

```bash
cd server
npm run seed
```

This will populate your database with sample data for certificates, skills, and projects.

### 6. Start the Backend Server

```bash
cd server
npm run dev
```

The backend API will be available at `http://localhost:5000`

## 🏃‍♂️ Running the Application

### Development Mode

1. **Start Backend (Terminal 1):**
   ```bash
   cd server
   npm run dev
   ```

2. **Start Frontend (Terminal 2):**
   ```bash
   npm run dev
   ```

3. **Access the Application:**
   - Frontend: `http://localhost:8080`
   - Backend API: `http://localhost:5000`

### Production Mode

1. **Build Frontend:**
   ```bash
   npm run build
   ```

2. **Start Backend:**
   ```bash
   cd server
   npm start
   ```

## 📡 API Endpoints

### Base URL: `http://localhost:5000/api`

### Certificates
- `GET /certificates` - Get all certificates
- `POST /certificates` - Create a new certificate
- `DELETE /certificates/:id` - Delete a certificate

### Skills
- `GET /skills` - Get all skills
- `POST /skills` - Create a new skill
- `DELETE /skills/:id` - Delete a skill

### Projects
- `GET /projects` - Get all projects
- `POST /projects` - Create a new project
- `DELETE /projects/:id` - Delete a project

## 📁 Project Structure

```
Portfolio/
├── src/
│   ├── components/ui/          # React components
│   │   ├── Skills.tsx         # Skills section
│   │   ├── Projects.tsx       # Projects section
│   │   └── ...
│   ├── services/
│   │   └── api.ts            # API service functions
│   └── ...
├── server/
│   ├── models/               # MongoDB models
│   │   ├── Certificate.js
│   │   ├── Skill.js
│   │   └── Project.js
│   ├── controllers/          # API controllers
│   │   ├── certificateController.js
│   │   ├── skillController.js
│   │   └── projectController.js
│   ├── routes/              # Express routes
│   │   ├── certificateRoutes.js
│   │   ├── skillRoutes.js
│   │   └── projectRoutes.js
│   ├── middleware/          # Express middleware
│   │   └── errorHandler.js
│   ├── database/           # Database utilities
│   │   └── connection.js
│   ├── seed.js            # Database seeding script
│   ├── index.js           # Main server file
│   └── package.json       # Backend dependencies
├── package.json           # Frontend dependencies
└── README.md
```

## 🔧 Available Scripts

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend Scripts
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run seed` - Seed database with sample data

## 🗄️ Database Models

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
  level: String (required), // Beginner, Intermediate, Expert
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

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error:**
   - Ensure MongoDB Atlas IP whitelist includes your IP
   - Check connection string format
   - URL-encode special characters in password

2. **Port Already in Use:**
   - Change PORT in server/.env file
   - Kill existing processes: `lsof -ti:5000 | xargs kill -9`

3. **Frontend Can't Connect to Backend:**
   - Ensure backend is running on correct port
   - Check CORS configuration
   - Verify API_BASE_URL in src/services/api.ts

4. **Database Seeding Fails:**
   - Check MongoDB connection
   - Ensure database user has write permissions
   - Verify connection string format

### Environment Variables

**Frontend (.env):**
```
VITE_API_BASE_URL=http://localhost:5000/api
```

**Backend (server/.env):**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
PORT=5000
```

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables in deployment platform

### Backend Deployment (Heroku/Railway)
1. Set environment variables in deployment platform
2. Ensure MongoDB Atlas IP whitelist includes deployment IP
3. Deploy the `server` folder

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request


## 🤝 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Open an issue on GitHub

---


