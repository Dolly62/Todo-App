//todaytodo

import InputForm from "@/components/InputForm";
import ToDoLists from "@/components/ToDoLists";
import React, { useState } from "react";

const index = () => {
  const [toDolist, setToDolist] = useState([]);
  const addToDoHandler = (taskTitle) => {
    // console.log(enteredTodo);
    setToDolist((prevTodo) => {
      const newToDo = {
        id: Math.random().toString(),
        todoTitle: taskTitle,
      };
      const updatedLists = [...prevTodo, newToDo];
      return updatedLists;
    });
  };

  const deleteTodoHandler = (todoId) => {
    setToDolist((prevTodo) => {
        const updatedTodos = prevTodo.filter((todo) => todo.id !== todoId) 
        return updatedTodos;
    })
  }
  return (
    <div>
      <InputForm onAddTodo={addToDoHandler} />
      <ToDoLists todoList={toDolist} onDeleteTodo={deleteTodoHandler}/>
    </div>
  );
};

export default index;
