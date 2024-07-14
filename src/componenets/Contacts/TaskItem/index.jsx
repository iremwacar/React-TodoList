import PropTypes from "prop-types";
import Delete from "../../../assets/icons8-delete-48.png";
import Up from "../../../assets/icons8-up-30.png";
import Down from "../../../assets/icons8-down-30.png";

function TaskItem({ task, index, renderFilteredText, toggleTaskCompleted, deleteTask, moveTaskUp, moveTaskDown }) {
  return (
    <li className={`${task.passed ? 'task-passed' : ''} ${task.completed ? 'task-completed' : ''}`}>
      <div className="custom-checkbox" onClick={() => toggleTaskCompleted(index)}>
        <input
          type="checkbox"
          checked={task.completed}
          readOnly
        />
        <span className="checkmark">✓</span>
      </div>
      <span className="text-title">{task.taskTitle}--</span>
      <span className="text">{renderFilteredText(task.text)}</span>
      <div>
        <span className="date-time">
          {task.datetime.toLocaleDateString()} - {task.period}
        </span>
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
  );
}

TaskItem.propTypes = {
    task: PropTypes.shape({
      text: PropTypes.string.isRequired,
      datetime: PropTypes.instanceOf(Date).isRequired,
      period: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      passed: PropTypes.bool,
      taskTitle: PropTypes.string.isRequired
    }).isRequired,
    index: PropTypes.number.isRequired,
    renderFilteredText: PropTypes.func.isRequired,
    toggleTaskCompleted: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    moveTaskUp: PropTypes.func.isRequired,
    moveTaskDown: PropTypes.func.isRequired,
  };


export default TaskItem;
