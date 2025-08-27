"use client";

import { useGLTF, View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useRef, Suspense } from "react";

const ViewCanvas = ({ style }: { style: React.CSSProperties }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <Canvas
      camera={{ fov: 80, position: [0, 0, 100], scale: [0.5, 0.5, 0.5] }}
      ref={canvasRef}
      style={{ ...style, pointerEvents: "none", zIndex: 100 }}
    >
      <Suspense fallback={null}>
        <View.Port />
      </Suspense>
    </Canvas>
  );
};

export default ViewCanvas;

useGLTF.preload("/iphone_12_pro.glb");
