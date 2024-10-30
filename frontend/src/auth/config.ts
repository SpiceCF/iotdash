import { authAPI, userAPI } from '@/api-client';
import type { NextAuthConfig, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default {
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const userResponse = await authAPI.postAuthLogin({
            body: {
              username: credentials.username as string,
              password: credentials.password as string,
            },
          });

          if (!userResponse.data?.token) return null;

          const userToken = userResponse.data.token;

          const userProfile = userAPI
            .withPreMiddleware(async (context) => {
              context.init.headers = {
                ...context.init.headers,
                Authorization: `Bearer ${userToken}`,
              };
            })
            .getUsersMe();

          console.log(userProfile);

          // const user: User = {
          //   id: '1',
          //   name: 'John Doe',
          //   email: credentials.email as string,
          //   image: '',
          // };
        } catch (err) {
          console.error(err);
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async session({ session }) {
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
} satisfies NextAuthConfig;
