import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tickets", ticketRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));

app.use("/api/projects", projectRoutes);
import multer from "multer";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

export const upload = multer({ storage });

import dashboardRoutes from "./routes/dashboard.routes.js";
app.use("/api/dashboard", dashboardRoutes);
import settingsRoutes from "./routes/settings.routes.js";
app.use("/api/settings", settingsRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/tickets", ticketRoutes);
