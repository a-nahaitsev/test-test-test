"use client";

import { Canvas } from "@react-three/fiber";
import React, { useRef } from "react";

const ViewCanvas = ({ style }: { style: React.CSSProperties }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <Canvas
      camera={{ fov: 20, position: [0, 0, 10] }}
      ref={canvasRef}
      style={{ ...style, pointerEvents: "none" }}
    >
      <mesh>
        <boxGeometry />
        <meshBasicMaterial color="red" />
      </mesh>
    </Canvas>
  );
};

export default ViewCanvas;
