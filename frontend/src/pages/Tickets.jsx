import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";

const API = "http://localhost:5000/api/tickets";

export default function Tickets() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    assignee: "",
  });

  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    search: "",
  });

  // ====================================
  // FETCH TICKETS
  // ====================================
  const fetchTickets = async () => {
    try {
      setLoading(true);

      const res = await axios.get(API, {
        params: filters,
        headers: { Authorization: `Bearer ${token}` },
      });

      setTickets(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [filters]);

  // ====================================
  // CREATE TICKET (AUTO ASSIGN WORKING)
  // ====================================
  const handleCreate = async () => {
    try {
      if (!form.title.trim()) {
        alert("Title is required");
        return;
      }

      const newTicket = {
        ...form,
        assignee:
          user?.settings?.autoAssign === true
            ? user.email
            : form.assignee,
      };

      const res = await axios.post(API, newTicket, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTickets((prev) => [res.data, ...prev]);

      setForm({
        title: "",
        description: "",
        priority: "Medium",
        assignee: "",
      });
    } catch (err) {
      console.log(err);
      alert("Error creating ticket");
    }
  };

  // ====================================
  // DELETE
  // ====================================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTickets((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  // ====================================
  // UPDATE
  // ====================================
  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${API}/${editing._id}`,
        editing,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTickets((prev) =>
        prev.map((t) =>
          t._id === editing._id ? res.data : t
        )
      );

      setEditing(null);
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  // ====================================
  // BADGE COLORS
  // ====================================
  const getStatusColor = (status) => {
    if (status === "To Do") return "bg-yellow-100 text-yellow-700";
    if (status === "In Progress") return "bg-blue-100 text-blue-700";
    if (status === "Done") return "bg-green-100 text-green-700";
    return "bg-gray-100 text-gray-700";
  };

  const getPriorityColor = (priority) => {
    if (priority === "Low") return "bg-gray-200 text-gray-700";
    if (priority === "Medium") return "bg-orange-100 text-orange-700";
    if (priority === "High") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  // ====================================
  // UI
  // ====================================
  return (
    <MainLayout>
      <div className="p-8 min-h-screen bg-gray-50">

        <h2 className="text-4xl font-bold mb-10 text-gray-800">
          Ticket Management
        </h2>

        {/* ================= CREATE FORM ================= */}
        <div className="bg-white p-8 rounded-3xl shadow-xl mb-12">
          <h3 className="text-xl font-semibold mb-6">
            Create Ticket
          </h3>

          <div className="grid gap-5">

            <input
              placeholder="Title"
              className="p-3 border rounded-xl"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <textarea
              placeholder="Description"
              className="p-3 border rounded-xl"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
            />

            <div className="grid grid-cols-2 gap-4">

              <select
                className="p-3 border rounded-xl"
                value={form.priority}
                onChange={(e) =>
                  setForm({
                    ...form,
                    priority: e.target.value,
                  })
                }
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              {user?.settings?.autoAssign ? (
                <div className="p-3 border rounded-xl bg-gray-100 text-gray-600">
                  Auto Assigned to: {user.email}
                </div>
              ) : (
                <input
                  placeholder="Assignee"
                  className="p-3 border rounded-xl"
                  value={form.assignee}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      assignee: e.target.value,
                    })
                  }
                />
              )}

            </div>

            <button
              onClick={handleCreate}
              className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition"
            >
              Create Ticket
            </button>

          </div>
        </div>

        {/* ================= TICKET LIST ================= */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid gap-6">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className={`bg-white rounded-3xl shadow-lg ${
                  user?.settings?.compactView
                    ? "p-4 text-sm"
                    : "p-6"
                }`}
              >
                <div className="flex justify-between items-start">

                  <div>
                    <h3 className="font-semibold mb-2">
                      {ticket.title}
                    </h3>

                    <p className="text-gray-600 mb-3">
                      {ticket.description}
                    </p>

                    <div className="flex gap-3 flex-wrap">

                      <span
                        className={`px-3 py-1 rounded-full font-medium ${getStatusColor(
                          ticket.status
                        )}`}
                      >
                        {ticket.status}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full font-medium ${getPriorityColor(
                          ticket.priority
                        )}`}
                      >
                        {ticket.priority}
                      </span>

                      <span className="text-gray-500">
                        👤 {ticket.assignee}
                      </span>

                    </div>

                    <p className="text-xs text-gray-400 mt-3">
                      {new Date(
                        ticket.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setEditing(ticket)}
                      className="text-indigo-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(ticket._id)
                      }
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= EDIT MODAL ================= */}
        {editing && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

            <div className="bg-white p-8 rounded-3xl w-96 shadow-xl">

              <h3 className="text-xl font-semibold mb-6">
                Edit Ticket
              </h3>

              <input
                className="p-3 border rounded-xl w-full mb-4"
                value={editing.title}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    title: e.target.value,
                  })
                }
              />

              <select
                className="p-3 border rounded-xl w-full mb-4"
                value={editing.status}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    status: e.target.value,
                  })
                }
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>

              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white p-3 rounded-xl w-full"
              >
                Save Changes
              </button>

            </div>
          </div>
        )}

      </div>
    </MainLayout>
  );
}
