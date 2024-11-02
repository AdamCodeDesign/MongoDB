import { MongoClient as _MongoClient } from "mongodb";
const MongoClient = _MongoClient;

async function initDB() {
  const url = "mongodb://127.0.0.1:27017";
  let client = null;

  try {
    client = new MongoClient(url);
    await client.connect();
    return client;
  } catch (error) {
    console.log(error);
  }
}

async function addDataToDB(client) {
  try {
    const db = client.db("carTestDB");
    let collection = db.collection("cars");

    const cars = [
      { brand: "Ford", name: "Mustang", year: 2005 },
      { brand: "Suzuki", name: "Swift", year: 2016 },
      { brand: "Nissan", name: "Almera", year: 1997 },
    ];

    const result = await collection.insertMany(cars, { ordered: true });
    console.log(`${result.insertedCount} cars were saved`);
  } catch (error) {
    console.log(error);
  }
}

async function showCars(collection, options = {}, resultLimit = 5) {
  try {
    let cursor = collection.find(options).limit(resultLimit);
    let results = await cursor.toArray();

    if (results.length > 0) {
      console.log(`Found ${results.length} data: `);

      results.forEach((element, i) => {
        console.log(element);
      });

      return results;
    } else {
      return "No data found";
    }
  } catch (error) {
    console.log(error);
  }
}

async function updateCarsByName(collection, name, updateFields) {
  await collection.updateMany({ name }, { $set: updateFields });
}

async function updateCarByName(collection, name, updateFields) {
  await collection.updateOne({ name }, { $set: updateFields });
}

async function main() {
  let client = null;

  try {
    client = await initDB();
    // await addDataToDB(client);

    const collection = client.db("carTestDB").collection("cars");

    await updateCarsByName(collection, "Almera", {
      color: "gold",
      topSpeed: 180,
    });
    await updateCarByName(collection, "Mustang", {
      color: "silver",
      topSpeed: 200,
      data: { seats: 5, doors: 3 },
    });
    const cars = await showCars(collection, {}, 10);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

main();
