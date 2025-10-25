# LinkRead

A community-driven blog platform for Web Development learners.
Users can write blogs daily, track streaks, and get their blogs verified through a semi-automated keyword system and community voting.

---

## 🚀 Features

- **Authentication**: Login/Signup using JWT & Google OAuth
- **Homepage**: Web dev intro, roadmap, and blog creation button
- **Create Blog**: Add title, content, tips, applications, learnings, code snippets, and optional images
- **Verification System**:
  - Keyword-based check with MDN/React docs
  - Community voting for verification
- **User Dashboard**: Streak graph (Chart.js) + list of blogs
- **Browse Blogs**: View most upvoted & verified blogs
- **Actions**: Upvote and report blogs

---

## 🛠️ Tech Stack

### Frontend

- **React.js:** A JavaScript library for building user interfaces.
- **Tailwind CSS:** A utility-first CSS framework for rapid styling.
- **React Router DOM:** For client-side routing.
- **Redux Toolkit:** For efficient state management.
- **Redux Persist:** To persist Redux state in local storage.

### Backend

- **Node.js:** A JavaScript runtime environment.
- **Express.js:** A web application framework for Node.js.
- **JWT Authentication:** For secure user authentication using JSON Web Tokens.
- **Google OAuth:** For enabling "Sign in with Google" functionality.
- **bcryptjs:** A library for hashing user passwords securely.
- **cookie-parser:** Middleware to parse browser cookies.

### Database

- **MongoDB:** A NoSQL database used to store application data.
- **Mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js.

---

## ☁️ Deployment

- **Render:** A cloud platform for deploying the full-stack application.