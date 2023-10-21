const { MongoClient, ObjectId } = require("mongodb");

const handler = async (req, res) => {
  if (req.method === "PATCH") {
    // const { todoId } = req.query;
    const {todoId, status } = req.body;
    // console.log(req.body);

    const client = await MongoClient.connect(
      "mongodb+srv://first-todo_12:mw_Sy12Rgw@cluster0.yxmtcik.mongodb.net/todosLists?retryWrites=true&w=majority"
    );

    const db = client.db("todosLists");
    const todoCollection = db.collection("todosLists");

    const id = new ObjectId(todoId);
    // console.log(toDoId);

    try {
      // console.log(status);
      const result = await todoCollection.updateOne(
        { _id: id },
        { $set: { status: status } }
      );
      // console.log(result);

      if (result.modifiedCount>0) {
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
