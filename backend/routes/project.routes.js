import express from "express";
import Project from "../models/Project.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// CREATE PROJECT
router.post("/", protect, async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Create failed" });
  }
});

// GET ALL PROJECTS
router.get("/", protect, async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
});

// UPDATE PROJECT
router.put("/:id", protect, async (req, res) => {
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(project);
});

// DELETE PROJECT
router.delete("/:id", protect, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted" });
});

export default router;
