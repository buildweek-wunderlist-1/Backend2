const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authenticate = require("../auth/authentication-mw.js");
const authRouter = require("../auth/auth-router.js");
// const tasksRouter = require("../tasks/tasks-router.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
// server.use("/api/tasks", authenticate, tasksRouter);

server.get("/", (req, res) => {
  res.json({ API: "UP AND RUNNING" });
});

module.exports = server;
