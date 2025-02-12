# Group Chat Backend

This is a backend service for a **Group Chat Application** built using **Express.js** and **TypeScript**. The backend provides user authentication, group chat management, and message handling via HTTP APIs.

## Features
- **User Authentication** (Signup, Login, Logout, Token Refresh)
- **Group Management** (Create, Update, Delete, Join Public/Private Groups)
- **Message Handling** (Send, Retrieve Messages)
- **Admin Analytics** (User & Group Stats)
- **Rate Limiting** (Protection against API abuse)
- **API Documentation with Swagger**

## Tech Stack
- **Node.js** & **Express.js**
- **TypeScript**
- **MongoDB** (Mongoose ORM)
- **JWT Authentication**
- **Bcrypt for Password Hashing**
- **Express Rate Limit** (Security)
- **Swagger for API Documentation**

## Installation

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16+ recommended)
- **MongoDB**
- **PNPM** (or use npm/yarn)

### Clone the Repository
```sh
git clone https://github.com/yourusername/group-chat-backend.git
cd group-chat-backend
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

## API Documentation
This project includes **Swagger** for API documentation. Once the server is running, you can access the documentation at:

```
http://localhost:5000/api-docs
```

The Swagger UI provides an interactive way to explore and test API endpoints.

## API Endpoints


### **User Routes**
| Method  | Endpoint              | Description         |
|---------|-----------------------|---------------------|
| POST    | `/users`              | create user         |
| POST    | `/users/login`        | login the user      |
| GET     | `/users/getAllUser`   | Update user details |
| GET     | `/users/{:id}`        | get user by id      |
| DELETE  | `/users/{:id}`        | delete user by id   |
| PUT     | `/users/{:id}`        | update a user       |
| PATCH   | `/users/{:id}`        | update user details |
| POST    | `/users/refresh-token`| Refresh auth. tokken| 
| POST    | `/users/logout`       | Logut User          |

### **Group Routes**
| Method | Endpoint                             | Description            |
|------|----------------------------------------|------------------------|
| GET  | `/groups/public`                       | get public groups      |
| POST | `/groups`                              | Create a new group     |
| POST | `/groups/group{id}/join`               | join a public group    |
| POST | `/groups/group{id}/inviteuser/user{id}`| Invite a user in group |
| POST | `/groups/acceptinvitation/{token}`     | Accept Group invitation|
| GET  | `/groups/data`                         | get overall data       |
| GET  | `/groups/groupdata/group{id}`          |get specific group      |
| PUT  | `/groups/edit-group/group-id`          | edit a group           | 


### **Message Routes**
| Method | Endpoint                        | Description                |
|--------|---------------------------------|----------------------------|
| POST   | `/message/send-messages`        | Send messages              |  
| POST   | `/message/get-all-messages`     | Get all messages           |

## Security Measures
- **JWT Authentication** to protect user data.
- **Rate Limiting** using `express-rate-limit`.
- **Password Hashing** with Bcrypt.

```mermaid
erDiagram
  USER {
    string name
    string email
    boolean active
    string role "USER | ADMIN"
    string password
    string refreshToken
  }
  
  GROUP {
    string name
    string type "public | private"
    ObjectId admin
    ObjectId[] members
    ObjectId[] inviteToken.userId
    string[] inviteToken.token
    date[] inviteToken.expiresAt
  }
  
  MESSAGE {
    ObjectId groupId
    ObjectId senderId
    string content
  }

  USER ||--o{ GROUP : "belongs to"
  GROUP ||--o{ USER : "has members"
  GROUP ||--o{ MESSAGE : "contains messages"
  MESSAGE ||--|{ USER : "sent by"




## License
This project is licensed under the **MIT License**.

---

### Contributors
- **Your Name** - [GitHub](https://github.com/yourusername)

---

Happy Coding! 🚀