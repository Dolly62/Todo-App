import React, { Fragment } from "react";
import { MdDeleteOutline } from "react-icons/md";

const ToDoLists = (props) => {
  const filteredTodos = props.todoList.filter(
    (todo) => todo.status === "incomplete"
  );
  return (
    <Fragment>
      <div>
        {filteredTodos.map((todo) => (
          <div key={todo.id}>
            <input
              type="checkbox"
              checked={todo.status === "completed"}
              onChange={() => props.onStatusUpdate(todo.id)}
            />{" "}
            {todo.todoTitle}
            <MdDeleteOutline
              style={{ fontSize: "1.2rem" }}
              onClick={() => props.onDeleteTodo(todo.id)}
            />
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default ToDoLists;
