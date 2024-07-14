import TaskItem from "../TaskItem/index";
import PropTypes from "prop-types";

function TaskList({ tasks, renderFilteredText, toggleTaskCompleted, deleteTask, moveTaskUp, moveTaskDown }) {
  return (
    <ol className="task-list">
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          index={index}
          renderFilteredText={renderFilteredText}
          toggleTaskCompleted={toggleTaskCompleted}
          deleteTask={deleteTask}
          moveTaskUp={moveTaskUp}
          moveTaskDown={moveTaskDown}
        />
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
