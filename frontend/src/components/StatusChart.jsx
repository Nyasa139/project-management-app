import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function StatusChart({ tickets }) {

  const data = [
    { name: "To Do", value: tickets.filter(t => t.status === "To Do").length },
    { name: "In Progress", value: tickets.filter(t => t.status === "In Progress").length },
    { name: "Done", value: tickets.filter(t => t.status === "Done").length },
  ];

  const COLORS = ["#facc15", "#3b82f6", "#22c55e"];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl h-80">
      <h3 className="font-semibold mb-4">Ticket Status Distribution</h3>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={90}>
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
