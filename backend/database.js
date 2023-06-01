const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);

const getConnectedDatabase = async () => {
  try {
    // Connect to the MongoDB client
    await client.connect();

    // Access the "data" database
    const db = client.db("data");
    console.log("Connected to database!");

    return db;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to connect to the database.");
  }
};

module.exports = { client, getConnectedDatabase };
