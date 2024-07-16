import PropTypes from 'prop-types';
import './index.css';

function TaskInput({
  newTask,
  title,
  selectedDate,
  selectedPeriod,
  handleInputChange,
  handleInputTitle,
  setSelectedDate,
  setSelectedPeriod,
  addTask,
  errors,
  touched,
}) {
  return (
    <div>
      <div className="task-input-container">
        <input
          type="text"
          name="title"
          value={title}
          className="task-title-input"
          placeholder="Enter a title..."
          onChange={handleInputTitle}
        />
        {touched.title && errors.title ? <div>{errors.title}</div> : null}
      </div>
      <div>
        <input
          type="text"
          name="newTask"
          value={newTask}
          className="task-input"
          placeholder="Enter a task..."
          onChange={handleInputChange}
        />
        {touched.newTask && errors.newTask ? <div>{errors.newTask}</div> : null}
      </div>
      <div>
        <input
          type="date"
          name="selectedDate"
          className="task-date-input"
          value={selectedDate.toISOString().split("T")[0]}
          onChange={(e) => setSelectedDate("selectedDate", new Date(e.target.value))}
        />
        {touched.selectedDate && errors.selectedDate ? <div>{errors.selectedDate}</div> : null}
      
        <select
          name="selectedPeriod"
          value={selectedPeriod}
          className="task-period-input"
          onChange={(e) => setSelectedPeriod("selectedPeriod", e.target.value)}
        >
          <option value="" label="Select period" />
          <option value="morning" label="Morning" />
          <option value="afternoon" label="Afternoon" />
          <option value="evening" label="Evening" />
        </select>
        {touched.selectedPeriod && errors.selectedPeriod ? <div>{errors.selectedPeriod}</div> : null}
      </div>
      <button className="add-button" type="submit" onClick={addTask}>Add</button>
    </div>
  );
}

TaskInput.propTypes = {
  newTask: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  selectedPeriod: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleInputTitle: PropTypes.func.isRequired,
  setSelectedDate: PropTypes.func.isRequired,
  setSelectedPeriod: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
};

export default TaskInput;
