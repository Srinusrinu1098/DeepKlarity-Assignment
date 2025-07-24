const client = require("../db/index");

const createTableAndInsert = async () => {
  try {
    
    // Step 1: Create table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS resumes (
        id SERIAL PRIMARY KEY,
        name TEXT,
        email TEXT,
        phone TEXT,
        linkedin_url TEXT,
        portfolio_url TEXT,
        summary TEXT,
        technical_skills TEXT,
        soft_skills TEXT,
        resume_rating INTEGER,
        improvement_areas TEXT,
        upskill_suggestions TEXT,
        orginal_file_name TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Table 'resumes' created or already exists.");

    process.exit();
  } catch (err) {
    console.error("❌ Error creating table:", err);
    process.exit(1);
  }
};

createTableAndInsert();
