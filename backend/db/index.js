const { Client } = require("pg");
require("dotenv").config({ path: "../.env" });

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
  ssl: {
    rejectUnauthorized: false, // Needed for Railway
  },
});

const tableConnect = async () => {
  
  try {
    await client.connect();
    console.log("✅ Connected to DB");
  } catch (e) {
    console.log("error connectign", e);
  }
};

tableConnect();
module.exports = client;
