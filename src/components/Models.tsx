"use client";

import { useState, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

// @ts-ignore

export function Soda(props: any) {
  const ref = useRef(null);
  const [hovered, spread] = useHover();
  const { nodes, materials } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/soda-bottle/model.gltf"
  );
  // @ts-ignore

  useFrame((state, delta) => (ref.current.rotation.y += delta));
  // @ts-ignore

  return (
    // @ts-ignore

    <group ref={ref} {...props} {...spread} dispose={null}>
      {/* @ts-ignore */}

      <mesh geometry={nodes.Mesh_sodaBottle.geometry}>
        <meshStandardMaterial
          color={hovered ? "red" : "green"}
          roughness={0.33}
          metalness={0.8}
          envMapIntensity={2}
        />
      </mesh>

      <mesh
        // @ts-ignore

        geometry={nodes.Mesh_sodaBottle_1.geometry}
        material={materials.red}
        material-envMapIntensity={0}
      />
    </group>
  );
}

function useHover() {
  const [hovered, hover] = useState(false);
  return [
    hovered,
    { onPointerOver: (e: any) => hover(true), onPointerOut: () => hover(false) },
  ];
}

export function Duck(props: any) {
  const { scene } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/duck/model.gltf"
  );
  return <primitive object={scene} {...props} />;
}

export function Candy(props:any) {
  const { scene } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/candy-bucket/model.gltf"
  );
  useFrame((state, delta) => (scene.rotation.z = scene.rotation.y += delta));
  return <primitive object={scene} {...props} />;
}

export function Flash(props: any) {
  const { scene } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/lightning/model.gltf"
  );
  useFrame((state, delta) => (scene.rotation.y += delta));
  return <primitive object={scene} {...props} />;
}

export function Apple(props: any) {
  const { scene } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/apple-half/model.gltf"
  );
  useFrame((state, delta) => (scene.rotation.y += delta));
  return <primitive object={scene} {...props} />;
}

export function Target(props: any) {
  const { scene } = useGLTF("/model.glb");
  useFrame((state, delta) => (scene.rotation.y += delta));
  return <primitive object={scene} {...props} />;
}
