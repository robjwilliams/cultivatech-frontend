import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      // wellKnown: "https://accounts.google.com/.well-known/openid-configuration",
      // wellKnown: "http://localhost:8000/o/.well-known/openid-configuration/",
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
        console.log(account);
        // let body = {
        //   client_id: process.env.GOOGLE_ID,
        //   grant_type: "convert_token",
        //   client_secret: process.env.GOOGLE_SECRET,
        //   backend: "google-oauth2",
        //   token: account?.access_token,
        // };
        let body = {
          client_id: "X0eSMAlYRwdj3mx2lEUyPJ7n9EX1sFaP8UoNKr7K",
          grant_type: "convert_token",
          client_secret:
            "zfHdaEEHv0fo0tKw294pfBiyeIvXVqXKHLBJTz2UUDcDFe51TjurZfKk3BG4j7cWotaLsgmRSCBYfe0hkFI7xKYr5nEaPKkIrU7wThhPWsftiySY8tMe6Zj6oFpiVc7t",
          backend: "google-oauth2",
          token: account?.access_token,
        };
        console.log(body);
        // const idToken = account.id_token;
        try {
          // await fetch(`${process.env.NEXT_PUBLIC_LOGIN_URL}`, {
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
          // .then((data) => (user.auth_token = data));
          return true;
        } catch (error) {
          console.log("error", error);
          return false;
        }
      }
    },
  },
});
