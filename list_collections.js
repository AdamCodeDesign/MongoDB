const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

async function processDB() {
  const url = "mongodb://127.0.01:27017";
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db("local");
    const collections = await db.listCollections().toArray();
    console.log("collections: ", collections);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

processDB();
