import { RefObject } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"

import { GameOptions as G } from "../stores/game"

import useTimedKeyPress from "./useTimedKeyPress.ts"

import useGameState from "../stores/game.ts"

import { state as ballState } from "../stores/ball"

export function usePlatformsAnimation(ref: RefObject<THREE.Group | null>) {
  const { fallSpeed } = G
  const status = useGameState((state) => state.status)

  const { keys } = useTimedKeyPress()

  useFrame((_state, delta) => {
    if (status !== "running") {
      return
    }

    let rotateDirection: number = 0

    if (keys["a"] && !keys["d"]) {
      rotateDirection = 1
    } else {
      // clockwise
      if (keys["d"] && !keys["a"]) {
        rotateDirection = -1
      } else {
        // both directions, so we see which one was the latest
        if (keys["d"] && keys["a"]) {
          rotateDirection = keys["a"] > keys["d"] ? 1 : -1
        }
      }
    }

    if (!ref?.current) {
      return
    }

    const platformGroup = ref.current as THREE.Group

    platformGroup.rotation.y += rotateDirection * G.rotationSpeed * delta

    if (ballState.action === "willCollide") {
      platformGroup.position.y += fallSpeed * delta
    }
  })
}
