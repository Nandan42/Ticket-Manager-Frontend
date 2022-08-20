// component file to show list of tasks
import React, { useState, useEffect } from "react";
import TaskDataService from "../services/TaskService";
import { Link } from "react-router-dom";

const TasksList = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveTasks();    // use effect hook to retrieve tasks from backend
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveTasks = () => {
    TaskDataService.getAll()
      .then(response => {
        setTasks(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };



  const setActiveTask = (task, index) => {  // used to set active tasks if task is clicked on
    setCurrentTask(task);
    setCurrentIndex(index);             
  };


  const findByTitle = () => {                 // sends requests to backend to filter tasks based on title criteria and then changes state to only show required tasks
    TaskDataService.findByTitle(searchTitle)   
      .then(response => {
        setTasks(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Tasks List</h4>

        <ul className="list-group">
          {tasks &&
            tasks.map((task, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTask(task, index)}
                key={index}
              >
                {task.title}
              </li>
            ))}
        </ul>

      </div>
      <div className="col-md-6">
        {currentTask ? (
          <div>
            <h4>Task</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentTask.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentTask.description}
            </div>
            <div>
              <label>
                <strong>Start Date:</strong>
              </label>{" "}
              {currentTask.startDate}
            </div>
            <div>
              <label>
                <strong>End Date:</strong>
              </label>{" "}
              {currentTask.endDate}
            </div>
            <div>
              <label>
                <strong>Priority:</strong>
              </label>{" "}
              {currentTask.priority}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentTask.status}
            </div>

            <Link
              to={"/tasks/" + currentTask._id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Task...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksList;
