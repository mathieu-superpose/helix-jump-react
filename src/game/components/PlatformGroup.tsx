import * as THREE from "three"
import { useMemo, useRef } from "react"

import { GameOptions as G } from "../../stores/game"
import { newPlatformData } from "../../utils/game"

import Platform from "./Platform"

import { usePlatformsAnimation } from "../../hooks/usePlatformsAnimation.ts"

function PlatformGroup() {
  const platformGroupRef = useRef<THREE.Group>(null)
  const platforms = useMemo(() => {
    const newPlatforms = []

    for (let i: number = 0; i < G.totalPlaftforms; i++) {
      newPlatforms.push(newPlatformData(i))
    }

    return newPlatforms
  }, [])

  usePlatformsAnimation(platformGroupRef)

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
