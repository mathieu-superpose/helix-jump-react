import Scene from "./components/Scene.tsx"
import Column from "./components/Column"
import PlatformGroup from "./components/PlatformGroup"
import Ball from "./components/Ball"


import "./Game.css"

function Game() {
  return (
    <div className="game">
      <Scene>
        <Column />
        <PlatformGroup />
        <Ball />
      </Scene>
    </div>
  )
}

export default Game
