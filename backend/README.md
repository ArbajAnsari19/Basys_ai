### **Patient Health Dashboard API Documentation**

---

### Base URL:

```
http://your-api-url.com/api
```

---

## **Authentication**

### 1. **Healthcare Provider Signup**

**Endpoint:** `POST /auth/signup`

This endpoint allows healthcare providers to sign up with their email and password.

#### Request Body:

```json
{
  "email": "provider@example.com",
  "password": "yourpassword"
}
```

#### Response:

- **201 Created:** Successfully registered healthcare provider.

```json
{
  "message": "Healthcare provider registered successfully"
}
```

- **400 Bad Request:** Email already exists.

```json
{
  "message": "Healthcare provider already exists"
}
```

---

### 2. **Healthcare Provider Login**

**Endpoint:** `POST /auth/login`

This endpoint allows healthcare providers to log in and receive a JWT token.

#### Request Body:

```json
{
  "email": "provider@example.com",
  "password": "yourpassword"
}
```

#### Response:

- **200 OK:** Successfully logged in, returns a JWT token.

```json
{
  "token": "your_jwt_token"
}
```

- **401 Unauthorized:** Invalid credentials.

```json
{
  "message": "Invalid credentials"
}
```

---

## **Patients**

### 1. **Fetch All Patients with Pagination**

**Endpoint:** `GET /patients`

This endpoint retrieves a paginated list of patients. You can specify the `page` and `limit` query parameters.

#### Query Parameters:

- `page`: The page number (default: `1`)
- `limit`: Number of patients per page (default: `10`)

#### Example Request:

```
GET /patients?page=2&limit=5
```

#### Response:

- **200 OK:** Successfully retrieved patients.

```json
{
  "page": 2,
  "totalPages": 4,
  "totalPatients": 35,
  "patients": [
    {
      "_id": "617c1f1e6f8e2b1a64473ff9",
      "name": "John Doe",
      "age": 45,
      "medicalHistory": "Diabetes",
      "treatmentPlan": "Metformin"
    },
    {
      "_id": "617c1f1e6f8e2b1a64473ffa",
      "name": "Jane Smith",
      "age": 52,
      "medicalHistory": "Hypertension",
      "treatmentPlan": "Lisinopril"
    }
  ]
}
```

---

### 2. **Create a New Patient**

**Endpoint:** `POST /patients`

This endpoint allows you to create a new patient.

#### Request Body:

```json
{
  "name": "John Doe",
  "age": 45,
  "medicalHistory": "Diabetes",
  "treatmentPlan": "Metformin"
}
```

#### Response:

- **201 Created:** Successfully created a new patient.

```json
{
  "_id": "617c1f1e6f8e2b1a64473ff9",
  "name": "John Doe",
  "age": 45,
  "medicalHistory": "Diabetes",
  "treatmentPlan": "Metformin"
}
```

- **500 Internal Server Error:** Error while creating the patient.

---

## **Prior Authorization**

### 1. **Submit a Prior Authorization Request**

**Endpoint:** `POST /authorizations`

This endpoint allows you to submit a prior authorization request for a specific patient.

#### Request Body:

```json
{
  "patientId": "617c1f1e6f8e2b1a64473ff9",
  "treatmentDetails": "New treatment plan details"
}
```

#### Response:

- **201 Created:** Successfully submitted a prior authorization request.

```json
{
  "_id": "618c1f1e6f8e2b1a64473ff8",
  "patientId": "617c1f1e6f8e2b1a64473ff9",
  "treatmentDetails": "New treatment plan details",
  "requestStatus": "pending",
  "timestamp": "2023-10-17T12:00:00.000Z"
}
```

- **404 Not Found:** Patient not found.

```json
{
  "message": "Patient not found"
}
```

- **500 Internal Server Error:** Error while submitting the request.

---

### 2. **Get All Authorization Requests**

**Endpoint:** `GET /authorizations`

This endpoint retrieves all prior authorization requests.

#### Response:

- **200 OK:** Successfully retrieved all authorization requests.

```json
{
  "requests": [
    {
      "_id": "618c1f1e6f8e2b1a64473ff8",
      "patientId": {
        "_id": "617c1f1e6f8e2b1a64473ff9",
        "name": "John Doe",
        "age": 45,
        "medicalHistory": "Diabetes",
        "treatmentPlan": "Metformin"
      },
      "treatmentDetails": "New treatment plan details",
      "requestStatus": "pending",
      "timestamp": "2023-10-17T12:00:00.000Z"
    }
  ]
}
```

- **500 Internal Server Error:** Error while fetching requests.

---

### Error Codes:

- **401 Unauthorized:** You are not authorized to access this resource.
- **404 Not Found:** The requested resource was not found.
- **500 Internal Server Error:** An unexpected error occurred on the server.

---

### **Environment Variables**

The following environment variables need to be set in a `.env` file:

```
MONGO_URI=mongodb://localhost:27017/health_dashboard
JWT_SECRET=your_jwt_secret
```

---

### **Testing Instructions**

To test the API locally, follow these steps:

1. **Clone the Repository** and install dependencies:

   ```bash
   git clone your-repo-url
   cd your-project
   npm install
   ```

2. **Set up MongoDB**: Ensure that MongoDB is running locally or use a remote MongoDB instance.

3. **Create a `.env` file** with the required environment variables mentioned above.

4. **Run the project**:

   ```bash
   npm run dev
   ```

5. **Test the endpoints** using a tool like Postman or `curl`.

---

This API documentation should help in understanding the functionality and how to interact with the endpoints in your application. Let me know if you need any adjustments!
