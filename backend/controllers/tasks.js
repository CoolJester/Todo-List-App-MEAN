//Models
const Tasks = require("../models/tasks");

/*
  GET request
  When user wants to get one task
  Private
*/
exports.getTask = (req, res, next) => {
  //Get the taskId
  const taskId = req.params.taskId;

  //Check if user is valid to get data
  if (!req.body.userId) {
    return res.status(403).json({ status: "Not permitted" });
  }

  //Get tasks from he database
  let userTasks = Tasks.findOne({ _id: taskId, userId: req.body.userId })
    .then((task) => {
      //If tasks are not there
      if (!task) {
        return res.status(404).json({ status: "No Task/s Found" });
      }
      res.status(200).json(task);
    })
    .catch((err) => {
      res.status(500).json({
        status: "Something went wrong",
      });
    });
};

/*
  GET request
  When user wants to get their tasks
  Private
*/
exports.getTasks = (req, res, next) => {
  //Check if user is valid to get data
  if (!req.body.userId) {
    return res.status(403).json({ status: "Not permitted" });
  }

  //Get tasks from he database
  Tasks.find({ userId: req.body.userId })
    .then((tasks) => {
      //If tasks are not there
      if (!tasks) {
        return res.status(404).json({ status: "No Task/s Found" });
      }
      res.status(200).json(tasks);
    })
    .catch((err) => {
      res.status(500).json({
        status: "Something went wrong",
      });
    });
};

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

  //Check if user is valid to save here
  if (!req.body.userId) {
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
exports.deleteTask = (req, res, next) => {
  //Check if user is valid
  if (!req.body.userId) {
    return res.status(403).json({ status: "Not permitted" });
  }

  Tasks.findOneAndRemove({ _id: req.params.taskId })
    .then((data) => {
      res.status(200).json({ status: "Task was Deleted", data: data });
    })
    .catch((err) => {
      res.status(400).json({
        status: "Failed to delete task",
        data: err,
      });
    });
};
