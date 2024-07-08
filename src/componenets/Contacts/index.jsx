import { useState } from "react";
import List from "./List/index.jsx";
import Navbr from "./Navbar/index.jsx";

function Contacts() {
  const [tasks, setTasks] = useState([{task:"Eat breakfast",time:""}, {task:"wach tv" ,time:""}]);

  function handleInputChange(event) {
    setTasks(event.target.value);
  }

  const addTask = (newTask)=>{
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      setTasks("");
    }
  }

  const deleteTask = (index) => {
    const updateTasks = tasks.filter((_, i) => i !== index);
    setTasks(updateTasks);
  }

  const moveTaskUp = (index) =>{
    if (index > 0) {
      const updateTasks = [...tasks];
      [updateTasks[index], updateTasks[index - 1]] = [
        updateTasks[index - 1],
        updateTasks[index],
      ];
      setTasks(updateTasks);
    }
  }

  const moveTaskDown =(index) =>{
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }
  
  

 
  return (
    <div>
      <Navbr tasks={tasks}/>
      <List
        tasks={tasks}
        handleInputChange={handleInputChange}
        addTask={addTask}
        deleteTask={deleteTask}
        moveTaskUp={moveTaskUp}
        moveTaskDown={moveTaskDown}
      />
    </div>
  );
}

export default Contacts;
