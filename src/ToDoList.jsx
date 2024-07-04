import { useState } from "react";
import Delete from "./assets/icons8-delete-48.png";
import Up from "./assets/icons8-up-30.png";
import Down from "./assets/icons8-down-30.png";

function ToDoList() {
  const [tasks, setTasks] = useState(["Eat breakfast", "wach tv", "..."]);
  const [newTask, setNewTask] = useState([]);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updateTasks = tasks.filter((_,i)=> i !== index);
    setTasks(updateTasks);
  }

  function moveTaskUp(index) {
    if(index>0){
      const updateTasks = [...tasks];
      [updateTasks[index],updateTasks[index-1]] = [updateTasks[index -1],updateTasks[index]];
      setTasks();
    }
  }

  function moveTaskDown(index) {
    if(index>tasks.length-1){
      const updateTasks = [...tasks];
      [updateTasks[index -1],updateTasks[index]] = [updateTasks[index],updateTasks[index-1]];
      setTasks();
    }
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

      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className="text">{task}</span>
            <button className="delete-button" onClick={() => deleteTask(index)}>
              <img src={Delete}></img>
            </button>
            <button className="up-button" onClick={() => moveTaskUp(index)}>
              <img src={Up}></img>
            </button>
            <button className="down-button" onClick={() => moveTaskDown}>
              <img src={Down}></img>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
export default ToDoList;
