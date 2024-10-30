const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

async function processDb() {
  const url = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db("CarsDataBase");
    let collection = db.collection("cars");

    await collection.insertOne({
      brand: "Suzuki",
      name: "Swift",
      color: "black",
    });
    await collection.insertOne({
      brand: "Nissan",
      name: "Almera",
      color: "green",
    });
    await collection.insertOne({ brand: "Mazda", name: "6", color: "blue" });

    const cars = [
      { brand: "Ford", name: "Mustang", color: "white" },
      { brand: "Opel", name: "Corsa", color: "black" },
    ];

    const options = { ordered: false };

    const result = await collection.insertMany(cars, options);
    console.log(result.insertedCount + " cars were saved");
    const countEl = await collection.countDocuments();
    console.log(countEl);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

processDb();
