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
        status: "incomplete"
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    // console.log(data);

    // const deleteTodoHandler = (todoId) => {
    //   setToDolist((prevTodo) => {
    //       const updatedTodos = prevTodo.filter((todo) => todo.id !== todoId)
    //       return updatedTodos;
    //   })
  };
  return (
    <div>
      <InputForm onAddTodo={addToDoHandler} />
      <ToDoLists todoList={props.toDolist} />
    </div>
  );
};

export async function getStaticProps(){
  const client = await MongoClient.connect(
    "mongodb+srv://first-todo_12:mw_Sy12Rgw@cluster0.yxmtcik.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();
  const todoCollection = db.collection("todosLists");

  const todos = await todoCollection.find().toArray();

  client.close();


  return {
    props: {
      toDolist : todos.map((todo) => ({
        id: todo._id.toString(),
        todoTitle: todo.title
      })),
    },
    revalidate: 1,
  };
}

export default index;
