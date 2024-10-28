const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

async function processDB() {
  const url = "mongodb://127.0.01:27017";
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db("schoolDbTest");
    let collection = db.collection("students");

    await collection.insertOne({ name: "Joanna", email: "asia@example.com" });
    await collection.insertOne({ name: "Michael", email: "michu@example.com" });

    const students = [
      { name: "Piter", email: "piotr@example.com" },
      { name: "Jacob", email: "jacob@example.com" },
      { name: "Suzanne", email: "suzi@example.com" },
    ];

    const options = { ordered: true }; // jak w jednym wystapi blad to reszta tez nie
    // zostanie zapisana do bazy

    const result = await collection.insertMany(students, options);
    console.log(result.insertedCount + " students were saved");
    
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

processDB();
