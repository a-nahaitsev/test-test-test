"use client";

import { Environment, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useRef, Suspense } from "react";

const Model = () => {
  const { scene } = useGLTF("/model.glb") as any;

  console.log(scene);

  if (!scene) {
    return (
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    );
  }

  return <primitive object={scene} position={[0, 0, 0]} rotation={[0, 0, 0]} />;
};

const ViewCanvas = ({ style }: { style: React.CSSProperties }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <Canvas
      camera={{ fov: 30, position: [0, 0, 10] }}
      ref={canvasRef}
      style={{ ...style, pointerEvents: "none", zIndex: 100 }}
    >
      <Environment preset="warehouse" />
      {/* <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} /> */}
      <Suspense fallback={null}>
        <Model />
      </Suspense>
    </Canvas>
  );
};

export default ViewCanvas;

useGLTF.preload("/model.glb");
