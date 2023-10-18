import React, { Fragment } from "react";
import { MdDeleteOutline } from "react-icons/md";

const ToDoLists = (props) => {
  return (
    <Fragment>
      <div>
        {props.todoList.map((todo) => (
          <div key={todo.id}>
            <input type="checkbox" /> {todo.todoTitle}
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
