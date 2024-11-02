import { MongoClient as _MongoClient } from "mongodb";
const MongoClient = _MongoClient;

// nawiazywanie polaczenia z serwerem i tworzenie klienta
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

// tworzenie bazy danych i kolekcji
async function addDataToDB(client) {
  try {
    const db = client.db("smartphonesDataBase");
    let collection = db.collection("smartphones");

    const smartphones = [
      { brand: "apple", name: "iphone", color: "white" },
      { brand: "apple", name: "iphone", color: "green" },
      { brand: "apple", name: "iphone", color: "black" },
      { brand: "apple", name: "iphone", color: "red" },
    ];

    const result = await collection.insertMany(smartphones, { ordered: true });
    console.log(`${result.insertedCount} smartphones saved`);
  } catch (error) {
    console.error(error);
  }
}

// wyswietlanie bazy danych
async function showSmartphones(collection, options = {}, resultLimit = 10) {
  try {
    const cursor = collection.find(options).limit(resultLimit);
    const results = await cursor.toArray();

    if (results.length > 0) {
      console.log(`Found ${results.length} data: `);

      results.forEach((element, i) => {
        console.log(element);
      });

      return results;
    }
  } catch (error) {
    console.error(error);
  }

  return [];
}

async function updateSmartphonesByName(collection, name, updateFields) {
  await collection.updateMany({ name }, { $set: updateFields });
}

async function updateSmartphoneByName(collection, name, updateFields) {
  await collection.updateOne({ name }, { $set: updateFields });
}

// funkcja wywolujaca zmiany
async function main() {
  let client = null;
  try {
    client = await initDB();
    await addDataToDB(client);
    const collection = client
      .db("smartphonesDataBase")
      .collection("smartphones");

    await updateSmartphonesByName(collection, "iphone", { model: "max" });
    await updateSmartphoneByName(collection, "iphone", {
      color: "silver",
      screenSize: 6,
      data: { apps: ["netflix", "max", "appleTV"] },
    });

    await showSmartphones(collection, {}, 10);
  } catch (error) {
    console.error(error);
  } finally {
    if (client) await client.close();
  }
}

main();
