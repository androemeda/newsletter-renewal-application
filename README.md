# Demo Video : https://drive.google.com/drive/u/0/folders/1bBsg2F6pms2Jfx7_1UwbSVUl3unt2Qud

# Newsletter Subscription Renewal Flow

A web application that simulates a newsletter subscription renewal process.

## Features

* Simulated email reminder system
* Real-time status tracking
* Activity logging
* Progress visualization
* Reset functionality
* Configurable waiting periods

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd newsletter-flow
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   
   Create `.env` file in backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/newsletter-flow
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

## Running the Application

1. **Start Backend**
   ```bash
   cd backend
   node server.js
   ```

2. **Start Frontend**
   ```bash
   cd frontend
   npm start
   ```
   Application runs at http://localhost:3000

## API Endpoints

* `POST /api/flow/start`: Start new flow
* `PUT /api/flow/:id`: Update flow status
* `GET /api/flow/:id`: Get flow details
