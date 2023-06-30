const express = require("express");

const {
  getTasks,
  getTask,
  postTask,
  editTask,
  deleteTask,
} = require("../controllers/tasks");
const auth = require("../middleware/auth");

const tasksRouter = express.Router();

tasksRouter.get("/tasks/:id", auth, getTasks);
tasksRouter.get("/task/:id/:taskId", auth, getTask);
tasksRouter.post("/tasks/:id", auth, postTask);
tasksRouter.put("/tasks/:id", editTask);

tasksRouter.delete("/tasks/:id/:taskId", deleteTask);

module.exports = tasksRouter;
