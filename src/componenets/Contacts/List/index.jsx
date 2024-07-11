import { useEffect, useState } from "react";
import Delete from "../../../assets/icons8-delete-48.png";
import Up from "../../../assets/icons8-up-30.png";
import Down from "../../../assets/icons8-down-30.png";
import DatePicker from "react-datepicker";
import Search from "../../../assets/icons8-search-30.png";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function List() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filterText, setFilterText] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState("once");

  const filtered = tasks.filter((item) =>
    item.text.toLowerCase().includes(filterText.toLowerCase())
  );

  function filterPeriod(period) {
    if (period === "all") {
      return tasks;
    } else {
      return tasks.filter((task) => task.period === period);
    }
  }

  function nowDate(tasks) {
    const now = new Date();
    return tasks.map((task) => ({
      ...task,
      passed: task.datetime < now,
    }));
  }

  useEffect(()=>{
    const filteredTasks = nowDate(tasks);
    if(filteredTasks.length < tasks.length){
      setTasks(filteredTasks);
      toast.warn("Some past tasks have been automatically removed.");
    }
  },[tasks])


  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [
        ...t,
        { text: newTask, datetime: selectedDate, period: selectedPeriod },
      ]);
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
      <h1>To-Do List</h1>

      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select date"
        />
        <div>
          <label>
            <input
              type="radio"
              name="period"
              value="once"
              checked={selectedPeriod === "once"}
              onChange={() => setSelectedPeriod("once")}
            />
            Once
          </label>
          <label>
            <input
              type="radio"
              name="period"
              value="weekly"
              checked={selectedPeriod === "weekly"}
              onChange={() => setSelectedPeriod("weekly")}
            />
            Weekly
          </label>
          <label>
            <input
              type="radio"
              name="period"
              value="monthly"
              checked={selectedPeriod === "monthly"}
              onChange={() => setSelectedPeriod("monthly")}
            />
            Monthly
          </label>
          <label>
            <input
              type="radio"
              name="period"
              value="yearly"
              checked={selectedPeriod === "yearly"}
              onChange={() => setSelectedPeriod("yearly")}
            />
            Yearly
          </label>
        </div>
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search... "
          value={filterText}
          src={Search}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Period
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              className="drp-once"
              onClick={() => setTasks(filterPeriod("once"))}
            >
              Once
            </Dropdown.Item>
            <Dropdown.Item
              className="drp-weekly"
              onClick={() => setTasks(filterPeriod("weekly"))}
            >
              Weekly
            </Dropdown.Item>
            <Dropdown.Item
              className="drp-monthly"
              onClick={() => setTasks(filterPeriod("monthly"))}
            >
              Monthly
            </Dropdown.Item>
            <Dropdown.Item
              className="drp-yearly"
              onClick={() => setTasks(filterPeriod("yearly"))}
            >
              Yearly
            </Dropdown.Item>
            <Dropdown.Item
              className="drp-all"
              onClick={() => setTasks(filterPeriod("all"))}
            >
              All
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <ol className="task-list">
        {filtered.map((task, index) => (
          <li key={index} className={task.passed ? "task-passed" : ""}>
            <span className="text">{renderFilteredText(task.text)}</span>
            <div>
              <span className="date-time">
                {task.datetime.toLocaleString()}-{task.period.toLocaleString()}
              </span>
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
