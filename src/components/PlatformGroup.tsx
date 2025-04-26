import { useMemo } from "react"

import { GameOptions as G } from "../stores/game"
import { newPlatformData } from "../utils/game"

import Platform from "./Platform"

function PlatformGroup() {
  const platforms = useMemo(() => {
    const newPlatforms = []

    for (let i: number = 0; i < G.totalPlaftforms; i++) {
      newPlatforms.push(newPlatformData(i))
    }

    return newPlatforms
  }, [])

  return (
    <>
      {platforms.map((platform, index) => (
        <Platform
          key={index}
          color={platform.color}
          thetaLength={platform.thetaLength}
          angle={platform.angle}
          posY={platform.posY}
        />
      ))}
    </>
  )
}

export default PlatformGroup
