import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Confetti from "react-confetti";

const QUOTES = [
  "Success is the sum of small efforts, repeated day in and day out.",
  "Your only limit is your mind.",
  "Push yourself, because no one else is going to do it for you.",
  "Don’t watch the clock; do what it does. Keep going.",
  "Dream it. Wish it. Do it.",
  "It always seems impossible until it’s done.",
  "The secret of getting ahead is getting started.",
  "Little by little, one travels far.",
  "If you can dream it, you can do it.",
  "The only way to achieve the impossible is to believe it is possible.",
  "Great things never come from comfort zones.",
  "Don't stop until you're proud.",
  "Doubt kills more dreams than failure ever will.",
  "It does not matter how slowly you go, as long as you do not stop.",
  "Perseverance is not a long race; it is many short races one after the other.",
  "The future depends on what you do today.",
  "Difficult roads often lead to beautiful destinations.",
  "Small steps in the right direction can turn out to be the biggest step of your life.",
  "Success doesn’t just find you. You have to go out and get it.",
  "Wake up with determination. Go to bed with satisfaction.",
  "Hard work beats talent when talent doesn't work hard.",
  "Don’t wish it were easier. Wish you were better.",
  "Action is the foundational key to all success.",
  "Never give up on a dream just because of the time it will take to accomplish it. The time will pass anyway.",
  "You don’t have to be great to start, but you have to start to be great.",
  "The best way to predict your future is to create it.",
  "Opportunities don’t happen. You create them.",
  "Sometimes later becomes never. Do it now.",
  "You are capable of amazing things.",
  "Difficulties in life are intended to make us better, not bitter.",
  "A river cuts through rock, not because of its power, but because of its persistence.",
  "Don't watch the clock; do what it does. Keep going.",
  "Quality is not an act, it is a habit.",
  "Believe you can and you're halfway there.",
  "Be stronger than your excuses.",
  "You only fail when you stop trying.",
  "Great things take time. Be patient.",
  "The difference between ordinary and extraordinary is that little extra.",
  "Act as if what you do makes a difference. It does.",
  "The only limit to our realization of tomorrow will be our doubts of today.",
  "The only way to do great work is to love what you do.",
  "Push yourself, because no one else is going to do it for you.",
  "Your life does not get better by chance, it gets better by change.",
  "Work hard in silence, let success make the noise.",
  "Don’t let yesterday take up too much of today.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "Failure will never overtake me if my determination to succeed is strong enough.",
  "Set your goals high, and don't stop till you get there.",
  "The journey of a thousand miles begins with one step.",
  "Believe in yourself and all that you are.",
  "If opportunity doesn’t knock, build a door.",
  "It’s not whether you get knocked down, it’s whether you get up.",
  "The harder you work for something, the greater you’ll feel when you achieve it.",
  "Don’t limit your challenges. Challenge your limits.",
  "Doubt whom you will, but never yourself.",
  "Success is not in what you have, but who you are.",
  "Big journeys begin with small steps.",
  "Start where you are. Use what you have. Do what you can.",
  "You miss 100% of the shots you don’t take.",
  "Don’t count the days, make the days count.",
  "Your only limit is you.",
  "Go the extra mile. It’s never crowded.",
  "Never let the fear of striking out keep you from playing the game.",
  "Never regret anything that made you smile.",
  "Nothing will work unless you do.",
  "Difficult roads often lead to beautiful destinations.",
  "Sometimes we’re tested not to show our weaknesses, but to discover our strengths.",
  "Great things never came from comfort zones.",
  "Little things make big days.",
  "The best way to get started is to quit talking and begin doing.",
  "The difference between who you are and who you want to be is what you do.",
  "Success doesn’t come from what you do occasionally, it comes from what you do consistently.",
  "You are braver than you believe, stronger than you seem, and smarter than you think.",
  "Dream bigger. Do bigger.",
  "The struggle you’re in today is developing the strength you need for tomorrow.",
  "What you get by achieving your goals is not as important as what you become by achieving your goals.",
  "Motivation is what gets you started. Habit is what keeps you going.",
  "No masterpiece was ever created by a lazy artist.",
  "Do something today that your future self will thank you for.",
  "Don’t wish for it. Work for it.",
  "Discipline is doing what needs to be done, even if you don’t want to do it.",
  "If you’re going through hell, keep going.",
  "You don’t have to be perfect to be amazing.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "A little progress each day adds up to big results.",
  "Never stop doing your best just because someone doesn’t give you credit.",
  "Focus on your goal. Don’t look in any direction but ahead.",
  "Doubt kills more dreams than failure ever will.",
  "Don’t tell people your plans. Show them your results.",
  "The key to success is to focus our conscious mind on things we desire, not things we fear.",
  "Success is what happens after you have survived all your mistakes.",
  "You don’t need to see the whole staircase, just take the first step.",
  "Great things are done by a series of small things brought together.",
  "It always seems impossible until it’s done.",
  "If you want to achieve greatness stop asking for permission.",
  "Start each day with a positive thought and a grateful heart.",
  "The best time to plant a tree was 20 years ago. The second best time is now.",
  "You are the artist of your own life. Don’t hand the paintbrush to anyone else.",
  "If you don’t sacrifice for what you want, what you want becomes the sacrifice.",
  "Opportunities are usually disguised as hard work, so most people don’t recognize them.",
  "Don’t be afraid to give up the good to go for the great.",
  "Nothing is impossible. The word itself says 'I’m possible!'"
];

