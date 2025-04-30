import { useEffect, useMemo, useRef } from "react"
import { GameOptions as G } from "../../stores/game"

import * as THREE from "three"

import { state } from "../../stores/platform"
import { useFrame } from "@react-three/fiber"

function PlatformFraction({
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
  const platformRef = useRef<THREE.Mesh | null>(null!)

  const material = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({
      color: color,
    })

    material.transparent = true

    return material
  }, [])

  useEffect(() => {
    if (!platformRef?.current) {
      return
    }

    state.platformsRefs.push(platformRef)
  }, [])

  const ref = useRef<THREE.Group | null>(null!)
  const wp = useMemo(() => new THREE.Vector3(), [])

  useFrame((_state, delta) => {
    if (!ref?.current) {
      return
    }

    // update world position
    ref.current.getWorldPosition(wp)

    if (wp.y > 0) {
      ref.current.position.x += delta * Math.sin(angle) * 6
      ref.current.position.z += delta * Math.cos(angle) * 6

      // update the opacity of the material
      material.opacity = Math.max(0, material.opacity - delta * 2)
    }
  })

  return (
    <group ref={ref} rotation={[0, angle, 0]} position={[0, posY, 0]}>
      <mesh
        ref={platformRef}
        castShadow
        receiveShadow
        material={material}
        name="platform"
      >
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
        position-x={(Math.sin(thetaLength) * G.platformRadius) / 2}
        position-z={(Math.cos(thetaLength) * G.platformRadius) / 2}
        rotation-y={thetaLength - (3 * Math.PI) / 2}
      >
        <planeGeometry args={[G.platformRadius, G.platformHeight]} />
      </mesh>
    </group>
  )
}
export default PlatformFraction
