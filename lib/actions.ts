"use server";

import { signIn, createUser, signOut } from "@/auth";
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

export async function signOutHelper(){
    await signOut({ redirectTo: "/" });
}

export async function sendPDF(previousState: string | undefined, formData: FormData){
    const username = await formData.get("username") as string;
    const userPDF = await formData.get("dropzone-file") as File;
    console.log(userPDF, username)
    const sendFormData = new FormData()
    sendFormData.append('file', userPDF)

    

    try {
        const response = await fetch("https://2e95-130-212-147-97.ngrok-free.app/extract-pdf", {
            method: "POST",
            body: sendFormData,
        })
        if (!response.ok){
            throw new Error("HTTP ERROR!")
        }
        const data = await response.json();
        return JSON.stringify(data)

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

