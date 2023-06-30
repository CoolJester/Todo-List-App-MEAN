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

tasksRouter.get("/tasks", auth, getTasks);
tasksRouter.get("/tasks/:taskId", auth, getTask);
tasksRouter.post("/tasks", auth, postTask);
tasksRouter.put("/tasks/:taskId", auth, editTask);

tasksRouter.delete("/tasks/:taskId", auth, deleteTask);

module.exports = tasksRouter;
