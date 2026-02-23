import express from "express";
import Ticket from "../models/Ticket.js";

const router = express.Router();

/* ===========================
   CREATE TICKET
=========================== */
router.post("/", async (req, res) => {
  try {
    const { title, description, priority, assignee } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const ticket = await Ticket.create({
      title,
      description,
      priority: priority || "Medium",
      status: "To Do",   // force default
      assignee,
    });

    res.status(201).json(ticket);

  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({
      message: "Error creating ticket",
      error: err.message
    });
  }
});
/* ===========================
   GET ALL TICKETS (FILTERING)
=========================== */
router.get("/", async (req, res) => {
  try {
    const { status, priority, assignee, search } = req.query;

    let filter = {};

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (assignee) filter.assignee = assignee;

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const tickets = await Ticket.find(filter).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching tickets" });
  }
});

/* ===========================
   UPDATE TICKET (FULL UPDATE)
=========================== */
router.put("/:id", async (req, res) => {
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json(updatedTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed" });
  }
});

/* ===========================
   DELETE TICKET
=========================== */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Ticket.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;
