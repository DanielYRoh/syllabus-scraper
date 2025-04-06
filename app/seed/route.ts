import bcryptjs from 'bcryptjs';
import postgres from 'postgres';


import { test_user } from '../lib/placeholder_data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


async function seedUsers() {
    await sql`
    CREATE DATABASE syllabi;

    CREATE TABLE IF NOT EXISTS syllabi.json_data (
      username TEXT NOT NULL UNIQUE,
      data JSONB NOT NULL
    );
  `;
}


export async function GET() {
    try {
        const result = await sql.begin((sql) => [
            seedUsers(),
        ]);


        return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
