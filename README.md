# Wunderlist API !!!


https://wunderlist1-bw-backend.herokuapp.com/

## Data Structure
                        (NR=Not Required)
Users

| Name       |  Constraints               |
| ---------- | -------------------------- |
| id         | integer, primary key, auto |
| username   | string, required           |
| password   | string, required, hashed   |
| email      | string, NR                 |
| name       | string, NR                 |

Tasks

| Name        |       Constraints!                                   |
| ----------- | ---------------------------------------------------- |
| id          | integer, primary key, auto                           |
| name        | name, required                                       |
| dueDate     | NR `YYYY-MM-DD HH:MM:SS:SSS`                         |
| isRecurring | boolean, NR                                          |
| dayOfWeek   | integer, NR                                          |

-  umlimited number of tasks
- tasks can be assigned an unlimited number of tags

## Endpoints

- error responses will have a message property!!

User Endpoints

| Method |  URL               |         Expected Body    |         Response |
| ------ | ------------------ | ------------------------ | ---------------- |
| POST   | /api/auth/register | `{ username, password }` | `{ id }`         |
| POST   | /api/auth/login    | `{ username, password }` | `{ token }`      |

Task Endpoints

| Endpoint              | Purpose                   | Expected Body      | Success Response        |    Code      |
| --------------------- | ------------------------- | ------------------ | ----------------------- | ------------ |
| GET /api/tasks        | load a user's tasks       | n/a                | Array of a user's tasks | 200          |
| POST /api/tasks       | add a new task            | `{ new task }`     | `{ id }` of new task    | 201          |
| GET /api/tasks/:id    | get task with id :id      | n/a                | task object             | 200          |
| PUT /api/tasks/:id    | update a task with id :id | `{ task changes }` | empty on success        | 204          |
| DELETE /api/tasks/:id | delete a task             | n/a                | empty on success        | 204          |

Tags (STRETCH!)

| Endpoint                           | Purpose                       | Expected Body | Success Response |     Code     |
| ---------------------------------- | ----------------------------- | ------------- | ---------------- | ------------ |
| POST /api/tasks/:id                | add a tag to task with id :id | `{ tag_id }`  | empty on success | 204          |
| DELETE /api/tasks/:task_id/:tag_id | remove a tag from a task      | N/A           | empty on success | 204          |
