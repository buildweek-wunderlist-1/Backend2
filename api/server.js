// Dependency Imports
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authMiddleware = require("../auth/authentication-mw");

// Server Creation
const server = express();

// Middleware Libraries
server.use(cors());
server.use(helmet());
server.use(express.json());

// Custom Routers
const authRouter = require("../auth/auth-router");
const taskRouter = require("../tasks/tasks-router");
server.use("/api/auth", authRouter);
server.use("/api/tasks", authMiddleware, taskRouter);

// Test Endpoint
server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
