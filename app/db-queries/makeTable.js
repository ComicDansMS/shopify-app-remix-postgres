import pool from "~/db.server";

export async function makeTable() {  
  try {
    const client = await pool.connect()
    
    const query = `
      CREATE TABLE person (
        id SERIAL PRIMARY KEY,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await client.query(query)

    client.release()

  } catch (error) {
    console.error('Error creating table:', error.message)
  }
}
