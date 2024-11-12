import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                mobile: credentials?.username,
                password: credentials?.password,
              }),
            }
          );

          if (res.status === 401) return null;
          const user = await res.json();

          if (user) {
            return user;
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null;
          }
        } catch (e) {
          throw new Error("Auth failed");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 2 minutes in seconds
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60, // 2 minutes in seconds
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (user.name) {
        return true;
      } else {
        return false;
      }
    },

    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    signOut: "/",
  },
  secret: process.env.SECRET,
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
