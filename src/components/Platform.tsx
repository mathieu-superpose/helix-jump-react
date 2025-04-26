import { useMemo } from "react"
import { GameOptions as G } from "../stores/game"

import * as THREE from "three"

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
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: color,
    })
  }, [])

  return (
    <group rotation={[0, angle, 0]} position={[0, posY, 0]}>
      <mesh castShadow receiveShadow material={material}>
        <cylinderGeometry
          args={[
            G.platformRadius,
            G.platformRadius,
            G.platformHeight,
            32,
            1,
            false,
            0,
            thetaLength,
          ]}
        />
      </mesh>
      {/* side 1 */}
      <mesh
        castShadow
        receiveShadow
        material={material}
        position-x={0}
        position-z={G.platformRadius / 2}
        rotation-y={-Math.PI / 2}
      >
        <planeGeometry args={[G.platformRadius, G.platformHeight]} />
      </mesh>

      {/* side 2 */}
      <mesh
        castShadow
        receiveShadow
        material={material}
        position-x={Math.sin(thetaLength) * G.platformRadius / 2}
        position-z={Math.cos(thetaLength) * G.platformRadius / 2}
        rotation-y={thetaLength - 3 * Math.PI / 2}
        
      >
        <planeGeometry args={[G.platformRadius, G.platformHeight]} />
      </mesh>
    </group>
  )
}
export default Platform
