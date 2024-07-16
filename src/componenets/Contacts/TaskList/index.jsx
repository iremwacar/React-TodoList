import PropTypes from "prop-types";

import Delete from "../../../assets/icons8-delete-48.png";
import Up from "../../../assets/icons8-up-30.png";
import Down from "../../../assets/icons8-down-30.png";
import "./index.css"

function TaskList({
  tasks,
  renderFilteredText,
  toggleTaskCompleted,
  deleteTask,
  moveTaskUp,
  moveTaskDown,
}) {
  return (
    <ol className="task-list">
      {tasks.map((task, index) => (
        <li
          key={index}
          className={`task-item ${task.passed ? "task-passed" : ""} ${
            task.completed ? "task-completed" : ""
          }`}
        >
          <div
            className="custom-checkbox"
            onClick={() => toggleTaskCompleted(index)}
          >
            <input type="checkbox" checked={task.completed} readOnly />
            <span className="checkmark">✓</span>
          </div>
          <span className="text">{renderFilteredText(task.taskTitle)}</span>
          <div className="task-details">
            <span className="task-details-text">{task.text}</span>
            <span className="task-details-date">
              Date: {task.datetime.toLocaleDateString()}
              Period: {task.period}
            </span>
          </div>
          <div>
            <button className="delete-button" onClick={() => deleteTask(index)}>
              <img className="delete-img" src={Delete} alt="Delete" />
            </button>
            <button className="up-button" onClick={() => moveTaskUp(index)}>
              <img className="up-img" src={Up} alt="Move Up" />
            </button>
            <button className="down-button" onClick={() => moveTaskDown(index)}>
              <img className="down-img" src={Down} alt="Move Down" />
            </button>
          </div>
        </li>
      ))}
    </ol>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      datetime: PropTypes.instanceOf(Date).isRequired,
      period: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      passed: PropTypes.bool,
    })
  ).isRequired,
  renderFilteredText: PropTypes.func.isRequired,
  toggleTaskCompleted: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  moveTaskUp: PropTypes.func.isRequired,
  moveTaskDown: PropTypes.func.isRequired,
};

export default TaskList;
