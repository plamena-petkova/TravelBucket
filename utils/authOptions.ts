import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import connectDB from "@/config/database";
import * as bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {

  providers: [
    CredentialsProvider({
        name:'Email',
        credentials:{
            email:{label:"Email",type: "text", placeholder: "j.smith@email.com"},
            password: {  label: "Password", type: "password", placeholder:"*******" }
        },
        async authorize(credentials) {
          if(!credentials?.email || !credentials?.password) {
            return null;
          }

          const user = await User.findOne({
            where:{
              email:credentials.email
            }
          });

          if(!user) {
            return null;
          }

          if(user && user.password) {
            const passwordMatch = await bcrypt.compare(credentials.password, user.password);

            if(!passwordMatch) {
              return null
            }
          }
          return user;
        }

    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session:{
    strategy:'jwt'
  },
    callbacks: {
        //Invoked on successfull sign in
        async signIn({user}) {
            //1. Connectto the database
            await connectDB();

            //2. Check if user exists

            const userExists = await User.findOne({email:user.email});

            //3. If not, create user
            if(!userExists) {
    

                await User.create({
                    email:user.email,
                    name:user.name,
                    image:user.image
                });

            }
            //4. Return true to allow sign in

            return true;
        },
        //Session callback function that modifies the session object
        // async session({session}) {
        //     //1. Get the user from the database
        //     const user = await User.findOne({email:session.user.email});
        
        //     //2. Sign the user id from the session
        //     session.user.id = user._id.toString();
        //     //3. Return session
        //     return session;
        // }
    }
};