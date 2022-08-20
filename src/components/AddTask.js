// component file to add a new task

import React, { useState } from "react";
import TaskDataService from "../services/TaskService";
const AddTask = () => {
  const initialTaskState = {
    id: null,
    title: "",
    description: "",
    startDate: "", 
    endDate: "",
    priority: "",
    status: "",
  };
  const [task, setTask] = useState(initialTaskState);  
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const saveTask = () => {
    var data = {
      title: task.title,
      description: task.description,
      startDate: task.startDate, 
      endDate: task.endDate,
      priority: task.priority,
      status: task.status,
    };

    TaskDataService.create(data)
      .then(response => {
        setTask({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          startDate: response.data.startDate, 
          endDate: response.data.endDate,
          priority: response.data.priority,
          status: response.data.status,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTask = () => {
    setTask(initialTaskState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTask}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={task.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={task.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              className="form-control"
              id="startDate"
              required
              value={task.startDate}
              onChange={handleInputChange}
              name="startDate"
            />
          </div>


          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              className="form-control"
              id="endDate"
              required
              value={task.endDate}
              onChange={handleInputChange}
              name="endDate"
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <input
              type="text"
              className="form-control"
              id="priority"
              required
              value={task.priority}
              onChange={handleInputChange}
              name="priority"
            />
          </div>


          <div className="form-group">
            <label htmlFor="status">Status</label>
            <input
              type="text"
              className="form-control"
              id="status"
              required
              value={task.status}
              onChange={handleInputChange}
              name="status"
            />
          </div>
          <button onClick={saveTask} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTask;
