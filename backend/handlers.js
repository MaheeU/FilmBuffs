const { getConnectedDatabase } = require("./database");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const errorHandler = (res, error) => {
  console.error(error);
  res.sendStatus(500);
};

//Add to watchlist
const addToWatchlist = async (req, res) => {
  try {
    const { email, movieId } = req.body;

    const db = await getConnectedDatabase("data");
    const collection = db.collection("users");

    const user = await collection.findOne({ email });
    const watchlist = user.watchlist ?? [];

    if (watchlist.includes(movieId)) {
      return res
        .status(400)
        .json({ message: "Movie already exists in watchlist" });
    }

    const result = await collection.updateOne(
      { email },
      { $push: { watchlist: movieId } }
    );

    if (result.modifiedCount === 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

//Delete from watchlist

const deleteFromWatchlist = async (req, res) => {
  try {
    const { email, movieId } = req.body;

    const db = await getConnectedDatabase("data");
    const collection = db.collection("users");

    const user = await collection.findOne({ email });
    const watchlist = user.watchlist ?? [];

    if (!watchlist.includes(movieId)) {
      return res
        .status(400)
        .json({ message: "Movie does not exist in watchlist" });
    }

    const result = await collection.updateOne(
      { email },
      { $pull: { watchlist: movieId } }
    );

    if (result.modifiedCount === 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

//GETS data by user email
const getUserByEmail = async (req, res) => {
  const { email } = req.params;

  let client;

  try {
    client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("Client connected");

    const db = client.db("data");
    let user = await db.collection("users").findOne({ email });

    if (!user) {
      const newUser = {
        email,
        watchlist: [],
      };
      await db.collection("users").insertOne(newUser);
      user = newUser;
    } else if (!user.watchlist) {
      await db
        .collection("users")
        .updateOne({ email }, { $set: { watchlist: [] } });
      user.watchlist = [];
    }

    res.status(200).json({ status: 200, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "Error getting user data" });
  } finally {
    if (client) {
      await client.close();
      console.log("Client disconnected");
    }
  }
};

//Patch bio
const updateUserBio = async (req, res) => {
  try {
    const { email } = req.params;
    const { bio } = req.body;

    const db = await getConnectedDatabase("data");
    const collection = db.collection("users");

    const user = await collection.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.bio = bio;

    const result = await collection.updateOne(
      { email },
      { $set: { bio: user.bio } }
    );

    if (result.modifiedCount === 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

const getUserBio = async (req, res) => {
  try {
    const { email } = req.params;

    const db = await getConnectedDatabase("data");
    const collection = db.collection("users");

    const user = await collection.findOne({ email });

    if (user) {
      const { bio } = user;
      res.status(200).json({ bio });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addToWatchlist,
  getUserByEmail,
  deleteFromWatchlist,
  updateUserBio,
  getUserBio,
};
