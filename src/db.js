const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();


const MONGO_URI = process.env.MONGO_URI;

const connectToDatabase = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(MONGO_URI);
};

module.exports = {
  connectToDatabase,
};