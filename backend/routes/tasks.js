const express = require("express");

const {
  getTasks,
  postTask,
  editTask,
  deleteTask,
} = require("../controllers/tasks");

const tasksRouter = express.Router();

tasksRouter.route("tasks/:id").get(getTasks).post(postTask).put(editTask);

tasksRouter.delete("tasks/:id/:taskId", deleteTask);

module.exports = tasksRouter;
