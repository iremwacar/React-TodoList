import TaskInput from "../TaskInput/index";
import TaskList from "../TaskList/index";
import TaskFilter from "../TaskFilter/index";
import { useState,useEffect } from "react";

function List() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filterText, setFilterText] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    setFilteredTasks(nowDate(tasks));
  }, [tasks]);

  function filterPeriod(period) {
    let filteredTasks = [];
    if (period === "all") {
      filteredTasks = tasks;
    } else {
      filteredTasks = tasks.filter((task) => task.period === period);
    }
    setFilteredTasks(nowDate(filteredTasks));
  }

  function nowDate(tasks) {
    const now = new Date();
    const twentyFourHoursLater = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    return tasks.map((task) => ({
      ...task,
      passed: task.datetime < twentyFourHoursLater,
    }));
  }

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((prevTasks) => [
        ...prevTasks,
        { text: newTask, datetime: selectedDate, period: selectedPeriod, completed: false },
      ]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
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

  function toggleTaskCompleted(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  }

  return (
    <div className="to-do-list">
      <h1>To-Do List</h1>
      <TaskInput
        newTask={newTask}
        selectedDate={selectedDate}
        selectedPeriod={selectedPeriod}
        handleInputChange={handleInputChange}
        setSelectedDate={setSelectedDate}
        setSelectedPeriod={setSelectedPeriod}
        addTask={addTask}
      />
      <hr />
      <TaskFilter
        filterText={filterText}
        setFilterText={setFilterText}
        filterPeriod={filterPeriod}
      />
      <TaskList
        tasks={filteredTasks}
        renderFilteredText={renderFilteredText}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        moveTaskUp={moveTaskUp}
        moveTaskDown={moveTaskDown}
      />
    </div>
  );
}

export default List;
