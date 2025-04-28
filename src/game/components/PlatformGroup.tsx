import { useMemo, useRef } from "react"

import { GameOptions as G } from "../../stores/game"
import { newPlatformData } from "../../utils/game"

import Platform from "./Platform"

import useTimedKeyPress from "../../hooks/useTimedKeyPress"

import * as THREE from "three"
import { useFrame } from "@react-three/fiber"

import { state } from "../../stores/ball"

const FALL_SPEED = 15

function PlatformGroup() {
  const platformGroupRef = useRef<THREE.Group>(null)
  const platforms = useMemo(() => {
    const newPlatforms = []

    for (let i: number = 0; i < G.totalPlaftforms; i++) {
      newPlatforms.push(newPlatformData(i))
    }

    return newPlatforms
  }, [])

  const { keys } = useTimedKeyPress()

  useFrame((_state, delta) => {
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

    if (!platformGroupRef?.current) {
      return
    }

    platformGroupRef.current.rotation.y +=
      rotateDirection * G.rotationSpeed * delta

    if (state.action === "willCollide") {
      platformGroupRef.current.position.y += FALL_SPEED * delta
    }
  })

  return (
    <group ref={platformGroupRef} position={[0, -5, 0]}>
      {platforms.map((platform, index) => (
        <Platform
          key={index}
          color={platform.color}
          thetaLength={platform.thetaLength}
          angle={platform.angle}
          posY={platform.posY}
        />
      ))}
    </group>
  )
}

export default PlatformGroup
