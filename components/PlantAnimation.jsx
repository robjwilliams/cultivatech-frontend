import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Plant from "./Plant";

function PlantAnimation() {
  // State for mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Event listener to update state
  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;

      // Normalize mouse position between -1 and 1
      const normalizedX = (clientX / window.innerWidth) * 2 - 1;
      const normalizedY = (clientY / window.innerHeight) * 2 - 1;

      setMousePosition({ x: normalizedX, y: normalizedY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      // Clean up listener on unmount
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[mousePosition.x * 10, 10, mousePosition.y * 10]}
        intensity={1}
      />
      <Suspense fallback={null}>
        <Plant />
      </Suspense>
    </Canvas>
  );
}

export default PlantAnimation;
