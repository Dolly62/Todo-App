import { useState } from "react";
import classes from "./InputForm.module.css";

function InputForm(props) {
  const [isForm, setIsForm] = useState(false);
  const [enteredTaskTitle, setTaskTitle] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();


    props.onAddTodo(enteredTaskTitle);

    setTaskTitle("");
  };

  return isForm ? (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="title">Task</label>
        <input
          type="text"
          required
          id="title"
          value={enteredTaskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
      </div>
      <div className={classes.actions}>
        <button>Add Task</button>
      </div>
    </form>
  ) : (
    <button className={classes.taskadd}
      onClick={() => setIsForm(true)}
    >
      Add a task
    </button>
  );
}

export default InputForm;
