import Discord from "next-auth/providers/discord"
import type { NextAuthConfig } from "next-auth"

// Notice this is only an object, not a full Auth.js instance
export default {
    providers: [
        Discord
    ],
    pages: {
        signIn: '/auth/login',
        error: '/auth/login',
        newUser: '/onboarding',
    },
    debug: true,
} satisfies NextAuthConfig

