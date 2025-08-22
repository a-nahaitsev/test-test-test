"use client";

import { Environment, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef, Suspense, useEffect } from "react";
import { gsap } from "gsap";
import * as THREE from "three";

const Model = () => {
  const { scene } = useGLTF("/iphone_12_pro.glb") as any;
  const modelRef = useRef<THREE.Group>(null);

  console.log(scene);

  useEffect(() => {
    if (modelRef.current) {
      // Create a continuous rotation animation around Y axis
      gsap.to(modelRef.current.rotation, {
        y: Math.PI * 2, // Full 360 degree rotation
        duration: 4,
        ease: "none",
        repeat: -1, // Infinite repeat
      });
    }
  }, []);

  if (!scene) {
    return (
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    );
  }

  return (
    <primitive
      ref={modelRef}
      object={scene}
      position={[0, -50, 0]}
      rotation={[0, 0, 0]}
    />
  );
};

const ViewCanvas = ({ style }: { style: React.CSSProperties }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <Canvas
      camera={{ fov: 80, position: [0, 0, 100], scale: [0.5, 0.5, 0.5] }}
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

useGLTF.preload("/iphone_12_pro.glb");
