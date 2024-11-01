const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

async function initDB() {
  const url = "mongodb://127.0.0.1:27017";
  let client = null;

  try {
    client = await new MongoClient(url);
    return client;
  } catch (error) {
    console.log(error);
  }
}

async function findCars(client, brand, resultsLimit) {
  try {
    const data = client
      .db("CarsDataBase")
      .collection("cars")
      .find({ brand })
      .limit(resultsLimit);

    const results = await data.toArray();

    if (results.length > 0) {
      console.log(`Found ${results.length} data: `);

      results.forEach((element) => {
        console.log(element);
      });
    } else {
      console.log("No such car");
    }
  } catch (error) {
    console.log(error);
  }
}

async function main() {
  let client = null;

  try {
    client = await initDB();
    const cars = await findCars(client, "Suzuki", 4);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

main();
