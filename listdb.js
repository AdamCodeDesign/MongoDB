const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

async function processDB() {
  const url = "mongodb://127.0.01:27017";
  const client = new MongoClient(url);

  try {
    await client.connect();
    const dbList = await client.db().admin().listDatabases();
    console.log("Databases: ");
    dbList.databases.forEach((el) => console.log(el.name));
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

processDB()