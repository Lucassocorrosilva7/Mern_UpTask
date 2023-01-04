import mongoose from "mongoose";

const tasksSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    state: {
      type: Boolean,
      default: false,
    },
    deliveryDate: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    property: {
      type: String,
      required: true,
      enum: ["low", "medium", "high"],
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    complet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", tasksSchema);
export default Task;
