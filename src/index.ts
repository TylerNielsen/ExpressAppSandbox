import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";

const dbName = process.env.NODE_ENV === "dev" ? "database-test" : "database-prod";
const url = `mongodb://database:27017/${dbName}`;
const options = {
  useNewUrlParser: true,
  reconnectTries: 60,
  reconnectInterval: 1000
};

import routes from "./routes/routes.js";
const port = process.env.PORT || 8090;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", routes);
app.use((req, res) => {
  res.status(404).send({error: "No resource found"});
});

console.log("Attempting to connect to DB");
mongoose.connect(url, options, (err) => {
  console.error.bind(console, "connection error:");
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("DB is open!");
});

app.locals.db = db;

app.listen(port, () => {
  console.log("Listening on port " + port);
  app.emit("APP_STARTED");
});

module.exports = app;
