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
    } else {
      return "No data found";
    }
  } catch (error) {
    console.error(error);
  }
}

async function updateSmartphonesByName(collection, name, updateFields) {
  await collection.updateMany({ name }, { $set: updateFields });
}

async function updateSmartphoneByName(collection, name, updateFields) {
  await collection.updateOne({ name }, { $set: updateFields });
}

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
      screenSIze: 6,
      data: { apps: ["netflix", "max", "appleTV"] },
    });

    await showSmartphones(collection, {}, 10);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

main();
