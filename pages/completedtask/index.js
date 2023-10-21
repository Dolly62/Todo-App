import { MongoClient } from "mongodb";

const CompletedTask = (props) => {
  const filteredCompletedTask = props.toDolist.filter(
    (completeTask) => completeTask.status === "completed"
  );
  return (
    <div>
      <h1>Completed Task</h1>
      {filteredCompletedTask.map((todo) => (
        <div key={todo.id}>{todo.todoTitle}</div>
      ))}
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

export default CompletedTask;
