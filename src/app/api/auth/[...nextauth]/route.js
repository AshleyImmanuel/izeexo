import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session, user }) {
            if (session.user) {
                session.user.id = user.id;

                // Debugging Admin Role
                console.log("---- ADMIN CHECK ----");
                console.log("Session Email:", session.user.email);
                console.log("Env Admin Email:", process.env.ADMIN_EMAIL);
                console.log("Match Status:", session.user.email === process.env.ADMIN_EMAIL);

                // Secure Admin Check using Environment Variable
                if (session.user.email === process.env.ADMIN_EMAIL) {
                    session.user.role = 'admin';
                } else {
                    session.user.role = 'user';
                }
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            // Allows callback URLs on the same origin
            if (new URL(url).origin === baseUrl) return url;
            // Default to dashboard
            return `${baseUrl}/dashboard`;
        },
    },
    pages: {
        signIn: "/auth/signin",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
