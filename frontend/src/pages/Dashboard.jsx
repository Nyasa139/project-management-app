import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/dashboard/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(res.data);
    } catch (error) {
      console.error("Dashboard error:", error);

      // If unauthorized, force logout
      localStorage.clear();
      navigate("/login");
    }
  };

  if (!data) return <MainLayout>Loading...</MainLayout>;

  const statusData = data.statusStats.map((item) => ({
    name: item._id,
    value: item.count,
  }));

  const COLORS = ["#facc15", "#3b82f6", "#22c55e"];

  return (
    <MainLayout>
      <div className="p-8 space-y-10">

        <h1 className="text-4xl font-bold text-gray-800">
          Project Overview
        </h1>

        <div className="grid md:grid-cols-4 gap-6">
          <Card title="Total Projects" value={data.totalProjects} />
          <Card title="Total Tickets" value={data.totalTickets} />
          <Card
            title="Completed"
            value={
              data.statusStats.find((s) => s._id === "Done")?.count || 0
            }
          />
          <Card
            title="In Progress"
            value={
              data.statusStats.find((s) => s._id === "In Progress")?.count || 0
            }
          />
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl">
          <h2 className="text-xl font-semibold mb-6">
            Ticket Distribution
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={statusData} dataKey="value" outerRadius={110}>
                {statusData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl">
          <h2 className="text-xl font-semibold mb-6">
            Recent Activity
          </h2>

          <div className="space-y-4">
            {data.recentTickets.map((ticket) => (
              <div
                key={ticket._id}
                className="p-4 bg-gray-100 rounded-xl"
              >
                <p className="font-medium">{ticket.title}</p>
                <p className="text-sm text-gray-500">
                  {ticket.status} • {ticket.priority}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </MainLayout>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition">
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-3xl font-bold mt-2 text-gray-800">
        {value}
      </h3>
    </div>
  );
}
