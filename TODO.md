# To-Do App in Express.js

## Project Structure

The project follows the MVC (Model-View-Controller) pattern:

```
/project-root
│── /api
│   ├── /<api-name>
│   │   ├── api.controller.ts
│   │   ├── api.routes.ts
│   │   ├── api.service.ts
│── /config
│── /db
│── /middleware
│   ├── /<middleware-name>
│   │   ├── name.middleware.ts

│── /node_modules
│── /services
│   ├── /<service-name>
│   │   ├── name.service.ts
│── .env.dev
│── .env.prod
│── .gitignore
│── .prettierrc
│── Dockerfile
│── globalTypes.ts
│── index.ts
│── package-lock.json
│── package.json
│── README.md
│── TODO.md
│── tsconfig.json
│── webpack.config.ts
```

## Setup

1. `npm install -g nodemon`.
1. `npm install`.

## Database Layer

- Create a `db.service.js` file in the `services` folder.
- Implement asynchronous functions to interact with `todos.json`.
- Ensure functions for reading and writing data are abstracted to allow for future database integration.

## Model Layer

- Define a `Todo` model that represents a to-do item.
- Include fields like defined in `globalTypes.ts`.

## Controller Layer

- Implement CRUD functions:
  - `getAllTodos`: Retrieve all to-do items.
  - `getTodoById`: Retrieve a single to-do item by ID.
  - `createTodo`: Add a new to-do item.
  - `updateTodo`: Modify an existing to-do item.
  - `deleteTodo`: Remove a to-do item.

## Route Layer

- Create routes in `todo.routes.js`.
- Define endpoints for each CRUD operation.
- Connect each route to the respective controller function.

## Middleware

- Implement middleware for request validation. you can use this package for validation: https://www.npmjs.com/package/validator
- Implement middleware for logging - use winston logger: https://github.com/winstonjs/winston
- Use error handling middleware for centralized error management.

## Running the Application

1. Start the server using `npm run dev`.
2. Use Postman or a frontend to interact with the API.

## Future Enhancements

- Add authentication and authorization.
- Implement frontend integration with Vanilla JS.
- Migrate frontend to React.
- Introduce unit and integration tests.

### Task:

## Objective

Build a full-stack To-Do application using **React (Frontend)** and **Node.js (Backend)**. The app should support **JWT authentication**, allowing users to manage their todos. Admin users should be able to manage all users.

---

## Requirements

### 1. User Authentication

- Users should be able to register and log in using **JWT-based authentication**.
- Passwords must be **hashed** before storing them in the database.
- Users should be assigned a role: isAdmin?.
- Only admins should have access to the **User Management** page.

### 2. To-Do List (for all users)

- Users can **create, read, update, and delete** their own todos.
- Todos should include **title, description, status (pending/completed), and creation date**.
- Each todo is **owned** by the user who created it.

### 3. Admin Panel (only for admins)

- Display a table of **all users** (name, email, role).
- Admins can **promote users** to admins or **demote admins** to regular users.
- Admins can **delete users** (which also deletes their tasks).

---

## Technical Details

### Backend (Node.js, Express, Static Files)

- **Routes:**

  - `/auth/register` → User registration
  - `/auth/login` → User login (returns JWT)
  - `/todos/` → CRUD operations for user tasks (only the owner can manage their tasks)
  - `/users` → CRUD, update roles, and delete users (**admin only**)

- **Middleware:**

  - JWT authentication middleware
  - Role-based access control (RBAC) for admin routes (we need to check if the user is a admin)
  - Fields Verification.
  - Login with unic email

- **Database:** JSON static file-based storage for users and tasks.

### Frontend (React, Vite, Redux/Context API, React Router)

![image](https://github.com/user-attachments/assets/566cd00f-07eb-41f1-a4df-41fe74510232)
https://checkpoint.udemy.com/course/react-the-complete-guide-incl-redux/
![image](https://github.com/user-attachments/assets/d112c189-890f-4328-8100-c74937dd1031)
![image](https://github.com/user-attachments/assets/163acc29-6bee-4c46-a577-b21a0a832b91)

- **Pages:**
  - **Login / Register** (authentication with JWT, storing token in Redux)
  - **To-Do List** (display, add, edit, delete user’s own tasks)
  - **Admin Dashboard** (table of users, role management)
  - **Protected Routes:** Only accessible if authenticated and admins

---

## Bonus Features (Optional)

- Use **AntDesign** for UI styling.
- Implement **Dark Mode**.
- Add **pagination** to the admin user list.

---

## Submission Guidelines

- Provide a **GitHub repository** link with a Frontend and Backend Folders.
- Ensure **proper error handling** and security best practices.

Good luck!
