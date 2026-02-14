# 🎬 Movie Ticket Booking System – CDAC 2025

A full-stack **Movie Ticket Booking System** inspired by platforms like BookMyShow.  
Built using **Spring Boot 3, React 19 (Vite), SQL Server, AWS S3, and Razorpay**.

---

## 📌 Project Overview

This project is a real-world movie booking platform designed for scale and security. It features:

- ✨ **Dynamic Movie Discovery**: Browse movies by city and category.
- 📅 **Theatre Management**: View shows, screens, and timings per theatre.
- 🎟️ **Real-Time Booking**: Interactive seat selection with status updates.
- 🔒 **Secure Authentication**: JWT-based stateless auth with role-based access.
- 💳 **Integrated Payments**: Secure checkout via Razorpay.
- ☁️ **Cloud Storage**: AWS S3 integration for media assets.

---

## 🛠️ Tech Stack

### 🔹 Backend
- **Framework**: Spring Boot 3.2.2
- **Language**: Java 17
- **Security**: Spring Security + JWT
- **Data Access**: Spring Data JPA (Hibernate)
- **Database**: SQL Server
- **External APIs**: AWS SDK (S3), Razorpay Java SDK
- **Utilities**: Lombok, Jackson

### 🔹 Frontend
- **Library**: React 19 (Vite)
- **State Management**: Redux Toolkit
- **Navigation**: React Router 7
- **Styling**: Vanilla CSS (Premium & Responsive)
- **Networking**: Axios
- **Real-Time**: SignalR (Client-side integration)

---

## 🏗️ System Architecture

The project follows a modular and layered architecture for maintainability and scalability.

### Backend Structure
```
src/main/java/com/movieticket/booking/
├── config/        # App configurations
├── controller/    # REST API Endpoints
├── dto/           # Data Transfer Objects
├── entity/        # JPA Entities (Database Model)
├── repository/    # Data Access Layer
├── security/      # Security & JWT logic
└── service/       # Business Logic Layer
```

---

## 🔐 Key Features & Implementation

### 1. Authentication Flow
Uses stateless **JWT** (JSON Web Tokens). Users authenticate via `/login`, receive a token, and include it in the `Authorization` header for subsequent requests.

### 2. Real-Time Seat Locking
Prevents double booking by marking seats as "Locked" for 5 minutes during the selection process. This is managed via background tasks and database timestamps.

### 3. Payment Integration (Razorpay)
1. **Order Initiation**: Backend creates a Razorpay order.
2. **Payment Callback**: Frontend handles the Razorpay UI and returns payment details.
3. **Verification**: Backend verifies the payment signature before confirming the booking.

### 4. Cloud Integration (AWS S3)
Movie posters and other media are stored in **AWS S3** buckets. The backend generates public URLs stored in the database, ensuring fast and scalable media delivery.

---

## 🧪 Setup & Installation

### Prerequisites
- JDK 17
- Node.js (v18+)
- SQL Server
- AWS Account & S3 Bucket
- Razorpay API Keys

### 1. Backend Setup
1. Configure `src/main/resources/application.properties`:
   - Set database URL, username, and password.
   - Add your `aws.accessKey`, `aws.secretKey`, and `aws.s3.bucketName`.
   - Add your `razorpay.keyId` and `razorpay.keySecret`.
2. Run the application:
   ```bash
   mvn spring-boot:run
   ```

### 2. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend/movie-booking-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🚀 Scalability & Future Scope
- **Microservices**: Decomposing the auth and booking modules.
- **Redis Integration**: Implementing distributed caching for faster seat locking.
- **Dockerization**: Containerizing both backend and frontend for CI/CD.
- **Notifications**: Adding Email/SMS alerts for booking confirmations.

---

## 🎯 Conclusion
This project demonstrates an enterprise-grade approach to full-stack development, focusing on security, concurrency, and real-world service integration.
