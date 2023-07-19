const mongoose = require("mongoose");

const organizationSchema = mongoose.Schema(
  {
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      required: [true, "Please enter a name for the organization"],
      trim: true,
      type: String,
    },
    users: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  }
);
