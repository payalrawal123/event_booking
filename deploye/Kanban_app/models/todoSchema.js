const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["todo", "inProgress", "done"],
      default: "todo",
    },
    userID: String,
    userName: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        // required: true,
      },
     
  },
  {
    versionKey: false,
  }
);

const todoModel = mongoose.model("todo", todoSchema);

module.exports = {
  todoModel,
};
