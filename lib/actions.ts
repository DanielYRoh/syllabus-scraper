"use server";

import { signIn, createUser } from "@/auth";
import { AuthError } from "next-auth";

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

export async function sendPDF(formData: FormData){
    console.log(formData)

    const userPDF = await formData.get("dropzone-file") as File;
    console.log(userPDF)
    const sendFormData = new FormData()
    sendFormData.append('file', userPDF)

    try {
        const response = await fetch("https://3553-130-212-147-97.ngrok-free.app/extract-pdf", {
            method: "POST",
            body: sendFormData,
        })
        if (!response.ok){
            throw new Error("HTTP ERROR!")
        }
        const data = await response.json();

        console.log(data)
    } catch (error){
        console.error(error)
    }

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
        }
        throw error;
    }


}
