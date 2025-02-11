# Group-Chat-Application-Backend

This is a backend service for an **Group Chat Application** built with **Express.js** and **TypeScript**. It powers user authentication, group chat management, and message handling through sleek HTTP APIs.

## Features
- **User Authentication** (Effortless Signup, Login, Logout, and Token Refresh)
- **Group Management** (Create, Update, Delete, Join Public/Private Groups)
- **Message Handling** (Send & Retrieve Messages in Real-Time)
- **Admin Analytics** (Detailed User & Group Stats)
- **Rate Limiting** (Advanced Protection Against API Abuse)

## Tech Stack
- **Node.js** & **Express.js**
- **TypeScript**
- **MongoDB** (Mongoose ORM)
- **JWT Authentication**
- **Bcrypt for Password Hashing**
- **Express Rate Limit** (Security)

## Installation

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v20+ recommended)
- **MongoDB**
- **PNPM** (or use npm/yarn)


### Clone the Repository
```sh
git clone https://github.com/yourusername/group-chat-backend.git
cd group-chat-application/Folder
```

### Install Dependencies
```sh
pnpm install
```

### Configure Environment Variables
Create a `.env` file in the root directory and add:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/group-chat
JWT_SECRET=your_secret_key
```

### Run the Server
#### Development Mode:
```sh
pnpm run dev
```

#### Production Mode:
```sh
pnpm run build && pnpm start
```

## API Endpoints

### **🔐 Auth Routes**
| Method | Endpoint          | Description                 |
|--------|-------------------|-----------------------------|
| POST   | `/auth/signup`    | Register a new user         |
| POST   | `/auth/login`     | Log in to your account      |
| POST   | `/auth/logout`    | Log out of your account     |
| POST   | `/auth/refresh`   | Refresh your JWT token      |

### **👥 User Routes**
| Method | Endpoint        | Description                   |
|--------|-----------------|-------------------------------|
| GET    | `/users`        | Retrieve a list of all users  |
| GET    | `/users/:id`    | Get user details by ID        |
| PATCH  | `/users/:id`    | Update your user profile      |
| DELETE | `/users/:id`    | Delete your account           |

### **💬 Group Routes**
| Method | Endpoint              | Description                      |
|--------|-----------------------|----------------------------------|
| POST   | `/group`              | Create a new group               | 
| GET    | `/group/public-group` | List all available public groups |
| GET    | `/group/:id`          | Get details of a specific group  |
| PATCH  | `/group/:id`          | Update group information         |
| DELETE | `/group/:id`          | Remove a group from existence    |
| POST   | `/group/:id/join`     | Join a public/private group      |

### **📩 Message Routes**
| Method | Endpoint               | Description                    |
|--------|------------------------|--------------------------------|
| POST   | `/messages/send-message`   | Send a message to a group      |
| GET    | `/messages/get-message`   | Retrieve messages for a group  |

## 🔒 Security Measures
- **JWT Authentication**: Ensuring secure user data access.
- **Rate Limiting**: Protecting the app from excessive requests with `express-rate-limit`.
- **Password Hashing**: Safeguarding user passwords using Bcrypt.

## 📜 License
This project is licensed under the **MIT License**.



🎉 **Keep Coding** and enjoy building your Group Chat App! 🚀
