import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTodos } from "../../redux/action";
import "./Header.scss";


const Header = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const { todos } = useSelector((state) => state.todo);
  console.log("todoData:", todos);
  const todosCount = todos ? todos.length : 0;
  return (
    <div className="header bg-secondary text-white fs-4">
      <ul className="d-flex list-unstyled gap-3">
        <li>
          <h1 className="text-decoration-none text-white logo">
            TODO APP
          </h1>
        </li>
        <li>
          <Link to="/" className="text-decoration-none text-white">
            Add Todo
          </Link>
        </li>
        <li>
          <Link to="/all-todos" className="text-decoration-none text-white">
            All Todos ({todosCount})
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
