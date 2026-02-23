import express from "express";
import Ticket from "../models/Ticket.js";
import Project from "../models/Project.js";

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    const totalTickets = await Ticket.countDocuments();

    const statusStats = await Ticket.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    const priorityStats = await Ticket.aggregate([
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 }
        }
      }
    ]);

    const recentTickets = await Ticket.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalProjects,
      totalTickets,
      statusStats,
      priorityStats,
      recentTickets
    });

  } catch (err) {
    res.status(500).json({ message: "Dashboard stats failed" });
  }
});

export default router;
