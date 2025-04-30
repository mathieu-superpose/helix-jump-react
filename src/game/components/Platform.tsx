// import { useEffect, useMemo, useRef } from "react"
// import { GameOptions as G } from "../../stores/game"

// import * as THREE from "three"

// import { state } from "../../stores/platform"

import PlatformFraction from "./PlatformFraction"

import { useRef } from "react"
import * as THREE from "three"

// import useFractionAnimation from "../../hooks/useFractionAnimation"

function Platform({
  color,
  thetaLength,
  angle,
  posY,
}: {
  color: number
  thetaLength: number
  angle: number
  posY: number
}) {
  const fractionRef = useRef<THREE.Group | null>(null!)
  // useFractionAnimation(fractionRef)

  return (
    <group ref={fractionRef}>
      <PlatformFraction
        color={color}
        thetaLength={thetaLength / 3}
        angle={angle}
        posY={posY}
      />
      <PlatformFraction
        color={color}
        thetaLength={thetaLength / 3}
        angle={angle + thetaLength / 3}
        posY={posY}
      />
      <PlatformFraction
        color={color}
        thetaLength={thetaLength / 3}
        angle={angle - thetaLength / 3}
        posY={posY}
      />
    </group>
  )
}
export default Platform
