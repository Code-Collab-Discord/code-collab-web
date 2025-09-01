import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"
import { PrismaAdapter} from "@auth/prisma-adapter"
import { prisma } from "./lib/prismadb"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Discord
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
    newUser: '/onboarding',
  },
  debug: true
})