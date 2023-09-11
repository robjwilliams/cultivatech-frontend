import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (user) {
        try {
          let body = {
            client_id: process.env.GOOGLE_CLIENT_ID!,
            grant_type: "convert_token",
            client_secret: process.env.GOOGLE_CLIENT_SECRET!,
            backend: "google-oauth2",
            token: account?.access_token,
          };
          await fetch("http://localhost:8000/auth/convert-token", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }).then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              return response.text().then((text) => {
                throw new Error(text);
              });
            }
          });
          return true;
        } catch (error) {
          console.log("error", error);
          return false;
        }
      }
      return false;
    },
  },
});
