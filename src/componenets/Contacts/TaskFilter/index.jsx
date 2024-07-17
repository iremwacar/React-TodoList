import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import  { useState } from 'react';

function TaskFilter({ filterText, setFilterText, filterPeriod, filterDate }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    filterDate(date);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Search... "
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Period
        </Dropdown.Toggle>
        <Dropdown.Menu><Dropdown.Item onClick={() => filterPeriod("weekly")}>Weekly</Dropdown.Item>
          <Dropdown.Item onClick={() => filterPeriod("monthly")}>Monthly</Dropdown.Item>
          <Dropdown.Item onClick={() => filterPeriod("yearly")}>Yearly</Dropdown.Item>
          <Dropdown.Item onClick={() => filterPeriod("all")}>All</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <label htmlFor="dateFilter">Date:</label>
        <DatePicker
          id="dateFilter"
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select a date"
        />
      
    </div>
  );
}
TaskFilter.propTypes = {
    filterText: PropTypes.string.isRequired,
    setFilterText: PropTypes.func.isRequired,
    filterPeriod: PropTypes.func.isRequired,
    filterDate: PropTypes.func.isRequired,
  };

export default TaskFilter;
