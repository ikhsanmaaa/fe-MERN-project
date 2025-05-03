import environment from "@/config/environment";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { UserExtended, JWTExtended, SessionsExtended } from "@/types/Auth";
import authServices from "@/services/auth.services";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  secret: environment.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        identifier: { label: "identifier", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const { identifier, password } = credentials as {
          identifier: string;
          password: string;
        };

        const result = await authServices.login({ identifier, password });
        const accessToken = result.data.data;
        const me = await authServices.getProfileWithToken(accessToken);
        const user = me.data.data;

        if (
          accessToken &&
          result.status === 200 &&
          user._id &&
          me.status === 200
        ) {
          user.accessToken = accessToken;
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWTExtended; user?: UserExtended }) {
      if (user) token.user = user;
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: SessionsExtended;
      token: JWTExtended;
    }) {
      session.user = token.user;
      session.accessToken = token.user?.accessToken;
      return session;
    },
  },
};
