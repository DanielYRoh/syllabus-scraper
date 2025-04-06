import postgres from 'postgres';
import { NextResponse } from 'next/server';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
    try {
        await sql.begin(async (sql) => {
            await sql`
                CREATE TABLE IF NOT EXISTS syllabi (
                    username TEXT NOT NULL UNIQUE,
                    data JSONB NOT NULL
                );
            `;
        });

        return NextResponse.json({ message: 'Database seeded successfully' });
    } catch (error) {
        console.error('Error seeding database:', error);
        return NextResponse.json({error}, { status: 500 });
    }
}
