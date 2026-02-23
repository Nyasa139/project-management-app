import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { motion } from "framer-motion";

export default function Reports() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tickets");

      const tickets = res.data;

      const todo = tickets.filter(t => t.status === "To Do").length;
      const progress = tickets.filter(t => t.status === "In Progress").length;
      const done = tickets.filter(t => t.status === "Done").length;

      setData([
        { name: "To Do", value: todo },
        { name: "In Progress", value: progress },
        { name: "Done", value: done }
      ]);

    } catch (err) {
      console.error("Report fetch failed");
    }
  };

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6">
          Project Analytics
        </h2>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>

        </div>
      </motion.div>
    </MainLayout>
  );
}
