import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { login } from './features/auth/lib/apis/login.api';

if (!process.env.NEXTAUTH_URL) {
  process.env.NEXTAUTH_URL =
    process.env.NEXT_PUBLIC_APP_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
}

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' },
        rememberMe: { label: 'rememberMe', type: 'text' },
      },
      async authorize(credentials) {
        const response = await login({
          username: credentials?.username ?? '',
          password: credentials?.password ?? '',
        });

        if (response.status && response.payload) {
          return {
            id: response.payload.user.id,
            user: response.payload.user,
            accessToken: response.payload.token,
            rememberMe: credentials?.rememberMe === 'true',
          };
        }

        const apiMessage = 'message' in response ? response.message : undefined;
        const apiErrors = 'errors' in response ? response.errors : undefined;
        const apiCode = 'code' in response ? response.code : undefined;
        const kind =
          apiMessage === 'NETWORK_ERROR' || (typeof apiCode === 'number' && apiCode !== 401)
            ? 'unexpected'
            : 'credentials';

        throw new Error(
          JSON.stringify({
            code: apiCode,
            kind,
            message: apiMessage,
            messages: apiErrors?.length
              ? apiErrors.map((error) => ({ path: error.path, message: error.message }))
              : undefined,
          }),
        );
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: Number(process.env.NEXTAUTH_SESSION_MAXAGE ?? 86400), // 24 hours
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.user = user.user;
        token.rememberMe = user.rememberMe;
      }

      if (session && trigger === 'update') {
        if (session.accessToken) {
          token.accessToken = session.accessToken;
        }

        if (session.user) {
          token.user = session.user;
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
};
