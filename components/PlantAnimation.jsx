import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Plant from "./Plant";
import { Scroll, ScrollControls } from "@react-three/drei";

function PlantAnimation() {
  return (
    <>
      <Canvas>
        <color attach="background" args={["#ececec"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <ScrollControls pages={4} damping={0.1}>
          <Plant />
          <Scroll html>
            <h1>Hello!</h1>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  );
}

export default PlantAnimation;
