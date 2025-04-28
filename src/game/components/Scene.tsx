import { useEffect, useRef } from "react"
import * as THREE from "three"
import { Canvas } from "@react-three/fiber"
import { PerspectiveCamera } from "@react-three/drei"

import Environment from "./Environment"

function Scene({ children }: { children: React.ReactNode }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)

  useEffect(() => {
    if (!cameraRef?.current) {
      return
    }

    cameraRef.current.lookAt(0, 0, 0)
  }, [cameraRef])

  return (
    <Canvas shadows={true} orthographic={true}>
      <Environment />
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={70}
        aspect={window.innerWidth / window.innerHeight}
        near={0.1}
        far={1000}
        position={[0, 2, 12]}
      />

      {children}
    </Canvas>
  )
}

export default Scene
