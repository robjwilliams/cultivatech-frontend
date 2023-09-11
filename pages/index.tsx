// pages/index.tsx

import Head from "next/head";
import PlantAnimation from "../components/PlantAnimation";

export default function Home() {
  return (
    <>
      <Head>
        <title>CultivaTech</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <main>
        <PlantAnimation />
      </main>
    </>
  );
}
