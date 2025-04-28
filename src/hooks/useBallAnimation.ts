import { RefObject } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"

const MAX_HEIGHT = 4

export function useBallAnimation(ref: RefObject<THREE.Mesh | null>) {
  const moveClock = new THREE.Clock(false)

  useFrame(() => {
    if (!ref?.current) {
      return
    }

    const ball = ref.current

    if (ball.position.y > MAX_HEIGHT) {
      moveClock.start()
    }

    const bouceTime = 0.9 // time it takes to do a full bounce
    const progress = moveClock.getElapsedTime() / bouceTime

    setPosition(ball, progress)
  })
}

function setPosition(ball: THREE.Mesh, progress: number) {
  const y = Math.abs(Math.sin(progress * Math.PI)) * MAX_HEIGHT

  ball.position.y = y
}
