const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://ac:${process.env.MONGO_PASS}@cluster0.uhifu5t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Collections
    const routenCollection = client
      .db("accounting-solution")
      .collection("routen");

    const headlineCollection = client
      .db("accounting-solution")
      .collection("headline");

    const teachersCollection = client
      .db("accounting-solution")
      .collection("teachers");

    const studentCollection = client
      .db("accounting-solution")
      .collection("students");

    const noticeCollection = client
      .db("accounting-solution")
      .collection("notice");

    const admissionCollection = client
      .db("accounting-solution")
      .collection("admission");

    // Routen Api Routens
    app.get("/routen", async (req, res) => {
      const allRouten = await routenCollection.find().toArray();

      res.send(allRouten);
    });

    app.post("/routen", async (req, res) => {
      const routen = req.body;
      const result = await routenCollection.insertOne(routen);
      res.send(result);
    });

    app.delete("/routen/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await routenCollection.deleteOne(query);
      res.send(result);
    });

    // Headline Api Routens
    app.get("/headline", async (req, res) => {
      const headline = await headlineCollection.find().toArray();
      res.send(headline);
    });

    app.post("/headline", async (req, res) => {
      const headline = req.body;
      const result = await headlineCollection.insertOne(headline);
      res.send(result);
    });

    app.put("/headline/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const title = req.body;

      const updatedDoc = {
        $set: {
          title: title.title,
        },
      };

      const result = await headlineCollection.updateOne(query, updatedDoc);
      res.send(result);
    });

    // Teachers Api Routens
    app.get("/teachers", async (req, res) => {
      const result = await teachersCollection.find().toArray();
      res.send(result);
    });

    app.get("/teachers/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await teachersCollection.findOne(query);
      res.send(result);
    });

    app.post("/teachers", async (req, res) => {
      const teacher = req.body;
      const result = await teachersCollection.insertOne(teacher);
      res.send(result);
    });

    app.delete("/teachers/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await teachersCollection.deleteOne(query);
      res.send(result);
    });

    // Students Api Routens
    app.get("/students", async (req, res) => {
      const result = await studentCollection.find().toArray();
      res.send(result);
    });

    app.post("/students", async (req, res) => {
      const student = req.body;
      const result = await studentCollection.insertOne(student);
      res.send(result);
    });

    app.delete("/students/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await studentCollection.deleteOne(query);
      res.send(result);
    });

    // Notice Api Routens
    app.get("/all-notice", async (req, res) => {
      const result = await noticeCollection.find().toArray();
      res.send(result);
    });

    app.post("/all-notice", async (req, res) => {
      const notice = req.body;
      const result = await noticeCollection.insertOne(notice);
      res.send(result);
    });

    app.delete("/all-notice/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await noticeCollection.deleteOne(query);
      res.send(result);
    });

    // admission Api Routens
    app.get("/admission", async (req, res) => {
      const result = await admissionCollection.find().toArray();
      res.send(result);
    });

    app.post("/admission", async (req, res) => {
      const admission = req.body;
      const result = await admissionCollection.insertOne(admission);
      res.send(result);
    });

    app.delete("/admission/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await admissionCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
