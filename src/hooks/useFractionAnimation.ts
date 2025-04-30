import * as THREE from "three"

import { useFrame } from "@react-three/fiber"

import { useMemo } from "react"

export default function useFractionAnimation(
  ref: React.RefObject<THREE.Group | null>
) {
  const wp = useMemo(() => new THREE.Vector3(), [])
  const dir = useMemo(() => new THREE.Vector3(), [])

  useFrame((_state, delta) => {
    if (!ref?.current) {
      return
    }

    // update world position
    ref.current.getWorldPosition(wp)

    if (wp.y > 0) {
      // update the position of each child
      ref.current.children.forEach((child) => {
        // retrieve the rotation of the child
        child.getWorldDirection(dir)
        // update the position of the child
        child.position.x += dir.x * delta * 0.5
        child.position.z += dir.z * delta * 0.5
      })
    }
  })
}
