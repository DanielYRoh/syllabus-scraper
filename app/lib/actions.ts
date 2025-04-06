'use server';

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import postgres from "postgres";
import bcryptjs from "bcryptjs";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const UserSchema = z.object({
    id: z.string().optional(),
    username: z.string(),
    name: z.string(),
    password: z.string().min(6),
});

const CreateUser = UserSchema.omit({ id: true })
export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function newUser(prevState: string | undefined, formData: FormData) {
    const { name, username, password } = CreateUser.parse({
        name: formData.get("name"),
        username: formData.get("username"),
        password: formData.get("password"),
    })

    const hashedPassword = await bcryptjs.hash(password, 10);
    await sql`
    INSERT INTO users (name, username, password)
    VALUES (${name}, ${username}, ${hashedPassword})
    ON CONFLICT (username) DO NOTHING;
    `;

    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }



}
