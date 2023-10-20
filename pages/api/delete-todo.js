const { ObjectId, MongoClient } = require("mongodb");

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    const { todoId } = req.query;

    const client = await MongoClient.connect(
      "mongodb+srv://first-todo_12:mw_Sy12Rgw@cluster0.yxmtcik.mongodb.net/todosLists?retryWrites=true&w=majority"
    );

    const db = client.db();
    const todoCollection = db.collection("todosLists");

    const toDoId = new ObjectId(todoId)
    const deleteTodo = await todoCollection.deleteOne({
      _id: toDoId,
    });

    client.close();
    res.status(200).json({ message: "Successfully deleted" });
  }
};

export default handler;
