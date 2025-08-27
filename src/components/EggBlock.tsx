"use client";

import { useGSAP } from "@gsap/react";
import {
  Environment,
  View,
  PerspectiveCamera,
  Float,
  CameraControls,
  useGLTF,
} from "@react-three/drei";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const EGG_START_POSITION: [number, number, number] = [2.5, 0, 0];
const EGG_START_ROTATION: [number, number, number] = [0, 0, -0.2];

const EggBlock = () => {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [eggGroup, setEggGroup] = useState<THREE.Group | null>(null);
  const [cameraControls, setCameraControls] = useState<CameraControls | null>(
    null
  );
  const [isCameraReady, setIsCameraReady] = useState(false);

  const boxRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const boxObject = boxRef.current;

    if (!cameraControls || !boxObject) {
      return;
    }

    const fitCamera = () => {
      cameraControls.fitToBox(boxObject, true);
      setTimeout(() => setIsCameraReady(true), 100);
    };

    fitCamera();

    window.addEventListener("resize", fitCamera);

    return () => window.removeEventListener("resize", fitCamera);
  }, [cameraControls, boxRef]);

  useGSAP(
    () => {
      if (!eggGroup) return;

      const scrollTl = gsap.timeline({
        defaults: {
          duration: 3,
        },
        scrollTrigger: {
          trigger: ".egg-animation",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      scrollTl.to(eggGroup.position, {
        x: -2.5,
        y: 0,
        z: 0,
        ease: "power2.inOut",
      });

      scrollTl.to(
        eggGroup.rotation,
        {
          x: 0.6,
          y: Math.PI * 2 + 1.2,
          z: -0.8,
          ease: "power2.inOut",
          onUpdate: function () {
            const timelineProgress = this.progress();
            const animationProgress = Math.max(0, timelineProgress);
            setAnimationProgress(animationProgress);
          },
        },
        0
      );

      return () => scrollTl.kill();
    },
    {
      dependencies: [eggGroup],
    }
  );

  return (
    <View className="pointer-events-none h-screen w-full">
      <Environment preset="warehouse" />

      <group
        ref={setEggGroup}
        visible={isCameraReady && !!eggGroup}
        position={EGG_START_POSITION}
        scale={1.5}
        rotation={EGG_START_ROTATION}
      >
        <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
          <Egg animationProgress={animationProgress} halfDuration={true} />
        </Float>
      </group>

      <CameraControls ref={(cc) => setCameraControls(cc)} enabled={false} />

      <mesh position={[0, 0, 0]} ref={boxRef}>
        <boxGeometry args={[10, 5, 0]} />
        <meshBasicMaterial color="red" transparent opacity={0} />
      </mesh>

      <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={20} />
    </View>
  );
};

export default EggBlock;

const EGG_COLOR = "#DAA16D";

export function Egg(props: any) {
  const wholeEgg = useRef<THREE.Group>(null);
  const { scene, nodes, materials } = useGLTF(
    "/model.glb",
    true
  ) as unknown as any;

  useEffect(() => {
    const mesh = scene.getObjectByName("Sphere") as THREE.Mesh;

    if (mesh && mesh.material) {
      (mesh.material as THREE.MeshStandardMaterial).color.set(EGG_COLOR);
    }
  }, [scene]);

  return (
    <group ref={wholeEgg} dispose={null} position={[0, 0, 0]} {...props}>
      <group name="Scene">
        <group name="Empty">
          <mesh
            name="Sphere"
            castShadow
            receiveShadow
            geometry={nodes.Sphere.geometry}
            material={materials.Material}
            scale={1.246}
          >
            <group name="Sphere002">
              <mesh
                name="Mesh"
                castShadow
                receiveShadow
                geometry={nodes.Mesh.geometry}
                material={materials["Material.003"]}
              />
              <mesh
                name="Mesh_1"
                castShadow
                receiveShadow
                geometry={nodes.Mesh_1.geometry}
                material={materials["Material.004"]}
              />
            </group>
          </mesh>
          <mesh
            name="Sphere001"
            castShadow
            receiveShadow
            geometry={nodes.Sphere001.geometry}
            material={materials.Material}
            scale={1.246}
          >
            <group name="Sphere004">
              <mesh
                name="Sphere005"
                castShadow
                receiveShadow
                geometry={nodes.Sphere005.geometry}
                material={materials["Material.003"]}
              />
              <mesh
                name="Sphere005_1"
                castShadow
                receiveShadow
                geometry={nodes.Sphere005_1.geometry}
                material={materials["Material.004"]}
              />
            </group>
          </mesh>
          <mesh
            name="Sphere003"
            castShadow
            receiveShadow
            geometry={nodes.Sphere003.geometry}
            material={materials.Material}
            position={[0, 0.001, 0]}
            scale={1.246}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/model.glb");
