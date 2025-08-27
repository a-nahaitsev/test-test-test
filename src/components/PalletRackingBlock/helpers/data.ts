import * as THREE from "three";

export interface HotspotProps {
  id: string;
  position: [number, number, number];
  name: string;
  baseRotation: { x: number; y: number; z: number };
  animationRotation: { x: number; y: number; z: number };
}

export const hotspots: HotspotProps[] = [
  {
    id: "feature1",
    name: "Unnamed1-0005112",
    position: [4.12, 2.5, 1.2],
    baseRotation: { x: 1.570796461153735, y: 0, z: 0 },
    animationRotation: { x: 1.570796461153735, y: 0, z: 1 },
  },
  {
    id: "feature2",
    name: "Unnamed-0005111002",
    position: [-2, 3.67, 1.2],
    baseRotation: { x: 1.5707966297, y: 0, z: 0 },
    animationRotation: { x: 1.8707966297, y: 0.2, z: -0.8 },
  },
];

export const INTRO_ANIMATION_ANGLE = 35 * THREE.MathUtils.DEG2RAD;
export const BOX_GROUP_NAMES_1 = ["Empty013", "Empty014"];
export const BEAM_GROUP_NAMES_1 = [
  "Unnamed-0005111004",
  "Unnamed-0005111005",
  "Unnamed1-0005112003",
  "Unnamed1-0005112005",
];
export const BOX_GROUP_NAMES_2 = [
  "Empty012",
  "Empty011",
  "Empty010",
  "Empty006",
  "Empty005",
  "Empty004",
];
export const BEAM_GROUP_NAMES_2 = [
  "Unnamed-0005111003",
  "Unnamed-0005111002",
  "Unnamed1-0005112004",
  "Unnamed1-0005112002",
];
export const BOX_GROUP_NAMES_3 = [
  "Empty009",
  "Empty008",
  "Empty007",
  "Empty003",
  "Empty002",
  "Empty001",
];

export const Y_TARGET_VALUES = {
  box_group_1: 0.4658844471,
  beam_group_1: 1.7738354206,
  box_group_2: 2.350348711,
  beam_group_2: 3.6813919544,
  box_group_3: 4.2618455887,
};

export const BASE_CAMERA_POSITION = {
  x: 13.78971278086972,
  y: 3.6499999999999977,
  z: 19.693750821545354,
};
