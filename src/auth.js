import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      type: "credentials",
      async authorize(credential) {
        const user = {
          username: credential?.username,
          role: credential?.role,
          id: credential?.userId,
          registrationCompleted: credential?.registrationCompleted,
        };

        return user;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,

  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user?.username;
        token.role = user?.role;
        token.id = user?.id;
        token.registrationCompleted = user?.registrationCompleted;
      }

      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user = {
          role: token?.role,
          username: token?.username,
          id: token?.id,
          registrationCompleted: token?.registrationCompleted,
        };
      }

      return session;
    },
  },
});
