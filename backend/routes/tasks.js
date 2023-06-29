const express = require("express");

const { getTasks, postTask, editTask } = require('../controllers/tasks');

const tasksRouter = express.Router();



tasksRouter.route('tasks/:id')
  .get(getTasks)
  .post(postTask)
  .put(editTask);

module.exports = tasksRouter;
