import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Confetti from "react-confetti";

const initialData = {
  todo: [
    {
      id: "1",
      text: "Learn React",
      dueDate: "2024-06-07",
      priority: "Med",
      note: "Start with the official docs.",
      link: "https://react.dev"
    },
    {
      id: "2",
      text: "Build Kanban Board",
      dueDate: "2024-06-08",
      priority: "High",
      note: "Implement drag and drop",
      link: ""
    },
    {
      id: "3",
      text: "Add Confetti",
      dueDate: "2024-06-09",
      priority: "Low",
      note: "",
      link: ""
    }
  ],
  inprogress: [],
  complete: []
};

const columns = [
  { key: "todo", label: "To Do" },
  { key: "inprogress", label: "In Progress" },
  { key: "complete", label: "Complete" }
];

export default function App() {
  // Set body background only once
  useEffect(() => {
    document.body.style.background =
      'url("https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") center/cover no-repeat fixed';
    return () => {
      document.body.style.background = "";
    };
  }, []);

  const [tasks, setTasks] = useState(initialData);
  const [showConfetti, setShowConfetti] = useState(false);

  const [newTask, setNewTask] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newPriority, setNewPriority] = useState("Med");
  const [newNote, setNewNote] = useState("");
  const [newLink, setNewLink] = useState("");

  const [editingTask, setEditingTask] = useState({ col: null, idx: null });
  const [editFields, setEditFields] = useState({
    dueDate: "",
    priority: "",
    note: "",
    link: ""
  });

  // Drag and drop handler
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;
    const sourceTasks = Array.from(tasks[sourceCol]);
    const destTasks =
      sourceCol === destCol ? sourceTasks : Array.from(tasks[destCol]);
    const [movedTask] = sourceTasks.splice(source.index, 1);
    destTasks.splice(destination.index, 0, movedTask);

    setTasks((prev) => ({
      ...prev,
      [sourceCol]: sourceCol === destCol ? destTasks : sourceTasks,
      [destCol]: destTasks
    }));

    if (destCol === "complete") {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 10000);
    }
  };

  // Add a new task
  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === "" || newDate.trim() === "") return;
    const newItem = {
      id: Date.now().toString(),
      text: newTask.trim(),
      dueDate: newDate,
      priority: newPriority,
      note: newNote,
      link: newLink
    };
    setTasks((prev) => ({
      ...prev,
      todo: [newItem, ...prev.todo]
    }));
    setNewTask("");
    setNewDate("");
    setNewPriority("Med");
    setNewNote("");
    setNewLink("");
  };

  // Click to edit a task
  const handleTaskClick = (colKey, idx, task) => {
    setEditingTask({ col: colKey, idx });
    setEditFields({
      dueDate: task.dueDate,
      priority: task.priority,
      note: task.note || "",
      link: task.link || ""
    });
  };

  // Handle field changes in edit form
  const handleEditChange = (field, value) => {
    setEditFields((prev) => ({ ...prev, [field]: value }));
  };

  // Save task edit
  const saveEdit = () => {
    const { col, idx } = editingTask;
    setTasks((prev) => {
      const newCol = [...prev[col]];
      newCol[idx] = {
        ...newCol[idx],
        dueDate: editFields.dueDate,
        priority: editFields.priority,
        note: editFields.note,
        link: editFields.link
      };
      return { ...prev, [col]: newCol };
    });
    setEditingTask({ col: null, idx: null });
  };

  // Card and active card styling
  const cardStyle = {
    background: "#fff",
    margin: "12px 0",
    padding: "16px",
    borderRadius: 10,
    boxShadow: "0 2px 12px 0 rgba(33,150,243,0.08)",
    transition: "box-shadow 0.2s",
    cursor: "pointer"
  };
  const cardActiveStyle = {
    ...cardStyle,
    boxShadow: "0 4px 20px 0 rgba(33,150,243,0.15)",
    border: "1.5px solid #90caf9"
  };

  return (
    <div style={{ minHeight: "100vh", fontFamily: "sans-serif", backdropFilter: "blur(2px)" }}>
      {showConfetti && <Confetti />}
      <div style={{ padding: 28 }}>
        <h1
  style={{
    fontWeight: 700,
    fontSize: 36,
    marginBottom: 24,
    color: "#333",
    textShadow: "0 1px 4px #fff9",
    background: "#fff",
    padding: "10px 24px",
    borderRadius: "12px",
    display: "inline-block",
    boxShadow: "0 2px 8px 0 rgba(33,150,243,0.09)"
  }}
>
  Kanban Board
</h1>

        <form
          onSubmit={addTask}
          style={{
            marginBottom: 28,
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            alignItems: "center"
          }}
        >
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add new task"
            style={{
              flex: "1 1 180px",
              fontSize: 15,
              padding: 10,
              borderRadius: 6,
              border: "1px solid #bdbdbd"
            }}
          />
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            style={{
              flex: "1 1 120px",
              fontSize: 15,
              padding: 10,
              borderRadius: 6,
              border: "1px solid #bdbdbd"
            }}
          />
          <select
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value)}
            style={{
              flex: "1 1 100px",
              fontSize: 15,
              padding: 10,
              borderRadius: 6,
              border: "1px solid #bdbdbd"
            }}
          >
            <option value="Low">Low</option>
            <option value="Med">Med</option>
            <option value="High">High</option>
          </select>
          <input
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Note (optional)"
            style={{
              flex: "2 1 200px",
              fontSize: 15,
              padding: 10,
              borderRadius: 6,
              border: "1px solid #bdbdbd"
            }}
          />
          <input
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            placeholder="Link (optional)"
            style={{
              flex: "2 1 200px",
              fontSize: 15,
              padding: 10,
              borderRadius: 6,
              border: "1px solid #bdbdbd"
            }}
          />
          <button
            type="submit"
            style={{
              flex: "0 0 70px",
              fontSize: 15,
              padding: "10px 0",
              background: "#2196f3",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer"
            }}
          >
            Add
          </button>
        </form>
        <DragDropContext onDragEnd={onDragEnd}>
          <div
            style={{
              display: "flex",
              gap: 36,
              alignItems: "flex-start",
              minHeight: 450,
              justifyContent: "center"
            }}
          >
            {columns.map((col) => (
              <Droppable droppableId={col.key} key={col.key}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      width: 320,
                      minHeight: 320,
                      background: "#e3f2fd",
                      borderRadius: 16,
                      padding: "16px 16px 26px 16px",
                      boxShadow: snapshot.isDraggingOver
                        ? "0 6px 24px 0 rgba(33,150,243,0.20)"
                        : "0 2px 8px 0 rgba(33,150,243,0.10)",
                      transition: "box-shadow 0.2s"
                    }}
                  >
                    <h2
                      style={{
                        textAlign: "center",
                        fontWeight: 600,
                        fontSize: 22,
                        color: "#1769aa",
                        marginBottom: 18,
                        letterSpacing: 0.5
                      }}
                    >
                      {col.label}
                    </h2>
                    {tasks[col.key].map((task, idx) => (
                      <Draggable key={task.id} draggableId={task.id} index={idx}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={
                              snapshot.isDragging
                                ? { ...cardStyle, ...cardActiveStyle, ...provided.draggableProps.style }
                                : { ...cardStyle, ...provided.draggableProps.style }
                            }
                            onClick={() => handleTaskClick(col.key, idx, task)}
                          >
                            <div style={{ fontWeight: "bold", fontSize: 16, marginBottom: 2 }}>
                              {task.text}
                            </div>
                            {editingTask.col === col.key && editingTask.idx === idx ? (
                              <div style={{ marginTop: 8 }}>
                                <div style={{ marginBottom: 7 }}>
                                  <label style={{ fontSize: 13, marginRight: 4 }}>Priority Level: </label>
                                  <select
                                    value={editFields.priority}
                                    onChange={(e) => handleEditChange("priority", e.target.value)}
                                    autoFocus
                                    style={{ fontSize: 14, padding: "4px 8px" }}
                                  >
                                    <option value="Low">Low</option>
                                    <option value="Med">Med</option>
                                    <option value="High">High</option>
                                  </select>
                                </div>
                                <div style={{ marginBottom: 7 }}>
                                  <label style={{ fontSize: 13, marginRight: 4 }}>Due Date: </label>
                                  <input
                                    type="date"
                                    value={editFields.dueDate}
                                    onChange={(e) => handleEditChange("dueDate", e.target.value)}
                                    style={{ fontSize: 14, padding: "4px 8px" }}
                                  />
                                </div>
                                <div style={{ marginBottom: 7 }}>
                                  <label style={{ fontSize: 13, marginRight: 4 }}>Note: </label>
                                  <input
                                    type="text"
                                    value={editFields.note}
                                    onChange={(e) => handleEditChange("note", e.target.value)}
                                    style={{
                                      width: "80%",
                                      fontSize: 14,
                                      padding: "4px 8px"
                                    }}
                                  />
                                </div>
                                <div>
                                  <label style={{ fontSize: 13, marginRight: 4 }}>Link: </label>
                                  <input
                                    type="text"
                                    value={editFields.link}
                                    onChange={(e) => handleEditChange("link", e.target.value)}
                                    style={{
                                      width: "80%",
                                      fontSize: 14,
                                      padding: "4px 8px"
                                    }}
                                  />
                                </div>
                                <button
                                  style={{
                                    marginTop: 10,
                                    fontSize: 13,
                                    padding: "4px 14px",
                                    background: "#1976d2",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: 5,
                                    cursor: "pointer"
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    saveEdit();
                                  }}
                                >
                                  Save
                                </button>
                              </div>
                            ) : (
                              <div style={{ fontSize: 13, color: "#666", marginTop: 8 }}>
                                <div>
                                  <b>Priority:</b> {task.priority}
                                </div>
                                <div>
                                  <b>Due Date:</b> {task.dueDate}
                                </div>
                                {task.note && <div><b>Note:</b> {task.note}</div>}
                                {task.link && (
                                  <div>
                                    <b>Link:</b>{" "}
                                    <a
                                      href={task.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{ color: "#2980b9", wordBreak: "break-all" }}
                                    >
                                      {task.link}
                                    </a>
                                  </div>
                                )}
                              </div>
                            )}
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
      </div>
    </div>
  );
}
