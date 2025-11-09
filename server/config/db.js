import { MongoClient } from "mongodb";

let db;

export const connectDB = async () => {
  try {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log(`✅ MongoDB Connected to database: ${db.databaseName}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export const getDB = () => db;
