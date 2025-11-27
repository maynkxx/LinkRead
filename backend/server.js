// backend/server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const threadRoutes = require("./routes/threadRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const messageRoutes = require("./routes/messageRoutes");
const errorHandler = require("./middleware/errorHandler");

const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

dotenv.config();
connectDB();

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10kb' })); // Body limit
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(xss()); // Prevent XSS attacks
app.use(hpp()); // Prevent HTTP Parameter Pollution

// Rate Limiting - TEMPORARILY DISABLED FOR DEBUGGING
// const limiter = rateLimit({
//     windowMs: 10 * 60 * 1000, // 10 mins
//     max: 100,
//     message: "Too many requests from this IP, please try again later"
// });
// app.use("/api", limiter);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/threads", threadRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/messages", messageRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 8001;

if (require.main === module) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
