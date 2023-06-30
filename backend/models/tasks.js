const mongoose = require("mongoose");

const tasksSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please set a default name for the task"],
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    notes: [],
    status: {
      type: String,
      default: "busy",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.Model("Task", tasksSchema);
