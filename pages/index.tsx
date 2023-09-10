// pages/index.tsx

import Head from "next/head";
import UserInfo from "./user-info";
import LoginButton from "../components/LoginButton";

export default function Home() {
  return (
    <div>
      <Head>
        <title>My Next.js Site</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <main>
        <h1>Welcome to My Next.js Site</h1>
        <p>This is a simple landing page.</p>
        <UserInfo />
        <LoginButton />
      </main>

      <footer>
        <p>My Footer</p>
      </footer>
    </div>
  );
}
