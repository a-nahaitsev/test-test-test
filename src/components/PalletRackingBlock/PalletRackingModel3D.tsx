"use client";

import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Suspense, useEffect } from "react";

interface Model3DProps {
  onModelLoad: (scene: THREE.Group) => void;
}

const PalletRackingModel3D = ({ onModelLoad }: Model3DProps) => {
  const { scene } = useGLTF("/bls-3d-export.glb") as any;

  useEffect(() => {
    if (!scene) return;

    scene.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    onModelLoad(scene);

    const light = new THREE.HemisphereLight(0xffffbb, 0xffffff, 0.2);
    scene.add(light);

    return () => {
      scene.remove(light);
    };
  }, [scene, onModelLoad]);

  if (!scene) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <primitive position={[0, 0, 0]} rotation={[0, 0, 0]} object={scene} />

      <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial color="#ffffff" />
      </mesh>
    </Suspense>
  );
};

export default PalletRackingModel3D;
