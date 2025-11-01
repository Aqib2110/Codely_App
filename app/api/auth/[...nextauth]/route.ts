import NextAuth from "next-auth"
import { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

export const db = new PrismaClient();

export const authOptions:NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
            const user = await db.user.findUnique({
          where: { email: credentials?.email || "" }
        })

        if (!user) return null;

        const isValid = await bcrypt.compare(credentials!.password, user.password as string)
        if (!isValid) return null;

        return { id: user.id, name: user.name, email: user.email }
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        const existingUser = await db.user.findUnique({
          where: { email: user.email! }
        })

        if (!existingUser) {
          await db.user.create({
            data: {
              name: user.name!,
              email: user.email!,
              image:user.image!
            }
          })
        }
      }
      return true;
    },

    async jwt({ token, user }) {
    // This runs when JWT is created or updated
    if (user) {
      token.id = user.id;
    }
    return token;
   },

    async session({ session, token }) {
      if (token) {
      (session.user as any).id = token.id;
      (session.user as any).token = token;
    }
      const dbUser = await db.user.findUnique({
        where: { email: session.user?.email! }
      })
      if (dbUser) {
        (session.user as any).id = dbUser.id;
      }
      return session;
    }
  }
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }



