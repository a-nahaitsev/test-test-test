"use client";

import React, { useRef, useEffect } from "react";
import { Environment, PerspectiveCamera, View } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import { gsap } from "gsap";
import * as THREE from "three";

const SoundModel = () => {
  const { scene } = useGLTF("/iphone_12_pro.glb") as any;
  const modelRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (modelRef.current) {
      gsap.to(modelRef.current.rotation, {
        y: Math.PI * 2,
        duration: 4,
        ease: "none",
        repeat: -1,
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
      position={[20, -50, 0]}
      rotation={[0, 0, 0]}
    />
  );
};

const SoundSection = () => {
  return (
    <div className="sound-section wrapper relative">
      <div className="body">
        <div className="sound-section-content content">
          <h2 className="title">New Sound System</h2>
          <p className="text">Feel the base.</p>
          <span className="description">From $41.99</span>
          <ul className="links">
            <li>
              <button className="button">Buy</button>
            </li>
            <li>
              <a href="#" className="link">
                Learn more
              </a>
            </li>
          </ul>
        </div>
      </div>

      <View
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100vw",
          height: "100vh",
          zIndex: 10,
        }}
      >
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 100]}
          fov={80}
          aspect={1}
          near={0.1}
          scale={[0.5, 0.5, 0.5]}
        />
        <Environment preset="apartment" />
        <SoundModel />
      </View>
    </div>
  );
};

export default SoundSection;
