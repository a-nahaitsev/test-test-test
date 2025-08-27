"use client";

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import * as THREE from "three";

const PalletRackingEnvironment = ({
  path,
  onLoad,
}: {
  path: string;
  onLoad: () => void;
}) => {
  const { scene, gl } = useThree();

  useEffect(() => {
    const loader = new RGBELoader();

    loader.load(path, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;

      scene.environment = texture;
      scene.background = null;
      scene.environmentIntensity = 0.3;
      scene.backgroundIntensity = 0;

      onLoad();
    });
  }, [path, scene, gl, onLoad]);

  return null;
};

export default PalletRackingEnvironment;
