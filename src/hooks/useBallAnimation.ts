import { RefObject } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"

const MAX_HEIGHT = 4
const FALL_SPEED = 15

import { state } from "../stores/ball"

export function useBallAnimation(ref: RefObject<THREE.Mesh | null>) {
  const moveClock = new THREE.Clock(false)
  const bouceTime = 0.9 // time it takes to do a full bounce

  useFrame((_state, delta) => {
    if (!ref?.current) {
      return
    }

    const ball = ref.current
    let y = ball.position.y

    if (state.action === "fall") {
      y -= FALL_SPEED * delta

      if (y <= 0) {
        y = 0
        moveClock.start()
        state.action = "bounce"
      }
    } else if (state.action === "bounce") {
      const progress = moveClock.getElapsedTime() / bouceTime
      y = Math.abs(Math.sin(progress * Math.PI)) * MAX_HEIGHT
    }

    ball.position.y = y
  })
}
