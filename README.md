<h1 align="center">
    TodoList - CroSoften
</h1>

<p align="center">
  <a href="https://www.linkedin.com/in/daniel-viana-almeida/">
    <img
        alt="Made by Daniel Almeida"
        src="https://img.shields.io/badge/MADE%20BY-Daniel%20Almeida-%230077b5?style=flat-square&logo=linkedin">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%20brightgreen?style=flat-square&logo=">

  <a href="https://www.typescript.com/">
    <img
        alt="TypeScript"
        src="https://img.shields.io/badge/STACK-TypeScript-%230077b5?style=flat-square&logo=TypeScript">
  </a>
  <a href="">
    <img
        alt="server Node.js"
        src="https://img.shields.io/badge/Server-Node.js-%23339933?style=flat-square&logo=node.js">
  </a>

</p>

### Business Rules:

-   The API must have the following functionalities:
-   The user can create an account in the application.
-   The user can log in to the application.
-   The user can add a task to the to-do list.
-   The user can list all their tasks.
-   The user can edit a specific task.
-   The user can delete a specific task.
-   The user can mark a specific task as completed.
-   The user can unmark a specific task as completed.
-   The user can filter their tasks by status (completed or not completed).
-   A task can have subtasks.
-   A subtask can also have subtasks.
-   The user must have an id, name, email, and password.
-   A task must have an id, a title, an optional description, and a status.

### Requirements:

-   Node.js Express TypeOrm PostgreSQL Docker Jest Swagger
-   Layered Architecture

## Prerequisites

-   Node.js v18.17.0 and npm installed
-   PostgreSQL installed and running
-   Docker and Docker-compose installed

## Installation

1. Clone the repository: `git clone https://github.com/vianadaniel/cros_todolist_api.git`
2. Install dependencies: `npm ci`

## Database Setup

1. Create a PostgreSQL database for the project.

2. You can copy the `.env.example` file to `.env` and configure the database connection settings but it doesn't required if your Postgres is set up with:

```
DB_HOST=localhost
DB_PORT=27017
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=postgres
```

3. Run the database migrations: `npm run migrate`

## Usage

Start the Express server:

```bash
npm run dev

```

Debugger mode: Just press F5

Use the extensions REST Client for Visual Studio Code
src/rest/rest.rest to make requests

## With Docker

```bash
make up

```

### Routes

-   **GET** `/api/user`

    -   Description: Get all users
    -   Authorization: Required

-   **POST** `/api/user` --- The user can create an account in the application.

    -   Description: Create a new user
    -   Authorization: Not required
    -   Request body:
        ```json
        {
            "name": "Your Name",
            "email": "your_email@example.com",
            "password": "your_password"
        }
        ```

-   **POST** `/api/user/login` ---The user can log in to the application.

    -   Description: Login user
    -   Authorization: Not required
    -   Request body:
        ```json
        {
            "email": "your_email@example.com",
            "password": "your_password"
        }
        ```

-   **POST** `/api/task/` --- The user can add a task to the to-do list.

    -   Description: Create a new task
    -   Authorization: Required
    -   Request body:
        ```json
        {
            "userId": "user_id_here",
            "title": "Task title",
            "description": "Task description",
            "status": "pending"
        }
        ```

-   **POST** `/api/task/:id/subtasks` --- A task can have subtasks.

    -   Description: Create a new subtask for a task
    -   Authorization: Required
    -   Request body:
        ```json
        {
            "userId": "user_id_here",
            "title": "Subtask title",
            "description": "Subtask description",
            "status": "pending"
        }
        ```

-   **GET** `/api/task/:userId?status=:status` --- The user can list all their tasks. Filter By Status

    -   Description: Get all tasks for a user
    -   Authorization: Required
    -   Params:
        -   userId: ID of the user

-   **PUT** `/api/task/:id` The user can edit a specific task. It can be used to set Status

    -   Description: Update a task
    -   Authorization: Required
    -   Params:
        -   id: ID of the task to update
    -   Request body:
        ```json
        {
            "status": "completed"
        }
        ```

-   **DELETE** `/api/task/:id` --- The user can delete a specific task
    -   Description: Delete a task
    -   Authorization: Required
    -   Params:
        -   id: ID of the task to delete
