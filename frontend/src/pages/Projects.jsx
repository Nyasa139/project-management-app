import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    teamMembers: "",
  });

  const token = localStorage.getItem("token");

  const fetchProjects = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/projects",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async () => {
    await axios.post(
      "http://localhost:5000/api/projects",
      {
        title: form.title,
        description: form.description,
        teamMembers: form.teamMembers
          .split(",")
          .map((email) => ({ email: email.trim() })),
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setForm({ title: "", description: "", teamMembers: "" });
    fetchProjects();
  };

  const handleDelete = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/projects/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchProjects();
  };

  return (
    <MainLayout>
      <div className="p-6">

        <h2 className="text-4xl font-bold mb-8">
          Project Management
        </h2>

        {/* CREATE FORM */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl mb-10">

          <input
            placeholder="Project Title"
            className="p-3 border rounded-xl w-full mb-4"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <textarea
            placeholder="Description"
            className="p-3 border rounded-xl w-full mb-4"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            placeholder="Team Emails (comma separated)"
            className="p-3 border rounded-xl w-full mb-4"
            value={form.teamMembers}
            onChange={(e) =>
              setForm({ ...form, teamMembers: e.target.value })
            }
          />

          <button
            onClick={handleCreate}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-xl"
          >
            Create Project
          </button>
        </div>

        {/* PROJECT LIST */}
        <div className="grid gap-6">

          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2">
                {project.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mb-3">
                {project.description}
              </p>

              <div className="text-sm text-gray-500">
                Team:{" "}
                {project.teamMembers.map((m) => m.email).join(", ")}
              </div>

              <button
                onClick={() => handleDelete(project._id)}
                className="text-red-600 mt-4"
              >
                Delete
              </button>
            </div>
          ))}

        </div>

      </div>
    </MainLayout>
  );
}
