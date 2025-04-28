import { useRef } from "react"
import * as THREE from "three"

import { useBallAnimation } from "../../hooks/useBallAnimation"

function Ball() {
  const ballRef = useRef<THREE.Mesh>(null!)

  useBallAnimation(ballRef)

  return (
    <group position={[0, 1, 0]}>
      <mesh ref={ballRef} position={[0, 15, 2]} scale={0.5}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </group>
  )
}

export default Ball
