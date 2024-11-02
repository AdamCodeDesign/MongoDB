import { MongoClient as _MongoClient } from "mongodb";
import randomPerson from "./personData.js";
const MongoClient = _MongoClient;

async function initDB() {
  const url = "mongodb://127.0.0.1:27017";
  let client = null;

  try {
    client = new MongoClient(url);
    await client.connect();
    return client;
  } catch (error) {
    console.log('Bład polaczenia z serwerem',error);
  }
}

async function addStudentToDB(client) {
  try {
    const db = client.db("UniversityDataBase");
    let collection = db.collection("students");

    const result = await collection.insertOne(randomPerson());
  } catch (error) {
    console.log('Blad wczytania studenta',error);
  }
}

async function main() {
  let client = null;

  try {
    client = await initDB();
    await addStudentToDB(client);
    const collection = client.db("UniversityDataBase").collection("students");
  } catch (error) {
    console.log(error);
  } finally {
    if (client) await client.close();
  }
}

main()