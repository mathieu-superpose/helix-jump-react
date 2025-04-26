import { GameOptions } from "../stores/game"

function Environment() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 10, 7.5]}
        intensity={1}
        castShadow={true}
      />

      <color attach="background" args={[GameOptions.bgColor]} />
    </>
  )
}

export default Environment
