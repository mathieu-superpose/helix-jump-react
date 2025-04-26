import * as THREE from "three"

import { PerspectiveCamera } from "@react-three/drei"
import { useEffect, useRef } from "react"

import Environment from "../components/Environment"
import Column from "../components/Column"
import PlatformGroup from "../components/PlatformGroup"

function Scene() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)

  useEffect(() => {
    if (!cameraRef?.current) {
      return
    }

    cameraRef.current.lookAt(0, 0, 0)
  }, [cameraRef])

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={50}
        aspect={window.innerWidth / window.innerHeight}
        near={0.1}
        far={1000}
        position={[0, 4, 12]}
      />

      <Environment />
      <Column />
      <PlatformGroup />
    </>
  )
}

export default Scene
