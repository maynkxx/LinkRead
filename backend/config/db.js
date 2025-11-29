const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const connectDB = async () => {
  let uri = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/linkred";
  
  if (uri.includes('localhost')) {
    uri = uri.replace('localhost', '127.0.0.1');
  }

  try {
    console.log(`Attempting to connect to MongoDB at: ${uri}`);
    // Short timeout to fail fast if local DB is not running
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Local MongoDB connection failed. Starting in-memory database...");
    try {
      const mongod = await MongoMemoryServer.create();
      const memoryUri = mongod.getUri();
      console.log(`In-memory MongoDB started at: ${memoryUri}`);
      const conn = await mongoose.connect(memoryUri);
      console.log(`MongoDB Connected (In-Memory): ${conn.connection.host}`);
    } catch (memError) {
      console.error(`Database Connection Error: ${memError.message}`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
