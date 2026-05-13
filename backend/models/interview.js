import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    role: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    questions: [
      {
        question: String,

        userAnswer: {
          type: String,
          default: "",
        },

        feedback: {
          type: String,
          default: "",
      },

      score: {
        type: Number,
        default: 0,
      },
    },
  ],
  },
  {
    timestamps: true,
  }
);

const Interview = mongoose.model(
  "Interview",
  interviewSchema
);

export default Interview;