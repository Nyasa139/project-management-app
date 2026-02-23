import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  ticketId: String,
  action: String,
  performedBy: String,
  timestamp: { type: Date, default: Date.now },
});
await Activity.create({
  ticketId: ticket._id,
  action: "Ticket Updated",
  performedBy: req.user.email,
});


export default mongoose.model("Activity", activitySchema);
