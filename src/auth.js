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
          college: credential?.college,
        };

        return user;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session?.registrationCompleted) {
        // console.log("first");
        token.registrationCompleted = session?.registrationCompleted;
        token.college = session?.college;
      } else if (user) {
        token.username = user?.username;
        token.role = user?.role;
        token.id = user?.id;
        token.registrationCompleted = user?.registrationCompleted;
        token.college = user?.college;
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
          college: token?.college,
        };
      }

      return session;
    },
  },
});
