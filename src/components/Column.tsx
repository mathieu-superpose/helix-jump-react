import { GameOptions } from "../stores/game"

function Column() {
  return (
    <group>
      <mesh>
        <cylinderGeometry
          args={[GameOptions.columnRadius, GameOptions.columnRadius, 50]}
        />
        <meshStandardMaterial color={GameOptions.columnColor} />
      </mesh>
    </group>
  )
}

export default Column
