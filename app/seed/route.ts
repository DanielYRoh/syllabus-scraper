import bcryptjs from 'bcryptjs';
import postgres from 'postgres';


import { test_user } from '../lib/placeholder_data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


async function seedUsers() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const hashedPassword = await bcryptjs.hash(test_user.password, 10);
  return sql`
INSERT INTO users (id, name, username, password)
VALUES (${test_user.id}, ${test_user.name}, ${test_user.username}, ${hashedPassword})
ON CONFLICT (id) DO NOTHING;
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
