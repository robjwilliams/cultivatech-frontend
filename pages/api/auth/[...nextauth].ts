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
    {
      id: "django",
      name: "Django",
      type: "oauth",
      wellKnown: "http://localhost:8000/o/.well-known/openid-configuration/",
      authorization: { params: { scope: "openid profile email" } },
      clientId: process.env.WEBAPP_CLIENT_ID,
      clientSecret: process.env.WEBAPP_CLIENT_SECRET,
      checks: ["pkce", "state"],
      async profile(profile) {
        console.log(profile, "profile");
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
        };
      },
    },
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
