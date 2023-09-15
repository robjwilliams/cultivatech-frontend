import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Plant from "../components/Plant";
import { Scroll, ScrollControls } from "@react-three/drei";
import Interface from "../components/Interface";
import ScrollManager from "../components/ScrollManager";
import Menu from "../components/Menu";

export default function Home() {
  const [section, setSection] = useState(0);
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    setMenuOpened(false);
  }, [section]);
  return (
    <>
      <Canvas camera={{ position: [11, 5, 2], fov: 50 }}>
        <color attach="background" args={["#D2B48C"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <ScrollControls pages={3} damping={0.1}>
          <ScrollManager section={section} onSectionChange={setSection} />
          <Plant section={section} />
          <Scroll html>
            <Interface />
          </Scroll>
        </ScrollControls>
      </Canvas>
      <Menu
        onSectionChange={setSection}
        menuOpened={menuOpened}
        setMenuOpened={setMenuOpened}
      />
    </>
  );
}
