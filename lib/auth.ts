import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/config/firebase";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const usersRef = db.collection("users");
                    const snapshot = await usersRef.where("email", "==", credentials.email).get();

                    if (snapshot.empty) {
                        return null;
                    }

                    const userDoc = snapshot.docs[0];
                    const userData = userDoc.data();

                    const isValid = await bcrypt.compare(credentials.password, userData.password);

                    if (!isValid) {
                        return null;
                    }

                    return {
                        id: userDoc.id,
                        name: userData.name,
                        email: userData.email,
                    };
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
            }
        }),
    ],
    pages: {
        signIn: '/auth/login',
    },
    theme: {
        colorScheme: "dark",
    },
    callbacks: {
        async session({ session, token }) {
            if (session?.user && token?.sub) {
                // Add user ID to session
                (session.user as any).id = token.sub;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
            }
            return token;
        }
    },
    session: {
        strategy: "jwt",
    },
};
