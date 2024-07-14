import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";

function TaskFilter({ filterText, setFilterText, filterPeriod }) {
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
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => filterPeriod("once")}>Once</Dropdown.Item>
          <Dropdown.Item onClick={() => filterPeriod("weekly")}>Weekly</Dropdown.Item>
          <Dropdown.Item onClick={() => filterPeriod("monthly")}>Monthly</Dropdown.Item>
          <Dropdown.Item onClick={() => filterPeriod("yearly")}>Yearly</Dropdown.Item>
          <Dropdown.Item onClick={() => filterPeriod("all")}>All</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
TaskFilter.propTypes = {
    filterText: PropTypes.string.isRequired,
    setFilterText: PropTypes.func.isRequired,
    filterPeriod: PropTypes.func.isRequired,
  };

export default TaskFilter;
