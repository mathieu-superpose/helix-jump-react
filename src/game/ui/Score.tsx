import useGameStore from "../../stores/game"

function Score() {
  const score = useGameStore((state) => state.score)

  return <div className="score">{score}</div>
}
export default Score
