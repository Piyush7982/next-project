import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      async authorize(credential) {
        const user = { username: "Admin101@gmail.com" };
        if (credential.username === user.username) {
          return user;
        }

        return null;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // console.log(user);
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        // console.log(session);
        session.user.role = token.role;
      }
      return session;
    },
  },
});
