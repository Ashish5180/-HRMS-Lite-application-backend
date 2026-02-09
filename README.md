# ⚙️ Ether-AI Backend API

The robust API engine for the **Ether-AI HRMS**. Built with Node.js and Express, this backend provides secure, scalable endpoints for managing employee life-cycles and attendance tracking.

---

## 🚀 Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Configuration**:
   Create a `.env` file in the root:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_srv_string
   NODE_ENV=development
   ```

3. **Database Setup (CRITICAL)**:
   - Ensure your **MongoDB Atlas IP Whitelist** includes `0.0.0.0/0` if deploying to cloud services like Render.
   - The system uses the `mongodb+srv://` protocol for secure cloud connections.

4. **Run Server**:
   ```bash
   # Development (with nodemon)
   npm run dev

   # Production
   npm start
   ```

---

## 🛠 Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **ODM**: [Mongoose](https://mongoosejs.com/)
- **Logging**: [Morgan](https://github.com/expressjs/morgan)
- **CORS**: Enabled for all origins (configurable in `app.js`)

---

## 📍 API Reference

### Employees
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/employees` | List all employees |
| `POST` | `/api/employees` | Create new employee |
| `PUT` | `/api/employees/:id` | Update employee |
| `DELETE` | `/api/employees/:id` | Remove employee |

### Attendance
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/attendance` | Get attendance for a date (query: `?date=YYYY-MM-DD`) |
| `POST` | `/api/attendance` | Mark/Update attendance |
| `GET` | `/api/attendance/:employeeId` | Get history for specific employee |

### Health Check
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/ping` | Verify server and CORS status |

---

## 🧪 Testing the Database
I've included a diagnostic tool to verify your connection string and network access:
```bash
node test-db.js
```
This script will tell you exactly if your credentials are wrong or if your IP is being blocked by Atlas.

---

## 🏗 Project Architecture

- `src/index.js`: Server entry point & DB connection logic.
- `src/app.js`: Express middleware and route mounting.
- `src/routes/`: Route definitions.
- `src/controllers/`: Business logic and database operations.
- `src/models/`: Mongoose schemas.
- `src/middleware/`: Global error handling and validation.

---

## 🚢 Deployment Note
This backend is pre-configured for **Render**. 
- It uses a **robust connection fallback** that prioritizes the correct SRV protocol.
- It features `serverSelectionTimeoutMS: 5000` to prevent the server from hanging on bad database connections.

Developed with ❤️ by the **Ether-AI Team**.
