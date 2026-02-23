import { useEffect, useState } from "react";
import axios from "axios";

const Team = () => {
  const [members, setMembers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const projectId = localStorage.getItem("selectedProject");

        const res = await axios.get(
          `http://localhost:5000/api/projects/${projectId}/team`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMembers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTeam();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Team Members</h2>

      <div className="grid grid-cols-3 gap-4">
        {members.map((member) => (
          <div
            key={member._id}
            className="bg-white p-4 rounded-xl shadow"
          >
            <h3 className="font-semibold">{member.name}</h3>
            <p className="text-gray-500 text-sm">{member.email}</p>
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded mt-2 inline-block">
              Developer
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
