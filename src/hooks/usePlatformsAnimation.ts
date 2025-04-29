import { RefObject, use, useMemo } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"

import { GameOptions as G } from "../stores/game"

import useTimedKeyPress from "./useTimedKeyPress.ts"

import useGameState from "../stores/game.ts"

import { state as ballState } from "../stores/ball"

import { state as platformState } from "../stores/platform"

export function usePlatformsAnimation(ref: RefObject<THREE.Group | null>) {
  const worldPosition = useMemo(() => new THREE.Vector3(), [])

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

    // update opacity on passed platforms
    for (let i = 0; i < platformState.platformsRefs.length; i++) {
      const platformRef = platformState.platformsRefs[i]

      if (platformRef.current) {
        const platform = platformRef.current as THREE.Mesh

        // get the position of the mesh in the world
        platform.getWorldPosition(worldPosition)
        const platformPosY = worldPosition.y

        if (platformPosY > 0) {
          // update opacity
          if (platform.material instanceof THREE.MeshStandardMaterial) {
            const material = platform.material as THREE.MeshStandardMaterial
            const opacity = Math.max(1 - platformPosY / 2)
            material.opacity = opacity
          }
        }
      }
    }
  })
}
