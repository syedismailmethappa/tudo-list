import { useEffect, useState } from "react";
import axios from "axios";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  const API_URL = "http://127.0.0.1:8000/api/tasks/";

  const fetchTasks = async () => {
    const res = await axios.get(API_URL);
    // Handle both array and paginated object
    if (Array.isArray(res.data)) {
      setTasks(res.data);
    } else if (Array.isArray(res.data.results)) {
      setTasks(res.data.results);
    } else {
      setTasks([]);
    }
  };

  const addTask = async () => {
    if (title.trim() === "") return;
    await axios.post(API_URL, { title, completed: false });
    setTitle("");
    await fetchTasks(); // Await here
  };

  const toggleTask = async (id: number, completed: boolean) => {
    await axios.patch(`${API_URL}${id}/`, { completed: !completed });
    await fetchTasks(); // Await here
  };

  const deleteTask = async (id: number) => {
    await axios.delete(`${API_URL}${id}/`);
    await fetchTasks(); // Await here
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo App</h1>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              onClick={() => toggleTask(task.id, task.completed)}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {task.title}
            </span>
            <button onClick={() => deleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;