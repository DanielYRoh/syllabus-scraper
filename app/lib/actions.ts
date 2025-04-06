'use server';

import { signIn, createUser } from "@/auth";
import { AuthError } from "next-auth";
import postgres from "postgres";
import bcryptjs from "bcryptjs";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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

export async function sendPDF(formData: FormData) {
    const PDF_file = formData.get("pdf-importer") as File;
    const sendFormData = new FormData();
    sendFormData.append('file', PDF_file)
    const response = await fetch("https://3186-130-212-146-53.ngrok-free.app", {
        method: 'POST',
        body: sendFormData,
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // Parse JSON response
    console.log('Success:', data);
}

export async function newUser(prevState: string | undefined, formData: FormData) {

    try {
        await createUser(formData);
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        } else if (error instanceof Error) {
            return error.message;
        }
    }


}
