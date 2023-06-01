const express = require("express");
const {
  addToWatchlist,
  getUserByEmail,
  deleteFromWatchlist,
  getUserBio,
  updateUserBio,
} = require("./handlers");

const app = express();
const port = process.env.PORT || 4000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());

//post to watchlist
app.post("/api/watchlist/add", (req, res) => {
  addToWatchlist(req, res);
});

//get watchlist
app.delete("/api/watchlist/delete", (req, res) => {
  deleteFromWatchlist(req, res);
});

//get user data
app.get("/api/get-data/:email", getUserByEmail);

//patch bio
app.patch("/api/update-bio/:email", (req, res) => {
  updateUserBio(req, res);
});

//get bio
app.get("/api/get-bio/:email", getUserBio);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
