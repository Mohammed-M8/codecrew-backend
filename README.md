# Code Crew
## Overview
CodeCrew is a web-based platform where like-minded coders can lookup interesting projects that may require contributors or create a project idea and request members to help in bringing the project to life. This platform allows beginners to learn collaboration and trade skills with each other while also providing startup creatives to allow experienced developers provide help in the creation of their unique ideas.

## User Stories
- As a signed-in user I must be able to accept/reject a join request made by another users
- As a member of the team, I must be able to create, update, delete, and view tasks

**future improvements**:
- As a member of the team, I must be able to participate in group messages related to each project
- As a member of the team, I must be able to receieve notifications once I am accepted to a project and prior to three days of a due date of any task
## Entity-Relationship Diagram
![ERD](./public/images/projectManagement.drawio.png)

## Wireframes
![prototyes](./public/images/initialPrototpye.png)

## Express & Postman

Below you can see a chart outlining the RESTful routes required for this application:

| HTTP Method | Controller           | Response | URI                                       | Use Case                          |
| ----------- | --------------------- | -------- | ------------------------------------------ | ---------------------------------- |
| **Auth** |
| POST        | signup                | 200      | /auth/register                             | Sign up a user                     |
| POST        | login                 | 200      | /auth/login                                | Login a user                       |
| **Users** |
| GET         | getUsers              | 200      | /users                                     | Get all users (search by skill)    |
| GET         | getUser               | 200      | /users/:id                                 | Get a single user's profile        |
| PUT         | updateUser            | 200      | /users/:id                                 | Update user profile                |
| DELETE      | deleteUser            | 200      | /users/:id                                 | Delete a user account              |
| **Projects** |
| GET         | getProjects           | 200      | /projects                                  | Get all projects                   |
| GET         | getProject            | 200      | /projects/:id                              | Get a single project               |
| POST        | createProject         | 201      | /projects                                  | Create a new project               |
| PUT         | updateProject         | 200      | /projects/:id                              | Update a project                   |
| DELETE      | deleteProject         | 200      | /projects/:id                              | Delete a project                   |
| GET         | getProjectMembers     | 200      | /projects/:id/members                      | Get all members of a project       |
| PATCH       | updateMemberRole      | 200      | /projects/:id/members/:userId              | Update a member's role             |
| DELETE      | removeMember          | 200      | /projects/:id/members/:userId              | Remove a member from project       |
| PUT         | updateRequiredRoles   | 200      | /projects/:id/required-roles               | Update required roles for project  |
| **Join Requests** |
| GET         | getProjectJoinRequests| 200      | /projects/:id/join-requests                | Get join requests for a project    |
| GET         | getUserJoinRequests   | 200      | /users/:id/join-requests                   | Get join requests made by a user   |
| POST        | createJoinRequest     | 201      | /projects/:id/join-requests                | Request to join a project          |
| PATCH       | updateJoinRequest     | 200      | /join-requests/:id                         | Accept/reject a join request       |
| DELETE      | cancelJoinRequest     | 200      | /join-requests/:id                         | Cancel/withdraw a join request     |
| **Tasks** |
| GET         | getProjectTasks       | 200      | /projects/:id/tasks                        | Get all tasks for a project        |
| GET         | getTask               | 200      | /tasks/:id                                 | Get a single task                  |
| POST        | createTask            | 201      | /projects/:id/tasks                        | Create a task within a project     |
| PUT         | updateTask            | 200      | /tasks/:id                                 | Update a task                      |
| DELETE      | deleteTask            | 200      | /tasks/:id                                 | Delete a task                      |

## Attibutions
## Technologies Used
- Git,Github,Express.js,Node.js,React,Bootstrap,Postman(for testing purposes),MongoDB
## Next Steps
