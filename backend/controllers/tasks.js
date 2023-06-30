//Models
const Tasks = require("../models/tasks");

/*
  GET request
  When user wants to get their tasks
  Private
*/
exports.getTasks = (req, res, next) => {};

/*
  GET request
  When user wants to get one task
  Private
*/
exports.getTask = (req, res, next) => {};

/*
  POST request
  When user wants to add a task
  Private (don't forget to add the auth middleware)
*/
exports.postTask = (req, res, next) => {
  //Making sure we have a title since it's required
  if (!req.body.title) {
    return res.status(400).json({ status: "Failed to save" });
  }
  // req.body.userId = "649e97757f63722c1ecf0231"; //temporary for now

  //Check if user is valid to save here
  if (req.body.userId !== req.params.id) {
    return res.status(403).json({ status: "Not permitted" });
  }

  //Save task
  Tasks.create({ ...req.body })
    .then((createdTask) => {
      res.status(201).json({
        status: "Task Created",
        createdTask,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "Failed to Created Task",
        error: err,
      });
    });
};

/*
  PUT request
  When user wants to edit a tasks data
  Private
*/
exports.editTask = (req, res, next) => {};

/*
  DELETE request
  When user wants to delete a task
  Private
*/
exports.deleteTask = (req, res, next) => {};
