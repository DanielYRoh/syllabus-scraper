import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from "next-auth/providers/credentials";
import { z } from 'zod';

import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcryptjs';
import postgres from 'postgres';

const UserSchema = z.object({
    id: z.string().optional(),
    username: z.string(),
    name: z.string(),
    password: z.string().min(6),
});

const CreateUser = UserSchema.omit({ id: true })
 
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
 
async function getUser(username: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE username=${username}`;
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function createUser(formData : FormData) :  Promise<boolean | undefined>{
  const { name, username, password } = CreateUser.parse({
          name: formData.get("name"),
          username: formData.get("username"),
          password: formData.get("password"),
      })

      if (password.length < 6) throw new Error("password too short!")
  
      try{
          const hashedPassword = await bcrypt.hash(password, 10);
        await sql`
        INSERT INTO users (name, username, password)
        VALUES (${name}, ${username}, ${hashedPassword})
        `;
        return true;

      } catch (error) {
        console.error(error)
        if (error instanceof Error){
          throw new Error( error.message)
        }
        throw error;
      }
      
}


export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z.object({
                    username: z.string(), password: z.string().min(6)
                }).safeParse(credentials);
                
                if (parsedCredentials.success) {
                    const { username, password } = parsedCredentials.data;
                    const user = await getUser(username);
                    if (!user) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password);
                      console.log(username, passwordsMatch)
                    if (passwordsMatch) return user;
                }
                console.log(parsedCredentials.error)
                console.log("invalid credentials.")
                return null;
            },
        }),

    ],
});