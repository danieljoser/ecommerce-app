import NextAuth, { AuthOptions } from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import User from '@/models/user';
import { connectToDB } from '@/utils/database';
import comparePassword from '@/utils/comparePass';
import {v4 as uuidv4} from 'uuid';


let googleClientEnv: string;
let googleSecretClientEnv: string;

if (process.env.AUTH_GOOGLE_ID) {
    googleClientEnv = process.env.AUTH_GOOGLE_ID;
} else {
    throw new Error('Google Client Environment Variable is not found');
};

if (process.env.AUTH_GOOGLE_CLIENT_SECRET) {
    googleSecretClientEnv = process.env.AUTH_GOOGLE_CLIENT_SECRET;
} else {
    throw new Error('Google Secret Client Environment Variable is not found');
};

export const authOptions: AuthOptions = {
    providers: [
        Google({
            clientId: googleClientEnv,
            clientSecret: googleSecretClientEnv
        }),
        Credentials({

            name: 'Email',

            credentials: {
                email: {label: 'Email', type:'email', placeholder: 'example@domain.com' },
                password: {label: 'Password', type: 'password'}
            },

            async authorize(credentials) {
                const userEmail = credentials?.email;
                const userPassword = credentials?.password;
                console.log(userEmail);
                console.log(userPassword);
                
                await connectToDB();

                const user = await User.findOne({email: userEmail});

                if (!user || !user.password) {
                    return null;
                }
                if (userPassword){
                    const passwordMatch = await comparePassword(userPassword, user.password);
                    if (passwordMatch) {
                        return user;
                    }
                }

                return null;
            }
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 7*24*60*60,
        updateAge: 24*60*60,
        generateSessionToken: () => {
            return uuidv4();
        }
    },
    callbacks: {
        async session({ session, token, user }) {
            // store the user id from mongoDB to session
            const sessionUser = await User.findOne({email: session.user?.email})
            session.user.id = sessionUser._id.toString();
            session.user.name = sessionUser.username

            return session;
        },
        async signIn({ account, profile, user, credentials}) {
            if (account?.provider !== 'credentials') {
                try{
                    await connectToDB();
    
                    // check if the user already exists
                    const userExists = await User.findOne({email: profile?.email})
    
    
                    if (!userExists) {
    
                        await User.create({
                            email: profile?.email,
                            username: profile?.name?.replace(' ','').toString(),
                            image: profile?.image,
                            verified: true
                        });
                    }
    
                    return true;
    
                
                } catch(error: any) {
                    console.log('Error checking if user exists', error.message);
                    return false;
                }
            }
            await connectToDB();
            const existingUser = await User.findOne({email: credentials?.email});
            if (!existingUser.verified) {
                return false;
            }
            
            return true;
        }
    }
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}