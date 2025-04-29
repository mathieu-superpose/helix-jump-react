import Scene from "./components/Scene.tsx"
import Column from "./components/Column"
import PlatformGroup from "./components/PlatformGroup"
import Ball from "./components/Ball"

import UI from "./ui/index.tsx"

import "./Game.css"

function Game() {
  return (
    <div className="game">
      <Scene>
        <Column />
        <PlatformGroup />
        <Ball />
      </Scene>

      <UI />
    </div>
  )
}

export default Game
