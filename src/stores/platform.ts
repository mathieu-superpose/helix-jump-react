import { RefObject } from "react";
import * as THREE from "three";

export const state = {
  platformsRefs: [] as RefObject<THREE.Mesh | null>[],
}