import NextAuth, {getServerSession} from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

const adminEmails = ['shamshodnurmurodov119@gmail.com'];

export const authOptions = {
  secret: "kFNIzOsuWgb3TG3tgCaIOnN1xhsHRuSkzzrAkf99mok=",
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({session,token,user}) => {
      if (adminEmails.includes(session?.user?.email)) {
        return session;
      } else {
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!adminEmails.includes(session?.user?.email)) {
      res.status(401).end();
      throw new Error('Not an admin');
    }
    // Proceed with admin access
    // ... (other logic for admin actions)
  } catch (error) {
    console.error('Admin request error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

