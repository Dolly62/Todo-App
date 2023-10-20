const { MongoClient, ObjectId } = require("mongodb");

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { id, status: abc} = req.body;
    console.log(abc);

    const client = await MongoClient.connect(
      "mongodb+srv://first-todo_12:mw_Sy12Rgw@cluster0.yxmtcik.mongodb.net/todosLists?retryWrites=true&w=majority"
    );

    const db = client.db();
    const todoCollection = db.collection("todosLists");

    const todoId = new ObjectId(id);
    console.log(todoId);

    try {
      console.log(status);
      const result = await todoCollection.updateOne(
        { _id: todoId },
        { $set: { status: status } },
      );
      console.log(result);

      if (result.value) {
        res.status(200).json({ message: "Updated successfully!" });
      } else {
        res.status(404).json({ message: "not found" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      client.close();
    }
  }
};

export default handler;
