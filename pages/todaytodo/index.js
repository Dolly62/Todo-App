//todaytodo

import InputForm from "@/components/InputForm";
import ToDoLists from "@/components/ToDoLists";
import { MongoClient } from "mongodb";
import React, { useState } from "react";

const index = (props) => {
  // const [toDolist, setToDolist] = useState([]);
  const addToDoHandler = async (enteredTaskTitle) => {
    const response = await fetch("/api/new-todo", {
      method: "POST",
      body: JSON.stringify({
        title: enteredTaskTitle,
        status: "incomplete",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    // console.log(data);
  };

  const statusHandler = async (todoId) => {
    const response = await fetch("/api/update-todo", {
      method: "PATCH",
      body: JSON.stringify({
        todoId: todoId,
        status: "completed",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const deleteTodoHandler = async (todoId) => {
    // console.log(todoId);
    const response = await fetch(`/api/delete-todo?todoId=${todoId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      // setToDolist((prevTodo) => {
      //   const updatedTodos = prevTodo.filter((todo) => todo.id !== todoId);
      //   return updatedTodos;
      // });
      console.log("Successed");
    } else {
      alert("Error in deleting the task");
    }
  };
  return (
    <div>
      <InputForm onAddTodo={addToDoHandler} />
      <ToDoLists
        todoList={props.toDolist}
        onDeleteTodo={deleteTodoHandler}
        onStatusUpdate={statusHandler}
      />
    </div>
  );
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://first-todo_12:mw_Sy12Rgw@cluster0.yxmtcik.mongodb.net/todosLists?retryWrites=true&w=majority"
  );

  const db = client.db();
  const todoCollection = db.collection("todosLists");

  const todos = await todoCollection.find().toArray();

  client.close();

  return {
    props: {
      toDolist: todos.map((todo) => ({
        id: todo._id.toString(),
        todoTitle: todo.title,
        status: todo.status,
      })),
    },
    revalidate: 1,
  };
}

export default index;
