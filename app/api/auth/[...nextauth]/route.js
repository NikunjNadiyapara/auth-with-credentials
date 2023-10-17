import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import nextAuth from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";

export const authOpptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectMongoDB();
          const user = await User.findOne({ email });
          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Erro: ", error);
        }
      },
    }),
  ],
  session: {
    stratergy: "jwt",
  },
  secreat: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOpptions);

export { handler as GET, handler as POST };
