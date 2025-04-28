import { RefObject } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"

const MAX_HEIGHT = 4
const FALL_SPEED = 15

import { state as ballState } from "../stores/ball"
import { state as platformState } from "../stores/platform"

export function useBallAnimation(ref: RefObject<THREE.Mesh | null>) {
  const moveClock = new THREE.Clock(false)
  const bouceTime = 0.9 // time it takes to do a full bounce

  useFrame((_state, delta) => {
    if (!ref?.current) {
      return
    }

    const ball = ref.current
    let y = ball.position.y

    if (ballState.action === "fall") {
      y -= FALL_SPEED * delta
    }

    if (ballState.action === "bounce") {
      const progress = moveClock.getElapsedTime() / bouceTime
      y = Math.abs(Math.sin(progress * Math.PI)) * MAX_HEIGHT
    }

    if (y <= 0.01) {
      y = 0

      // cast a ray to see if we are colliding with the platform
      const raycaster = new THREE.Raycaster(
        new THREE.Vector3(ball.position.x, ball.position.y, ball.position.z),
        new THREE.Vector3(0, -1, 0),
        0,
        1
      )

      const platforms = platformState.platformsRefs.reduce((acc, ref) => {
        if (ref.current) {
          acc.push(ref.current)
        }
        return acc
      }, [] as THREE.Mesh[])

      const intersects = raycaster.intersectObjects(platforms, false)
      if (intersects.length > 0) {
        console.log("found ", intersects.length, " platforms")

        // check the distance to the platform
        const distance = intersects[0].distance
        if (distance < 0.1) {
          // we are colliding with the platform
          ballState.action = "bounce"
          moveClock.start()
        }
      } else {
        // we are not colliding with the platform
        ballState.action = "collides"
        moveClock.stop()
      }
    }

    ball.position.y = y
  })
}
