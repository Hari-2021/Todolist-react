import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Assuming you have a CSS file for styling

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('Low');

  const addTask = () => {
    if (newTask.trim() === '') {
      return; // Don't add empty tasks
    }

    const newTaskObject = {
      id: tasks.length + 1,
      task: newTask,
      priority: priority,
    };

    setTasks([...tasks, newTaskObject]);
    setNewTask('');
    setPriority('Low');
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const renderTaskList = (priorityType) => {
    return (
      <div className="task-list-container">
        <h3>{`${priorityType} Priority List`}</h3>
        <ul className="list-group">
          {tasks
            .filter((task) => task.priority === priorityType)
            .map((task) => (
              <li key={task.id} className={"list-group-item ${task.isNew ? 'isNew' : ''}"}>
                {task.task}
                <button
                  className="btn btn-danger btn-sm float-end"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </li>
            ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <h2>Add a new task</h2>
          <div className="row">
            <div className="col-md-8 col-sm-8 mb-2">
              <input
                type="text"
                placeholder="Add a new task"
                className="form-control form-control-width-200"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
            </div>
            <div className="col-md-2 col-sm-2 mb-2">
              <select
                className="form-control"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
            </div>
            <div className="col-md-2 col-sm-2 mb-2">
              <button className="btn btn-primary" onClick={addTask}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4" id='task'>
        <div className="col-md-4 col-sm-12">
          {renderTaskList('Low')}
        </div>
        <div className="col-md-4 col-sm-12">
          {renderTaskList('Medium')}
        </div>
        <div className="col-md-4 col-sm-12">
          {renderTaskList('High')}
        </div>
      </div>
    </div>
  );
};

export default App;