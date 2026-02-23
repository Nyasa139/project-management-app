import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: "User"
    },
    settings: {
      darkMode: { type: Boolean, default: false },
      notifications: { type: Boolean, default: true },
      autoAssign: { type: Boolean, default: false },
      compactView: { type: Boolean, default: false }
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
