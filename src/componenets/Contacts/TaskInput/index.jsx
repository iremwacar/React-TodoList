import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import "./index.css"; // Stil dosyası

function TaskInput({
  newTask,
  selectedDate,
  selectedPeriod,
  handleInputChange,
  title,
  handleInputTitle,
  setSelectedDate,
  setSelectedPeriod,
  addTask,
}) {
  return (
    <div className="task-input-container">
      <input
        type="text"
        className="title-input"
        placeholder="Enter a title..."
        value={title}
        onChange={handleInputTitle}
      />
      <textarea
        className="task-input"
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
};

export default TaskInput;
