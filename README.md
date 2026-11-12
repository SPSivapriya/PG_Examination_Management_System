# PG Examination Management System

## Overview

The PG Examination Management System is a web-based application developed to simplify and manage postgraduate examination activities within an educational institution.

The application provides a centralized platform for managing examination-related information through three role-based modules: Admin, Faculty, and Head of Department (HoD).

Each user is provided with access to specific functionalities based on their role, helping streamline academic administration, reduce manual work, and improve coordination between departments.

## Key Features

### 1. Admin Module
- Manage faculty and student information.
- Manage user accounts and access permissions.
- Oversee examination-related activities.
- Monitor overall system operations.

### 2. Faculty Module
- Access faculty-specific dashboard.
- Manage examination-related academic information.
- View relevant student and examination records.
- Perform assigned examination activities.

### 3. Head of Department (HoD) Module
- Access department-level information.
- Monitor examination activities within the department.
- Oversee faculty-related academic operations.
- Review examination-related information.

## Technology Stack

**Frontend**
- React.js
- JavaScript
- Ant Design
- Tailwind CSS
- React Router
- Axios

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB
- Mongoose

**Authentication and Security**
- JSON Web Tokens (JWT)
- bcryptjs

**Additional Libraries**
- html2pdf.js
- Moment.js
- date-fns

## Project Structure

The project is organized into separate frontend and backend directories.

```text
PG_Examination_Management_System/
│
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── package.json
│
├── package.json
└── README.md
```

*The structure above illustrates the intended organization; adjust the folder names to match the actual repository.*

## Installation and Setup

### Prerequisites

- Node.js
- npm
- MongoDB
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/SPSivapriya/PG_Examination_Management_System.git
```

```bash
cd PG_Examination_Management_System
```

### 2. Install Dependencies

Navigate to the frontend and backend directories and install their dependencies.

```bash
cd frontend
npm install
```

```bash
cd ../backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the backend directory and configure the required environment variables.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Use the actual variable names expected by the application.

### 4. Run the Application

Start the backend server:

```bash
cd backend
npm start
```

Start the frontend in a separate terminal:

```bash
cd frontend
npm run dev
```

The frontend and backend commands may need adjustment according to the scripts defined in their respective package.json files.

## Application Workflow

1. Users access the application through the login interface.
2. The system authenticates users and identifies their roles.
3. Based on the assigned role, users are redirected to their respective dashboards.
4. Admin, Faculty, and HoD users access their permitted examination management functionalities.
5. The application communicates with the backend through APIs and stores relevant information in MongoDB.

## Learning Outcomes

Through this project, the following concepts and skills were applied:

- Full-stack web application development using the MERN stack.
- Role-based authentication and authorization.
- REST API development and integration.
- MongoDB database operations using Mongoose.
- Frontend development with reusable React components.
- Managing application navigation and user access.
- Integration of frontend and backend services.

## Future Enhancements

- Automated examination scheduling.
- Advanced examination result analytics.
- Notification and reminder system.
- Improved reporting and downloadable examination reports.

## Author

**Sivapriya S**

GitHub: [SPSivapriya](https://github.com/SPSivapriya)

## License

This project is intended for educational and academic purposes.
