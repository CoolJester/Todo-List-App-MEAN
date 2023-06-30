const express = require("express");

const {
  getTasks,
  postTask,
  editTask,
  deleteTask,
} = require("../controllers/tasks");

const tasksRouter = express.Router();

tasksRouter.get("/tasks/:id", getTasks);
tasksRouter.post("/tasks/:id", postTask);
tasksRouter.put("/tasks/:id", editTask);

tasksRouter.delete("/tasks/:id/:taskId", deleteTask);

module.exports = tasksRouter;
