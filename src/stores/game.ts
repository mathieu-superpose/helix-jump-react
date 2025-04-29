import { create } from "zustand"

export const GameOptions = {
  columnRadius: 1, //                    column radius
  columnColor: 0xffffff, //              column color
  totalPlaftforms: 10, //                total platorms in game
  platformGap: 3, //                     vertical gap between two platorms
  platformRadius: 3, //                  platform radius
  platformHeight: 1, //                  platform heignt
  minThetaLength: Math.PI * 1.5, //      min theta length, minimum radians of the circular sector
  maxThetaLength: Math.PI * 1.85, //     max theta length, maximum radians of the circular sector
  rotationSpeed: 6, //                   helix rotation speed
  platformColors: [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0x00ffff, 0xff00ff],
  bgColor: 0x000000, //             background color
}



// import useMapStore from "./map"
// import { reset as resetPlayerStore } from "./player"

import { IGameStore } from "../types/gameTypes"

const useGameStore = create<IGameStore>(() => ({
  status: "checkins",
  // score: 0,
  // boundMargin: 5,
  // setBoundMargin: (margin) => {
  //   set({ boundMargin: margin })
  // },
  // updateScore: (rowIndex) => {
  //   set((state) => ({ score: Math.max(rowIndex, state.score) }))
  // },
  // endGame: () => {
  //   set({ status: "gameover" })
  // },
  // playPause: () => {
  //   set((state) => ({
  //     status: state.status === "running" ? "paused" : "running",
  //   }))
  // },
  // reset: () => {
  //   useMapStore.getState().reset()
  //   resetPlayerStore()
  //   set({ status: "running", score: 0 })
  // },
}))

export default useGameStore
