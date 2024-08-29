import NextAuth, { AuthError, CredentialsSignin } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { User } from "./models/userModels";
import {compare} from'bcryptjs'
import { connectToDb } from "./app/lib/dbConnect";
//connect with db
//custom page for login and signUp

export const { handlers, signIn, signOut, auth} = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password"},
            },
            authorize: async (credentials) => {
                const email = credentials?.email as string;
                const password = credentials?.password as string;

                if (!email || !password) {
                    throw new CredentialsSignin ("Please provide both email and password");
                }

                await connectToDb();

                const user = await User.findOne({ email }).select("+password");
                if (!user) {
                    throw new CredentialsSignin("Invalid email or password");
                }

                const isMatch = await compare(password, user.password);
                if (!isMatch) {
                    throw new CredentialsSignin("Invalid email or password");
                }

                return { id: user._id.toString(), name: user.name, email: user.email };
            }
        })
    ],
    pages: {
        signIn: "/login",
    },
    callbacks:{
        signIn: async({user, account})=>{
            if(account?.provider ==="google"){
                try{
                    const {email, name, image, id} = user;
                    await connectToDb();
                    const alreadyUser = await User.findOne({email, name, image, googleId:id})
                    if(!alreadyUser){
                        await User.create({email, name, image, googleId:id});
                    }
                    return true;
                }
                catch(err){
                    throw new AuthError("Error with creating account");
                }
            }
            return true;
        }
    },
    secret: process.env.AUTH_SECRET,
});