import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'admin' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          console.error('No credentials provided');
          throw new Error('Credentials are missing');
        }

        console.log('Credentials:', credentials);

        try {
          const res = await fetch('https://Api-003.com/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              number: credentials.username,
              password: credentials.password,
            }),
          });

          if (!res.ok) {
            console.error('Failed to login: response status', res.status);
            throw new Error('Failed to login');
          }

          const data = await res.json();
          console.log('API response:', data);

          if (data.accessToken) {
            return { id: data.userId, name: data.name, email: data.email, token: data.accessToken };
          } else {
            console.error('No access token in response');
            return null;
          }
        } catch (error) {
          console.error('Authorize error:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.token = token.token;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.token = user.token;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure the secret is set
});

export { handler as GET, handler as POST };
