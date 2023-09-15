import React, { useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { useFrame } from "react-three-fiber";

export default function Model({ section }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/plant.glb");

  useFrame(() => {
    group.current.rotation.y += 0.001;
  });

  return (
    <motion.group
      animate={{
        x: 3,
        y: section == 0 ? -2 : -20,
        scale: section == 0 ? 1 : 5,
      }}
      scale={[0, 0, 0]}
      ref={group}
      dispose={null}
      position={[3, 10, -2]}
      rotateY={10}
    >
      <motion.group name="Vert001" position={[0, 0.924, 0]}>
        <mesh
          name="Vert002"
          geometry={nodes.Vert002.geometry}
          material={materials["Material.002"]}
          position={[0, -0.276, 0]}
          scale={0.924}
        >
          <mesh
            name="Vert003"
            geometry={nodes.Vert003.geometry}
            material={materials["Material.002"]}
            position={[0.684, 1.432, 0.131]}
            rotation={[-2.156, -0.236, -2.329]}
            scale={0.522}
          />
          <mesh
            name="Vert004"
            geometry={nodes.Vert004.geometry}
            material={materials["Material.002"]}
            position={[1.076, 2.043, -0.051]}
            rotation={[-0.621, 0.81, -0.332]}
            scale={0.663}
          />
          <mesh
            name="Vert005"
            geometry={nodes.Vert005.geometry}
            material={materials["Material.002"]}
            position={[1.161, 3.005, 0.037]}
            rotation={[-2.273, 0.308, 3.054]}
            scale={0.636}
          />
          <mesh
            name="Vert006"
            geometry={nodes.Vert006.geometry}
            material={materials["Material.002"]}
            position={[0.601, 3.769, -0.073]}
            rotation={[-1.225, 0.432, 0.868]}
            scale={0.482}
          />
          <mesh
            name="Vert007"
            geometry={nodes.Vert007.geometry}
            material={materials["Material.002"]}
            position={[-0.522, 4.426, 0.038]}
            rotation={[-1.811, 0.01, 1.85]}
            scale={0.667}
          />
          <mesh
            name="Vert008"
            geometry={nodes.Vert008.geometry}
            material={materials["Material.002"]}
            position={[-1.46, 5.258, 0.012]}
            rotation={[-0.784, -0.326, 0.444]}
            scale={0.621}
          />
          <mesh
            name="Vert009"
            geometry={nodes.Vert009.geometry}
            material={materials["Material.002"]}
            position={[-1.516, 6.129, 0]}
            rotation={[-1.571, -0.993, -1.581]}
            scale={0.557}
          />
        </mesh>
      </motion.group>
      <mesh
        name="Circle"
        geometry={nodes.Circle.geometry}
        material={materials["Material.003"]}
      />
      <mesh
        name="Circle001"
        geometry={nodes.Circle001.geometry}
        material={materials["Material.004"]}
        position={[0, 1.054, 0]}
      />
    </motion.group>
  );
}

useGLTF.preload("/plant.gltf");
