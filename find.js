const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

async function initDB() {
  const url = "mongodb://127.0.0.1:27017";
  let client = null;

  try {
    client = new MongoClient(url);
    await client.connect()
    return client;
  } catch (error) {
    console.log(error);
  }
}

async function findStudents(client, name, resultsLimit) {
  try {
    const data = client
      .db("schoolDbTest")
      .collection("students")
      .find({ name })
      .limit(resultsLimit);

    const result = await data.toArray();

    if (result.length > 0) {
      console.log(`Found ${result.length} data: `);

      result.forEach((element, i) => {
        console.log(element);
      });

      return result;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

async function main() {
  let client = null;

  try {
    client = await initDB();
    const students = await findStudents(client, "Joanna", 3);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

main()