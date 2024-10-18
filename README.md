# Healthcare Dashboard

This project is a Healthcare Dashboard application with a React frontend built using Vite and a Node.js backend. It provides patient management features and secure authentication.

## Project Structure

```
healthcare-dashboard/
├── dashboard/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   └── index.ts
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Installation

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd dashboard
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Configuration

1. In the backend directory, create a `.env` file with the following content:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string ( i have given for testing purpose )
   JWT_SECRET=your_jwt_secret
   ```

2. In the frontend directory, create a `.env` file with:
   ```
   VITE_API_URL=http://localhost:5000
   ```

## Running the Application

### Start the Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Run the server:
   ```
   npm run dev
   ```

The server will start on `http://localhost:5000`.

### Start the Frontend

1. Open a new terminal and navigate to the frontend directory:
   ```
   cd dashboard
   ```

2. Run the development server:
   ```
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`.

## Usage

1. Open your browser and go to `http://localhost:3000`
2. Log in using your credentials
3. Explore the Healthcare Dashboard features

## API Endpoints

- `POST /api/auth/login`: User login
- `GET /api/patients`: Get all patients
- `GET /api/patients/:id`: Get a specific patient
- More endpoints as per your backend implementation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
