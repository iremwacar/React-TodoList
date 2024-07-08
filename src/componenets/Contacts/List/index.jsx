import { useState } from "react";
import Delete from "../../../assets/icons8-delete-48.png";
import Up from "../../../assets/icons8-up-30.png";
import Down from "../../../assets/icons8-down-30.png";

function List() {
  const [tasks, setTasks] = useState([
    { text: "Eat breakfast", datetime: new Date() },
    { text: "wach tv", datetime: new Date() },
  ]);

  const [newTask, setNewTask] = useState([]);
  const [filterText, setFilterText] = useState("");

  const filtered = tasks.filter((item) =>
    item.text.toLowerCase().includes(filterText.toLowerCase())
  );
  console.log("filtered", filtered);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, { text: newTask, datetime: new Date() }]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updateTasks = tasks.filter((_, i) => i !== index);
    setTasks(updateTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updateTasks = [...tasks];
      [updateTasks[index], updateTasks[index - 1]] = [
        updateTasks[index - 1],
        updateTasks[index],
      ];
      setTasks(updateTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function renderFilteredText(text) {
    const lowerCaseText = text.toLowerCase();
    const lowerCaseFilterText = filterText.toLowerCase();
    const parts = [];

    let lastIndex = 0;
    for (let i = 0; i < lowerCaseFilterText.length; i++) {
      const char = lowerCaseFilterText[i];
      const index = lowerCaseText.indexOf(char, lastIndex);
      if (index !== -1) {
        parts.push(text.substring(lastIndex, index));
        parts.push(<mark key={index}>{text.substr(index, 1)}</mark>);
        lastIndex = index + 1;
      }
    }
    parts.push(text.substring(lastIndex));
    return parts;
  }

  return (
    <div className="to-do-list">
      <h1>To-Do-List</h1>

      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Sorce"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>

      <ol className="task-list">
        {filtered.map((task, index) => (
          <li key={index}>
            <span className="text">{renderFilteredText(task.text)}</span>
            <div>
              <span className="date-time">{task.datetime.toLocaleString()}</span>
              <button
                className="delete-button"
                onClick={() => deleteTask(index)}
              >
                <img className="delete-img" src={Delete} alt="Delete" />
              </button>
              <button className="up-button" onClick={() => moveTaskUp(index)}>
                <img className="up-img" src={Up} alt="Move Up" />
              </button>
              <button
                className="down-button"
                onClick={() => moveTaskDown(index)}
              >
                <img className="down-img" src={Down} alt="Move Down" />
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
export default List;
