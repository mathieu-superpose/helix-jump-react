import { RefObject, useMemo } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"

const MAX_HEIGHT = 4
const FALL_SPEED = 15

import { state as ballState } from "../stores/ball"
import { state as platformState } from "../stores/platform"

export function useBallAnimation(ref: RefObject<THREE.Mesh | null>) {
  const moveClock = new THREE.Clock(false)
  const bouceTime = 0.9 // time it takes to do a full bounce
  const castDirection = useMemo(() => new THREE.Vector3(0, -1, 0), [])
  const castOrigin = useMemo(
    () =>
      new THREE.Vector3(
        ref?.current?.position.x || 0,
        ref?.current?.position.y || 0,
        ref?.current?.position.z || 0
      ),
    [ref]
  )

  useFrame((_state, delta) => {
    if (!ref?.current) {
      return
    }

    const ball = ref.current
    let y = ball.position.y

    if (ballState.action === "fall") {
      y -= FALL_SPEED * delta
      if (y <= 0.1) {
        y = 0
        ballState.action = "willCollide"
      }
    }

    if (ballState.action === "bounce") {
      const progress = moveClock.getElapsedTime() / bouceTime
      y = Math.abs(Math.sin(progress * Math.PI)) * MAX_HEIGHT
    }

    if (y < 0.14) {
      y = 0

      castOrigin.set(ball.position.x, ball.position.y, ball.position.z)

      // cast a ray to see if we are colliding with the platform
      const raycaster = new THREE.Raycaster(castOrigin, castDirection, 0, 1)

      const platforms = platformState.platformsRefs.reduce((acc, ref) => {
        if (ref.current) {
          acc.push(ref.current)
        }
        return acc
      }, [] as THREE.Mesh[])

      const intersects = raycaster.intersectObjects(platforms, false)
      if (intersects.length > 0) {
        // console.log("found ", intersects.length, " platforms")

        // check the distance to the platform
        const distance = intersects[0].distance
        if (distance < 0.26) {
          // we are colliding with the platform
          // console.log("collides with platform")
          ballState.action = "bounce"
          moveClock.start()
          moveClock.elapsedTime = 0
        }
      } else {
        // we are not colliding with the platform
        ballState.action = "willCollide"
        moveClock.stop()
      }
    }

    ball.position.y = y
  })
}
