import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitTodo } from "../../redux/action"; 
import "./Form.scss";

const TodoForm = () => {
  const dispatch = useDispatch();
  const initialData = {
    title: "",
    description: "",
    dueDate: "",
    priority: "",
  };
  const todos = useSelector((state) => state.todo.todos);
  console.log("todoData:", todos);
  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formSubmitted = (e) => {
    e.preventDefault();
    dispatch(submitTodo(formData)).then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
        alert("Todo added successfully");
        setFormData(initialData);
      } else {
        alert("Failed to add todo: " + response.payload);
      }
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={formSubmitted}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            placeholder="Title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            placeholder="Description"
            type="text"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            id="dueDate"
            name="dueDate"
            placeholder="Due Date"
            type="date"
            value={formData.dueDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
          >
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TodoForm;
