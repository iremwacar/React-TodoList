import TaskInput from "../TaskInput/index";
import TaskList from "../TaskList/index";
import TaskFilter from "../TaskFilter/index";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import 'alertifyjs/build/css/alertify.css';
import 'alertifyjs/build/css/themes/default.css';

function List() {
  const [tasks, setTasks] = useState([]);
  const [filterText, setFilterText] = useState("");
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

  function filterDate(selectedDate) {
    let filteredDates = [];
    if (!selectedDate) {
      filteredDates = tasks;
    } else {
      filteredDates = tasks.filter((task) => {
        // Tarihi karşılaştırırken sadece gün, ay ve yıl bazında karşılaştırma yapmalıyız
        const taskDate = new Date(task.datetime);
        return (
          taskDate.getDate() === selectedDate.getDate() &&
          taskDate.getMonth() === selectedDate.getMonth() &&
          taskDate.getFullYear() === selectedDate.getFullYear()
        );
      });
    }
    setFilteredTasks(nowDate(filteredDates));
  }
  function nowDate(tasks) {
    const now = new Date();
    const twentyFourHoursLater = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    return tasks.map((task) => ({
      ...task,
      passed: task.datetime < twentyFourHoursLater,
    }));
  }

  const formik = useFormik({
    //initialValues: Form ilk yüklendiğinde hangi değerlerin alınacağını belirler.
    initialValues: {
      title: "",
      newTask: "",
      selectedDate: new Date(),
      selectedPeriod: "",
    },
    //validationSchema: Form doğrulama şeması
    validationSchema: Yup.object({
      title: Yup.string()
        .max(30, "The title you entered is too long. Please enter a maximum of 30 characters long.")
        .required("Please enter a title."),
      newTask: Yup.string()
        .max(300, "The text you entered is too long. Please enter a maximum of 300 characters long.")
        .required("Please enter a task."),
      selectedDate: Yup.date().required("Please select a date."),
      selectedPeriod: Yup.string().required("Please select a period."),
    }),
    //onSubmit: Form gönderildiğinde ne olacak
    onSubmit: (values, { resetForm }) => {
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          taskTitle: values.title,
          text: values.newTask,
          datetime: values.selectedDate,
          period: values.selectedPeriod,
          completed: false,
        },
      ]);
      resetForm();
    },
  });

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
      <form onSubmit={formik.handleSubmit}>
        <TaskInput
          newTask={formik.values.newTask}
          title={formik.values.title}
          selectedDate={formik.values.selectedDate}
          selectedPeriod={formik.values.selectedPeriod}
          handleInputChange={formik.handleChange}
          handleInputTitle={formik.handleChange}
          setTitle={formik.setFieldValue}
          setSelectedDate={formik.setFieldValue}
          setSelectedPeriod={formik.setFieldValue}
          addTask={formik.handleSubmit}
          errors={formik.errors}
          touched={formik.touched}
        />
      </form>
      <hr />
      <TaskFilter
        filterText={filterText}
        setFilterText={setFilterText}
        filterPeriod={filterPeriod}
        filterDate={filterDate}
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
