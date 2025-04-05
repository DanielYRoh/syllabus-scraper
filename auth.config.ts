import type { NextAuthConfig } from "next-auth";
export const authConfig = {
    // pages that you need to configure
    // future probably need to create a "Create Account" for this
    pages: {
        signIn: "/login",
        newUser: "/login/create-account"
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false;
            } else if (isLoggedIn) {
                return Response.redirect(new URL("/dashboard", nextUrl))
            }
            return true;
        }
    },
    providers: [],
} satisfies NextAuthConfig