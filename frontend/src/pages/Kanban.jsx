import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function Kanban() {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    const res = await axios.get("http://localhost:5000/api/tickets");
    setTickets(res.data);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const ticketId = result.draggableId;
    const newStatus = result.destination.droppableId;

    await axios.put(`http://localhost:5000/api/tickets/${ticketId}`, {
      status: newStatus
    });

    fetchTickets();
  };

  return (
    <MainLayout>

      <h2 className="text-3xl font-bold mb-6">Kanban Board</h2>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-6">

          {["To Do", "In Progress", "Done"].map(status => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-white p-6 rounded-2xl shadow-xl"
                >
                  <h3 className="font-bold mb-4">{status}</h3>

                  {tickets
                    .filter(ticket => ticket.status === status)
                    .map((ticket, index) => (
                      <Draggable
                        key={ticket._id}
                        draggableId={ticket._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-indigo-100 p-3 rounded-lg mb-3"
                          >
                            {ticket.title}
                          </div>
                        )}
                      </Draggable>
                    ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}

        </div>
      </DragDropContext>

    </MainLayout>
  );
}
