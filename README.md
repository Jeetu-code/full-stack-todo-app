# Full Stack Todo App

A full-stack Todo application built with **Node.js, Express, MongoDB**, and **Vanilla JavaScript**.  
This project focuses on **authentication, authorization, database integrity, and clean frontend–backend separation**.

---

## 🚀 Features

### Authentication & Authorization
- User signup and login using **JWT**
- Protected routes with middleware
- Cross-user access prevention (users cannot access others’ todos)

### Todo Management
- Create, update, delete todos
- Mark todos as completed
- Fetch all todos for a logged-in user
- Filter completed todos

### Security & Data Integrity
- Todos are always linked to a user
- Invalid ObjectId handling
- Orphan todos are prevented
- Ownership checks on update/delete

### Testing
- Backend tested using **Jest** and **Supertest**
- Authentication tests
- Authorization tests
- Edge case handling (invalid ID, cross-user access)

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Jest + Supertest (testing)

### Frontend
- Vanilla JavaScript
- HTML5
- CSS3
- Component-based structure (without frameworks)



