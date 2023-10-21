const { MongoClient } = require("mongodb");

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    // console.log(req.body);

    const client = await MongoClient.connect(
      "mongodb+srv://first-todo_12:mw_Sy12Rgw@cluster0.yxmtcik.mongodb.net/todosLists?retryWrites=true&w=majority"
    );

    const db = client.db();
    const todoCollection = db.collection("todosLists");

    const result = await todoCollection.insertOne(data);
    // console.log(result);

    client.close();

    res.status(201).json({ message: "Inserted successfully!" });
  }
};

export default handler;
