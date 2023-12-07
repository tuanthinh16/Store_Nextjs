import NextAuth from "next-auth/next";
import type { NextAuthOptions } from 'next-auth'
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetchData } from "../../apiService";

const handler =  NextAuth({
  secret: '1zQJurpFvpm0fM3Dy00ZbG3+XNOq3MBa1kmnQf605Ng=',
  session: {
    strategy: "jwt"
  },
  pages:{
    signIn:"/user/Login"
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      
      async authorize(credentials: any) {
        console.log('username:',credentials.username);
        try {
          const _data = {
            "collection": "users",
            "database": "FirstApi",
            "dataSource": "RustData",
            "filter":{
                "username": credentials.username,
            }
        };
        
        const user = await fetchData('https://ap-southeast-1.aws.data.mongodb-api.com/app/data-sdyzv/endpoint/data/v1/action/findOne', 'post', _data);
          if (user) {
            if (user['document']['password'] == credentials.password) {
              return user['document'];
            }else{
              throw new Error("Wrong password");
            }
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }:any) {
      // Include additional user information in the session
      if(token){
        session.username = token.username;
        session.email = token.email;
      }
      return session;
    },
    async jwt({token,user}:any){
      if(user){
        token.username = user.username;
        token.email = user.email;
      }
      return token;
    }
  },

});
export { handler as GET, handler as POST }