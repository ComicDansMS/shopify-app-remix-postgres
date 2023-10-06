import pool from "~/db.server";

export async function insertPerson(firstName, lastName, email) {
  try {
    const client = await pool.connect()

    const query = `
      INSERT INTO person(firstName, lastName, email)
      VALUES ($1, $2, $3)
      RETURNING id;
    `;

    const values = [firstName, lastName, email];

    const response = await client.query(query, values);

    client.release();
    
    return response.rows[0].id;

  } catch (error) {
    console.error('Error inserting person:', error.message);
    return 'error';
  }
}