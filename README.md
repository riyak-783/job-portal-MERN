
# Job Portal Website

This is a MERN stack job portal website where users can upload resumes, and employers can post jobs. The project includes user authentication, allowing users to register and log in. The backend is hosted on Render, and the frontend is hosted on Netlify.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Hosting](#hosting)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features

- User registration and login with JWT authentication
- Upload and manage resumes
- Job posting and management for employers
- Responsive design
- Secure routes for protected pages

## Technologies Used

- **Frontend:** React, Redux, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Hosting:** 
  - Backend: [Render](https://render.com/)
  - Frontend: [Netlify](https://www.netlify.com/)

## Getting Started

### Prerequisites

- Node.js and npm installed on your local machine
- MongoDB instance running locally or on a cloud provider

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/job-portal.git
   cd job-portal
   ```

2. **Install dependencies for the backend:**
   ```bash
   cd backend
   npm install
   ```

3. **Install dependencies for the frontend:**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Project

1. **Set up environment variables:**

   Create a `.env` file in the `backend` directory with the following variables:

   ```env
   PORT=5000
   MONGO_URI=your-mongo-db-uri
   JWT_SECRET=your-jwt-secret
   ```

2. **Run the backend server:**

   ```bash
   cd backend
   npm start
   ```

3. **Run the frontend development server:**

   ```bash
   cd ../frontend
   npm start
   ```

4. **Access the application:**

   Open your browser and go to `http://localhost:3000`.

## Project Structure

```bash
job-portal/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── ...
└── frontend/
    ├── src/
    ├── public/
    ├── App.js
    └── ...
```

## Hosting

- **Backend:** Hosted on Render at [your-backend-url]([https://your-backend-url](https://mern-job-portal-rzw0.onrender.com))
- **Frontend:** Hosted on Netlify at [your-frontend-url]([https://your-frontend-url](https://jobportal-mern.netlify.app/))

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [MERN Stack](https://www.mongodb.com/mern-stack)
- [Render](https://render.com/)
- [Netlify](https://www.netlify.com/)

---

You can customize this template further as needed.
