import useGameStore from "../../stores/game"

function Welcome() {
  const gameStatus = useGameStore((state) => state.status)
  const setGameStatus = useGameStore((state) => state.setStatus)

  if (gameStatus !== "checkins") {
    return null
  }

  const handleEnterTestWorld = () => {
    setGameStatus("standby")
  }

  return (
    <div className="welcome">
      <h1>Welcome to the Game!</h1>
      <button onClick={handleEnterTestWorld}>Enter Test World</button>
    </div>
  )
}

export default Welcome
