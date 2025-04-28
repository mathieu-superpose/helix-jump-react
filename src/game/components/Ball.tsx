import { useRef } from "react"
import * as THREE from "three"

function Ball() {
  const ballRef = useRef<THREE.Mesh>(null!)

  return (
    <mesh ref={ballRef} position={[0, 5, 2]} scale={0.5}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

export default Ball
