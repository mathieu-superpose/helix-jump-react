import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import Game from "./game"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Game />
  </StrictMode>
)
