"use client";

import Hotspot from "./Hotspot";
import PalletRackingEnvironment from "./PalletRackingEnvironment";
import PalletRackingModel3D from "./PalletRackingModel3D";
import {
  BOX_GROUP_NAMES_1,
  BOX_GROUP_NAMES_2,
  BOX_GROUP_NAMES_3,
  BEAM_GROUP_NAMES_1,
  BEAM_GROUP_NAMES_2,
  INTRO_ANIMATION_ANGLE,
  Y_TARGET_VALUES,
  hotspots,
  HotspotProps,
  BASE_CAMERA_POSITION,
} from "./helpers/data";
import { useGSAP } from "@gsap/react";
import { CameraControls, PerspectiveCamera, View } from "@react-three/drei";
import gsap from "gsap";
import React, { RefObject, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// const isMesh = (obj: unknown): obj is THREE.Mesh => {
//   return obj !== null && typeof obj === 'object' && 'isMesh' in obj;
// };

const PalletRackingViewWithoutGyro = () => {
  // #region STATE
  const [cameraControls, setCameraControls] = useState<CameraControls | null>(
    null
  );
  const [modelPrimitive, setModelPrimitive] = useState<THREE.Group | null>(
    null
  );

  const [group, setGroup] = useState<THREE.Group | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentHotspot, setCurrentHotspot] = useState<HotspotProps | null>(
    null
  );
  const [initialCamera, setInitialCamera] = useState<{
    position: THREE.Vector3;
    target: THREE.Vector3;
    distance: number;
  } | null>(null);
  const [environmentHasLoaded, setEnvironmentHasLoaded] = useState(false);
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [isCameraMoved, setIsCameraMoved] = useState(true);
  // #endregion

  // #region REFS
  const viewWrapperRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<THREE.GridHelper>(null);
  // #endregion

  // #region SCROLL TRIGGER FOR INITIAL ANIMATION
  useGSAP(
    () => {
      if (animationTriggered || !cameraControls) return;

      const trigger = gsap.timeline({
        scrollTrigger: {
          trigger: ".pallet-racking-block",
          start: "top 50%",
          onEnter: () => {
            setAnimationTriggered(true);
          },
        },
      });

      return () => {
        trigger.kill();
      };
    },
    { dependencies: [animationTriggered, cameraControls] }
  );
  // #endregion

  // #region RESIZE HANDLER
  useEffect(() => {
    if (!cameraControls || !viewWrapperRef.current) {
      return;
    }

    cameraControls?.rotateAzimuthTo(INTRO_ANIMATION_ANGLE, false);
    cameraControls.dispatchEvent({ type: "resize" });
  }, [cameraControls, viewWrapperRef.current]);
  // #endregion

  // useEffect(() => {
  //   if (!cameraControls) return;

  //   // TODO: redo this
  //   cameraControls.moveTo(0, 2.65, 0, false);
  //   setIsCameraMoved(true);
  // }, [cameraControls]);

  // #region INITIAL ANIMATION
  useEffect(() => {
    if (
      !cameraControls ||
      !modelPrimitive ||
      !viewWrapperRef.current ||
      !group ||
      !animationTriggered
    ) {
      return;
    }

    const modelItems = modelPrimitive.children || [];

    const getOrderedGroup = (names: string[]) =>
      modelItems
        .filter(({ name }) => names.includes(name))
        .sort((a, b) => names.indexOf(a.name) - names.indexOf(b.name));

    const boxGroups = [
      getOrderedGroup(BOX_GROUP_NAMES_1),
      getOrderedGroup(BOX_GROUP_NAMES_2),
      getOrderedGroup(BOX_GROUP_NAMES_3),
    ];

    const beamGroups = [
      getOrderedGroup(BEAM_GROUP_NAMES_1),
      getOrderedGroup(BEAM_GROUP_NAMES_2),
    ];

    const targetMesh1 = group.getObjectByName("Unnamed1-0005112");
    const targetMesh2 = group.getObjectByName("Unnamed-0005111");

    if (targetMesh1 && targetMesh2) {
      const box = new THREE.Box3();
      box.expandByObject(targetMesh1);
      box.expandByObject(targetMesh2);

      cameraControls.fitToBox(box, true);
      cameraControls.zoomTo(0.8);

      setInitialCamera({
        position: cameraControls.getPosition(new THREE.Vector3()),
        target: cameraControls.getTarget(new THREE.Vector3()),
        distance: cameraControls.distance,
      });
    }

    const cameraParams = { angle: -INTRO_ANIMATION_ANGLE };

    const introTl = gsap.timeline({
      defaults: { ease: "power1.inOut" },
    });

    introTl.to(cameraParams, {
      angle: INTRO_ANIMATION_ANGLE,
      duration: 6,
      onUpdate: () => {
        cameraControls?.rotateAzimuthTo(cameraParams.angle, false);
      },
    });

    const groupAnimations = [
      { objects: boxGroups[0], y: Y_TARGET_VALUES.box_group_1 },
      { objects: beamGroups[0], y: Y_TARGET_VALUES.beam_group_1 },
      { objects: boxGroups[1], y: Y_TARGET_VALUES.box_group_2 },
      { objects: beamGroups[1], y: Y_TARGET_VALUES.beam_group_2 },
      { objects: boxGroups[2], y: Y_TARGET_VALUES.box_group_3 },
    ];

    groupAnimations.forEach(({ objects, y }, index) => {
      introTl.to(
        objects.map((obj) => obj.position),
        {
          y,
          duration: 1,
          stagger: 0.1,
        },
        index * 1
      );
    });

    introTl.to(
      viewWrapperRef.current,
      {
        width: "100%",
        // height: "50lvh",
        duration: 1,
        onComplete: () => {
          setIsAnimating(false);
        },
      },
      5
    );

    return () => {
      introTl.kill();
    };
  }, [cameraControls, modelPrimitive, viewWrapperRef, animationTriggered]);
  // #endregion

  // #region HOTSPOT CLICK HANDLERS
  const handleHotspotClick = (hotspot: HotspotProps) => {
    if (!modelPrimitive || !cameraControls) return;

    setIsAnimating(true);
    setCurrentHotspot(hotspot);

    const hotspotObject = (modelPrimitive.children || []).find(
      (child) => child.name === hotspot.name
    );

    if (!hotspotObject) return;

    const otherObjects = (modelPrimitive.children || [])
      .filter((child) => child.name !== hotspot.name)
      .map((el) => el.scale);

    const tl = gsap.timeline({
      defaults: { ease: "power1.inOut" },
    });

    // Scale down all other objects
    tl.to(
      otherObjects,
      {
        x: 0,
        y: 0,
        z: 0,
        duration: 1, // 1000ms → 1s
      },
      0
    );

    // Rotate the hotspot object
    tl.to(
      hotspotObject.rotation,
      {
        x: hotspot.animationRotation.x,
        y: hotspot.animationRotation.y,
        z: hotspot.animationRotation.z,
        duration: 1,
      },
      0
    );

    cameraControls.fitToBox(hotspotObject, true);
    cameraControls.zoomTo(0.6);
  };

  const onBackButtonClick = () => {
    if (!modelPrimitive || !cameraControls || !currentHotspot) return;

    setIsAnimating(true);
    setCurrentHotspot(null);

    const hotspotObject = (modelPrimitive.children || []).find(
      (child) => child.name === currentHotspot.name
    );

    if (!hotspotObject) return;

    const objects = (modelPrimitive.children || []).map((el) => el.scale);

    const tl = gsap.timeline({
      defaults: { ease: "power1.inOut" }, // matches easeInOutQuad
      onComplete: () => {
        setIsAnimating(false);
      },
    });

    // Restore all objects scale to full size
    tl.to(
      objects,
      {
        x: 1,
        y: 1,
        z: 1,
        duration: 1, // 1000ms → 1s
      },
      0
    );

    // Restore hotspot rotation
    tl.to(
      hotspotObject.rotation,
      {
        x: currentHotspot.baseRotation.x,
        y: currentHotspot.baseRotation.y,
        z: currentHotspot.baseRotation.z,
        duration: 1,
      },
      0
    );

    // Camera restore
    const cameraPosition = cameraControls.getPosition(new THREE.Vector3());
    const cameraTarget = cameraControls.getTarget(new THREE.Vector3());

    if (initialCamera) {
      const cameraParams = {
        azimuth: cameraControls.azimuthAngle,
        positionX: cameraPosition.x,
        positionY: cameraPosition.y,
        positionZ: cameraPosition.z,
        targetX: cameraTarget.x,
        targetY: cameraTarget.y,
        targetZ: cameraTarget.z,
      };

      tl.to(
        cameraParams,
        {
          azimuth: 0.5827188563654097,
          positionX: initialCamera.position.x,
          positionY: initialCamera.position.y,
          positionZ: initialCamera.position.z,
          targetX: initialCamera.target.x,
          targetY: initialCamera.target.y,
          targetZ: initialCamera.target.z,
          duration: 1,
          onUpdate: () => {
            cameraControls.setLookAt(
              cameraParams.positionX,
              cameraParams.positionY,
              cameraParams.positionZ,
              cameraParams.targetX,
              cameraParams.targetY,
              cameraParams.targetZ,
              false
            );
            cameraControls.azimuthAngle = cameraParams.azimuth;
          },
        },
        0
      );
    }

    cameraControls.zoomTo(0.8);
  };

  // #endregion

  return (
    <div ref={viewWrapperRef} className="relative w-full h-full">
      <View
        track={viewWrapperRef as RefObject<HTMLElement>}
        style={{
          height: "100%",
          width: "100%",
          position: "relative",
        }}
      >
        <PalletRackingEnvironment
          path="/HDRI-black-contrast.hdr"
          onLoad={() => setEnvironmentHasLoaded(true)}
        />

        <CameraControls ref={(cc) => setCameraControls(cc)} enabled={false} />

        {environmentHasLoaded && isCameraMoved && (
          <group ref={(el) => setGroup(el)} position={[0, 0, 0]}>
            <ambientLight intensity={0.1} />
            <directionalLight
              position={[9.4, 4.4, 10]}
              intensity={0.3}
              castShadow
            />

            <PalletRackingModel3D
              onModelLoad={(scene) => setModelPrimitive(scene)}
            />

            {/* CAMERA TARGET */}
            {/* <mesh position={[0, 2.65, 0]}>
              <sphereGeometry args={[0.3, 32, 32]} />
              <meshBasicMaterial color="red" />
            </mesh> */}

            {/* CAMERA POSITION */}
            {/* <mesh position={[17, 1, 17]}>
              <sphereGeometry args={[0.3, 32, 32]} />
              <meshBasicMaterial color="blue" />
            </mesh> */}

            {hotspots.map((hotspot) => (
              <Hotspot
                key={hotspot.id}
                position={hotspot.position}
                onHotspotClick={() => handleHotspotClick(hotspot)}
                visible={!isAnimating}
              >
                <span className="h-7 text-2xl leading-none">+</span>
              </Hotspot>
            ))}

            <PerspectiveCamera
              makeDefault
              position={[
                BASE_CAMERA_POSITION.x,
                BASE_CAMERA_POSITION.y - 2.65,
                BASE_CAMERA_POSITION.z,
              ]}
              fov={20}
              aspect={1}
              near={0.1}
            />

            {/* <gridHelper
              ref={gridRef}
              args={[25, 25, 0x444444, 0x888888]} // size, divisions, colorCenterLine, colorGrid
            />

            <axesHelper args={[5]} /> */}
          </group>
        )}
      </View>

      {currentHotspot && (
        <div
          onClick={onBackButtonClick}
          className="absolute right-4 top-4 flex size-6 cursor-pointer items-center justify-center rounded-full bg-black text-white"
        >
          <ArrowGoBackLine className="size-4 fill-white" />
        </div>
      )}
    </div>
  );
};

export default PalletRackingViewWithoutGyro;

const ArrowGoBackLine = ({
  className,
  ...props
}: {
  className?: string;
  props?: React.SVGProps<SVGSVGElement>;
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M5.82843 6.99955L8.36396 9.53509L6.94975 10.9493L2 5.99955L6.94975 1.0498L8.36396 2.46402L5.82843 4.99955H13C17.4183 4.99955 21 8.58127 21 12.9996C21 17.4178 17.4183 20.9996 13 20.9996H4V18.9996H13C16.3137 18.9996 19 16.3133 19 12.9996C19 9.68584 16.3137 6.99955 13 6.99955H5.82843Z" />
    </svg>
  );
};
