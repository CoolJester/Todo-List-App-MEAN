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

  //Get task from he database
  Tasks.findOne({ _id: taskId, userId: req.body.userId })
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

  //Get tasks from the database
  Tasks.find({ userId: req.body.userId })
    .then((tasks) => {
      let filteredTasks = [];
      //If the user is searching for a specific task
      if (req.query.search) {
        tasks.forEach((task) => {
          if (task.title.includes(req.query.search)) {
            filteredTasks.push(task);
          }
        });
        return res.status(200).json(filteredTasks);
      }

      //If tasks are not there
      if (!tasks) {
        return res.status(404).json({ status: "No Task/s Found" });
      } else {
        res.status(200).json(tasks);
      }
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
exports.editTask = (req, res, next) => {
  //Check if user is valid
  if (!req.body.userId) {
    return res.status(403).json({ status: "Not permitted" });
  }

  //Get the task/user id from params
  const taskId = req.params.taskId;
  const userId = req.body.userId;

  //Get task from the database
  //Get tasks from the database
  Tasks.findOne({ _id: taskId, userId: userId })
    .then((task) => {
      //If task is not found
      if (!task) {
        return res.status(404).json({ status: "No Task/s Found" });
      }

      //assign values
      task.title = req.body.title || task.title;
      task.date = req.body.date || task.date;
      task.notes = [...task.notes, req.body.notes];
      task.staus = req.body.status || task.status;

      //save
      task.save();

      res.status(200).json(task);
    })
    .catch((err) => {
      res.status(500).json({
        status: "Something went wrong",
      });
    });

  console.log(req.body);
};

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

  //Get the task id
  const taskId = req.params.taskId;

  Tasks.findOneAndRemove({ _id: taskId })
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
