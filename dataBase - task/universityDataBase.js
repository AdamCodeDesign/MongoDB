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
    console.log("Bład polaczenia z serwerem", error);
  }
}

async function addStudentToDB(client) {
  try {
    const db = client.db("UniversityDataBase");
    let collection = db.collection("students");

    const students = [];

    for (let i = 0; i < 20; i++) {
      students.push(randomPerson());
    }

    const result = await collection.insertMany(students);
  } catch (error) {
    console.log("Blad wczytania studenta", error);
  }
}

async function getStudents(collection, options = {}, resultLimit = 5) {
  try {
    const cursor = collection.find(options).limit(resultLimit);
    let results = await cursor.toArray();

    if (results.length > 0) {
      console.log(`Found ${results.length} students: `);

      results.forEach((element, i) => {
        console.log(element);
      });

      return results;
    }
  } catch (error) {
    console.log(error);
  }

  return [];
}

async function updateStudent(collection, options, updateFields) {
  await collection.updateOne(options, { $set: updateFields });
}

async function updateStudents(collection, options, updateFields) {
  await collection.updateMany(options, { $set: updateFields });
}

async function deleteStudent(collection, options) {
  return await collection.deleteMany(options);
}

async function main() {
  let client = null;

  try {
    client = await initDB();
    const collection = client.db("UniversityDataBase").collection("students");
    const studentsData = await collection.find({}).toArray();

    if (studentsData.length === 0) await addStudentToDB(client);

    let result = await deleteStudent(collection, { firstName: "Aleksandra" });
    console.log(`${result.deletedCount} students deleted`);

    const students = await getStudents(collection, { age: { $lte: 30 } }, 100);
  } catch (error) {
    console.log(error);
  } finally {
    if (client) await client.close();
  }
}

main();
