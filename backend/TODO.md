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

-   Create a `db.service.js` file in the `services` folder.
-   Implement asynchronous functions to interact with `todos.json`.
-   Ensure functions for reading and writing data are abstracted to allow for future database integration.

## Model Layer

-   Define a `Todo` model that represents a to-do item.
-   Include fields like defined in `globalTypes.ts`.

## Controller Layer

-   Implement CRUD functions:
    -   `getAllTodos`: Retrieve all to-do items.
    -   `getTodoById`: Retrieve a single to-do item by ID.
    -   `createTodo`: Add a new to-do item.
    -   `updateTodo`: Modify an existing to-do item.
    -   `deleteTodo`: Remove a to-do item.

## Route Layer

-   Create routes in `todo.routes.js`.
-   Define endpoints for each CRUD operation.
-   Connect each route to the respective controller function.

## Middleware

-   Implement middleware for request validation. you can use this package for validation: https://www.npmjs.com/package/validator
-   Implement middleware for logging - use winston logger: https://github.com/winstonjs/winston
-   Use error handling middleware for centralized error management.

## Running the Application

1. Start the server using `npm run dev`.
2. Use Postman or a frontend to interact with the API.

## Future Enhancements

-   Add authentication and authorization.
-   Implement frontend integration with Vanilla JS.
-   Migrate frontend to React.
-   Introduce unit and integration tests.
