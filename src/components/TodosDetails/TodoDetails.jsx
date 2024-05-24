import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, deleteTodo, editTodo } from "../../redux/action";
import "./TodoDetails.scss";

const TodoDetails = () => {
  const dispatch = useDispatch();
  const [selectedTodo, setSelectedTodo] = useState({});
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);

  const todos = useSelector((state) => state.todo.todos);
  
  console.log("TodoDetails form data>>>>>>", todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (todo) => {
    setSelectedTodo(todo);
    setEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    console.log("Selected Todo:", selectedTodo);

    if (selectedTodo && selectedTodo.id) {
      dispatch(
        editTodo({ 
          todoId: selectedTodo.id, 
          updatedTodo: {
            title: selectedTodo.title,
            description: selectedTodo.description,
            dueDate: selectedTodo.dueDate,
            priority: selectedTodo.priority,
          }
        })
      ).then(() => {
        setEditModalOpen(false);
      }).catch((error) => {
        console.error("Failed to edit todo:", error);
      });
    } else {
      console.error("Selected todo or id is not defined:", selectedTodo);
    }
  };

  const handleView = (todo) => {
    setSelectedTodo(todo);
    setViewModalOpen(true);
  };

  return (
    <div>
      {todos ? (
        todos.map((item) => (
          <div className="todo-card" key={item.id}>
            <div className="todo-card-body">
              <h5 className="todo-card-title">Title: {item.title}</h5>
              <h5 className="todo-card-title">Description: {item.description}</h5>
              <h5 className="todo-card-title">Due Date: {item.dueDate}</h5>
              <h5 className="todo-card-title">Priority: {item.priority}</h5>
              <div className="todo-card-actions">
                <button onClick={() => handleView(item)}>View</button>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No todos available</p>
      )}

      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h5>Edit Todo</h5>
              <button onClick={() => setEditModalOpen(false)}>Close</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  name="title"
                  placeholder="Title"
                  type="text"
                  value={selectedTodo ? selectedTodo.title : ""}
                  onChange={(e) =>
                    setSelectedTodo({
                      ...selectedTodo,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  id="description"
                  name="description"
                  placeholder="Description"
                  type="text"
                  value={selectedTodo ? selectedTodo.description : ""}
                  onChange={(e) =>
                    setSelectedTodo({
                      ...selectedTodo,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="dueDate">Due Date</label>
                <input
                  id="dueDate"
                  name="dueDate"
                  placeholder="Due Date"
                  type="date"
                  value={selectedTodo ? selectedTodo.dueDate : ""}
                  onChange={(e) =>
                    setSelectedTodo({
                      ...selectedTodo,
                      dueDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select
                  id="priority"
                  name="priority"
                  value={selectedTodo ? selectedTodo.priority : ""}
                  onChange={(e) =>
                    setSelectedTodo({
                      ...selectedTodo,
                      priority: e.target.value,
                    })
                  }
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={handleSaveEdit}>Save</button>
              <button onClick={() => setEditModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {isViewModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h5>Todo Details</h5>
              <button onClick={() => setViewModalOpen(false)}>Close</button>
            </div>
            <div className="modal-body">
              <h5>Title: {selectedTodo.title}</h5>
              <h5>Description: {selectedTodo.description}</h5>
              <h5>Due Date: {selectedTodo.dueDate}</h5>
              <h5>Priority: {selectedTodo.priority}</h5>
            </div>
            <div className="modal-footer">
              <button onClick={() => setViewModalOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoDetails;
