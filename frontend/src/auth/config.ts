import { cookies } from 'next/headers';
import { authAPI, userAPI } from '@/services/api-client';
import type { NextAuthConfig, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

declare module 'next-auth' {
  interface Session {
    user: User &
      Awaited<ReturnType<typeof userAPI.getUsersMe>>['data'] & { jwt: string };
  }
}

export default {
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;
        try {
          const cookieStore = await cookies();
          const userResponse = await authAPI.postAuthLogin({
            body: {
              username: credentials.username as string,
              password: credentials.password as string,
            },
          });
          if (!userResponse.data?.token) return null;
          const userToken = userResponse.data.token;
          const userProfile = await userAPI
            .withPreMiddleware(async (context) => {
              context.init.headers = {
                ...context.init.headers,
                Authorization: `Bearer ${userToken}`,
              };
            })
            .getUsersMe();
          if (!userProfile.data) return null;

          const user = {
            name: userProfile.data.fullName,
            image: '',
            jwt: userToken,
            ...userProfile.data,
          } as User;

          cookieStore.set('user', JSON.stringify(user));
          cookieStore.set('accessToken', userToken);

          return user;
        } catch (err) {
          console.error(err);
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session }) {
      const cookieStore = await cookies();
      const user: User = JSON.parse(cookieStore.get('user')?.value || '{}');

      return {
        ...session,
        user,
      };
    },
    async jwt({ token }) {
      return { ...token };
    },
  },
} satisfies NextAuthConfig;