const QUOTE_KEY = "kanban-motivation-quote";
const QUOTE_TIME_KEY = "kanban-motivation-quote-time";
const QUOTE_ROTATE_MS = 21 * 60 * 60 * 1000;

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
  useEffect(() => {
    document.body.style.background =
      'url("https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") center/cover no-repeat fixed';
    return () => {
      document.body.style.background = "";
    };
  }, []);

  const [quote, setQuote] = useState("");

  useEffect(() => {
    const lastQuote = localStorage.getItem(QUOTE_KEY);
    const lastTime = Number(localStorage.getItem(QUOTE_TIME_KEY)) || 0;
    const now = Date.now();

    if (lastQuote && now - lastTime < QUOTE_ROTATE_MS) {
      setQuote(lastQuote);
    } else {
      let newQuote = lastQuote;
      while (!newQuote || newQuote === lastQuote) {
        newQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
      }
      setQuote(newQuote);
      localStorage.setItem(QUOTE_KEY, newQuote);
      localStorage.setItem(QUOTE_TIME_KEY, now.toString());
    }
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

  const deleteTask = (colKey, taskId) => {
    setTasks((prev) => ({
      ...prev,
      [colKey]: prev[colKey].filter((task) => task.id !== taskId)
    }));
    if (
      editingTask.col === colKey &&
      tasks[colKey][editingTask.idx] &&
      tasks[colKey][editingTask.idx].id === taskId
    ) {
      setEditingTask({ col: null, idx: null });
    }
  };

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

  const handleTaskClick = (colKey, idx, task) => {
    setEditingTask({ col: colKey, idx });
    setEditFields({
      dueDate: task.dueDate,
      priority: task.priority,
      note: task.note || "",
      link: task.link || ""
    });
  };

  const handleEditChange = (field, value) => {
    setEditFields((prev) => ({ ...prev, [field]: value }));
  };

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

  const cardStyle = {
    background: "#fff",
    margin: "12px 0",
    padding: "16px",
    borderRadius: 10,
    boxShadow: "0 2px 12px 0 rgba(33,150,243,0.08)",
    transition: "box-shadow 0.2s",
    cursor: "pointer",
    position: "relative"
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
        {/* QUOTE OF THE DAY CENTERED */}
        <div style={{ marginBottom: 18 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <h1
              style={{
                fontWeight: 700,
                fontSize: 34,
                color: "#1976d2",
                background: "#fff",
                padding: "8px 26px",
                borderRadius: "14px",
                marginBottom: 10,
                boxShadow: "0 2px 8px 0 rgba(33,150,243,0.09)"
              }}
            >
              Quote of the Day
            </h1>
            <div
              style={{
                background: "#fff",
                padding: "10px 24px",
                borderRadius: "12px",
                fontWeight: 500,
                fontSize: 20,
                color: "#1976d2",
                boxShadow: "0 2px 8px 0 rgba(33,150,243,0.10)",
                maxWidth: 700,
                textAlign: "center"
              }}
            >
              {quote}
            </div>
          </div>
        </div>
        {/* MAIN BOARD HEADER */}
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
          Ahmet's Kanban Board
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
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                deleteTask(col.key, task.id);
                              }}
                              style={{
                                position: "absolute",
                                top: 6,
                                right: 10,
                                border: "none",
                                background: "none",
                                color: "#d32f2f",
                                fontSize: 18,
                                cursor: "pointer"
                              }}
                              title="Delete Task"
                            >
                              🗑️
                            </button>
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
